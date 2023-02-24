
import  { Router } from "express";
import db from "./db";
import fileUpload from "express-fileupload";
import logger from "./utils/logger";
import bookingsRouter from "./bookings";
import eventsRouter from "./events";
import traineesRouter from "./trainees";
import authorization from "./authorization";

const router = Router();
router.use(fileUpload());

//Authorization middleware
//checks for token
//return status codes and messages (200 token is valid,498 token is invalid)
// to access authorization middleware output
//-----------------------------------------------------
// -- req.body.authorization.status  - to access the status codes
// -- req.body.authorization.authMsg  - to access the Authorization message
// -- req.body.authorization.isAdmin  - to access the user's role
//----------------------------------------------------------
// authentication middleware access to outcome
//----------------------------------------------------------
// -- req.body.authentication.status  - to access the status codes
// -- req.body.authentication.authMsg  - to access the Authorization message
// -- req.body.authentication.username  - to access the user's name
// -- req.body.authentication.userId  - to access the user's id
//----------------------------------------------------------

//you can access above requests only from backend

router.use(authorization);
router.use(bookingsRouter);
router.use(eventsRouter);
router.use(traineesRouter);


// router.post("/auth",(req,res)=>{
// 	logger.debug(req.body.testMsg);
// 	res.status(200).send("Ok");
// });

router.post("/checkUserType",(req,res)=>{
	//logger.debug(req.body.authorization.isAdmin);
	res.status(200).json({ isAdmin:req.body.authorization.isAdmin,userId:req.body.authentication.userId });
	// logger.debug(req.body.testMsg);
	// const userId = req.body.userId;
	// db.query(
	// 	"SELECT ut.type FROM users u JOIN users_type ut ON u.type_id = ut.id WHERE u.id = $1",[userId])
	// .then((result) => res.status(200).json(result.rows))
	// .catch((err)=> {
	// 	logger.debug(err);
	// });
});

//insert new event into database



router.put("/updateEvent", (req, res) => {
	if (!req.body.authorization.isAdmin) {
		res.status(req.body.authorization.status).json({ message: req.body.authorization.authMsg });
		return;
	}
	try {
		const {
			title,
			description,
			startDate,
			time,
			endDate,
			email,
			mobile,
			location,
			UID,
			eventId,
		} = req.body;
		logger.debug(eventId);
		const image = saveEventPictures(req.files, res);
		logger.debug(endDate && "null");
		db.query(
			"UPDATE events SET title = $1, description = $2, image = $3, start_date = $4, end_date = $5, time = $6, location = $7, email = $8, mobile = $9, user_id = $10 WHERE id = $11",
			[
				title,
				description,
				image,
				startDate,
				endDate ? endDate : null,
				time,
				location,
				email,
				mobile ? mobile : null,
				UID,
				eventId,
			]
		)
			.then(() => res.status(200).json({ message: "Event Updated Successfully" }))
			.catch((err) => {
				logger.debug(err);
				res.status(500).json("An error occurred in the server.");
			});
	} catch (err) {
		logger.debug(err);
	}
});


router.post("/addNewEvent",(req,res)=>{

	if(!req.body.isAdmin) {
		res.status(req.body.status).json({ message: req.body.authMsg });
		return;
	}
try{
	const {
		title,
		description,
		startDate,
		time,
		endDate,
		email,
		mobile,
		location,
		UID,
	} = req.body;
logger.debug(req.body.UID);
	const image = saveEventPictures(req.files, res);
logger.debug(endDate&&"null");
	db.query(
		"INSERT INTO events (title, description, image, start_date, end_date, time, location, email, mobile, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
		[
			title,
			description,
			image,
			startDate,
			endDate ? endDate : null,
			time,
			location,
			email,
			mobile ? mobile : null,
			UID,
		]
	)
		.then(() => res.status(200).json({ message: "Event Saved Successfully" }))
		.catch((err) => {
			logger.debug(err);
			res.status(500).json("An error occurred in the server.");
});

} catch(err){
	logger.debug(err);
}
});

router.get("/events/search/:term", (req, res) => {
	const searchValue = req.params.term;

	db.query("SELECT id, title, description FROM events WHERE id::text like $1 OR title like $1 OR description like $1",[`%${searchValue}%`])
		.then((result) => res.status(200).json(result.rows))
		.catch((error) => {
			logger.error(error);
			res.status(500).json(error);
		});
});

const saveEventPictures = (file, res) => {
	if (!file || Object.keys(file).length === 0) {
		return res.status(400).send("No files were uploaded.");
	}
	// The name of the eventPic is used to retrieve the uploaded file
	const eventPic = file.eventPic;
	const fileName =
		Math.floor(Math.random() * 10000000000) +
		"." +
		eventPic.name.split(".").pop();
		logger.debug(__dirname+"../");
	const uploadPath =
		__dirname +
		"/Event-Pictures/" +fileName;
	// Use the mv() method to place the file somewhere on the server
	eventPic.mv(uploadPath, function (err) {
		if (err) {
			return res.status(500).send(err);
		}
	});
	return fileName;
};


export default router;
