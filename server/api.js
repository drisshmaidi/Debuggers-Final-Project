import { Router } from "express";
import db from "./db";
const fileUpload = require("express-fileupload");

import logger from "./utils/logger";

const router = Router();
//router.use(Router.json());
router.use(fileUpload());


router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

router.post("/checkUserTpe",(req,res)=>{
	const userId = req.body.userId;
	logger.debug(userId);
	db.query(
		"SELECT ut.type FROM users u JOIN users_type ut ON u.type_id = ut.id WHERE u.id = $1",[userId]
	).then((result) => res.json(result.rows));
});

//insert new event into database

router.post("/addNewEvent",(req,res)=>{

try{
	saveEventPictures(req.files,res);
	res.status(200).json({ message:"Event Saved Successfully" });

} catch(err){
	logger.debug(err);
}

});

const saveEventPictures = (file, res) => {
	if (!file || Object.keys(file).length === 0) {
		return res.status(400).send("No files were uploaded.");
	}
	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	const eventPic = file.eventPic;
logger.debug(Math.floor(Math.random() * 10000000000));
	const uploadPath =
		__dirname +
		"/Event-Pictures/" +
		(Math.floor(Math.random() * 10000000000) +
		10000000000) +"." + eventPic.name.split(".").pop();
	// Use the mv() method to place the file somewhere on your server
	eventPic.mv(uploadPath, function (err) {
		if (err) {
			return res.status(500).send(err);
		}
	});
};

export default router;
