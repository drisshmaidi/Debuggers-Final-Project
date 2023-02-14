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
router.post("/addNewEvent",(req,res)=>{

});

export default router;
