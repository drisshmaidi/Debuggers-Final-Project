
import  { Router } from "express";
import db from "./db";
import fileUpload from "express-fileupload";
import logger from "./utils/logger";
import bookingsRouter from "./bookings";
import eventsRouter from "./events";
import traineesRouter from "./trainees";
import loginRouter from "./login";
import bcrypt from "bcrypt";
import  Jwt  from "jsonwebtoken";
import registrationRouter from "./registration";
import authorization from "./authorization";
import authentication from "./authentication";
import reCaptcha from "./reCaptcha";


const router = Router();
router.use(fileUpload());

//Authorization middleware
//return status codes and messages (200 token is valid,401 token is invalid)
// to access authorization middleware output
//-----------------------------------------------------
// -- req.authorization.isAdmin  - to access the user's role
//----------------------------------------------------------
// authentication middleware access to outcome
//----------------------------------------------------------
// -- req.authentication.username  - to access the user's name
// -- req.authentication.userId  - to access the user's id
//----------------------------------------------------------

router.use(bookingsRouter);
router.use(eventsRouter);
router.use(traineesRouter);
router.use(loginRouter);
router.use(registrationRouter);

router.post("/checkUser",authentication,authorization,(req,res)=>{
	res
		.status(200)
		.json({
			isAdmin: req.authorization.isAdmin,
			userId: req.authentication.userId,
		});
});

//update exists event into database

router.put("/updateEvent",authorization,authentication, (req, res) => {
		const {
			title,
			description,
			startDate,
			time,
			endDate,
			email,
			mobile,
			img,
			location,
			eventId,
		} = req.body;
		const query="UPDATE events SET title = $1, description = $2, img = $3, date = $4, end_date = $5, time = $6, location = $7, email = $8, mobile = $9, user_id = $10 WHERE id = $11";
		const inputs = [
				title,
				description,
				img,
				startDate,
				endDate ? endDate : null,
				time,
				location,
				email,
				mobile ? mobile : null,
				req.authentication.userId,
				eventId,
			];
		save(query,inputs,res);
});

//insert new event into database

router.post("/addNewEvent",authorization,authentication,(req,res)=>{
		const {
			title,
			description,
			startDate,
			time,
			endDate,
			email,
			mobile,
			img,
			location,
		} = req.body;
		const query = "INSERT INTO events (title, description, img, date, end_date, time, location, email, mobile, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
		const inputs = [
			title,
			description,
			img,
			startDate,
			endDate ? endDate : null,
			time,
			location,
			email,
			mobile ? mobile : null,
			req.authentication.userId,
		];
		save(query,inputs,res);
});

//search for events
router.get("/events/search/:term",authorization, (req, res) => {
	const searchValue = req.params.term;

	//search events by id, title, description
	db.query("SELECT id, title, description FROM events WHERE id::text like $1 OR LOWER(title) like $1 OR LOWER(description) like $1",[`%${searchValue.toLowerCase()}%`])
		.then((result) => res.status(200).json(result.rows))
		.catch((error) => {
			logger.error(error);
			res.status(500).json(error);
		});
});

//DELETE an EVENT
router.delete("/deleteEvent",authentication,authorization,(req,res)=>{

	const { eventId } = req.body;

	db.query("DELETE FROM events WHERE id = $1", [eventId])
		.then(() =>
			res
				.status(200)
				.json({  msg: "Event deleted Successfully!" })
		)
		.catch((err) => {
			logger.debug(err);
			res.status(500).json({ msg: "Unable to delete this event, please try again later." });
		});
});


//login user as Admin

router.post("/adminLogin",reCaptcha, (req, res) => {
	const email = req.body.email;
	const pass = req.body.password;
	//check email exist

	db.query("SELECT * FROM users WHERE email = $1",[email])
	.then((result) => {
		if(result.rows.length === 1) {
			const { id, email,password_hash,is_admin } = result.rows[0];

			//check for password if the user exist
			bcrypt.compare(pass, password_hash,(err,isMatch)=>{

				if(err) {
					res.status(422).json({ msg: "Invalid password please try again " });
					return;
				}

				//check for users role
				if(isMatch) {
					if(!is_admin) {
						res.status(401).json({ msg:"Unauthorized Access" });
						return;
					}

				const token = Jwt.sign(
				{
					userId: id,
					username: email,
					isAdmin:is_admin,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: "12h",
				}
				);
					res.status(200).json({ token: token });
				}else{
					res.status(422).json({ msg: "Invalid password please try again" });
				}

			});
		} else {
			res.status(422).json({ msg:"Invalid email please try again" });
		}
	})
	.catch((err)=> {
		logger.debug(err);
		res.status(500).json({ msg:"Server error, please contact admin." });
	});

});

const save = (query, inputs, res) => {
	try {
		db.query(query, inputs)
			.then(() =>
				res
					.status(200)
					.json({
						message: "Event saved successfully reloading page in 3 sec...",
					})
			)
			.catch((err) => {
				logger.debug(err);
				res
					.status(500)
					.json({
						message: "Unable to process your request an error occurred.",
					});
			});
	} catch (err) {
		logger.debug(err);
		res.status(500).json({ message: "An error occurred in the server." });
	}
};
export default router;
