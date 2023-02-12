import { Router } from "express";
import db from "./db";

import logger from "./utils/logger";

const router = Router();
//router.use(Router.json());

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

router.post("/addNewEvent",(req,res)=>{
	const userId = req.body.userID;
	logger.debug(userId);
	db.query(
		"SELECT ut.type FROM users u JOIN users_type ut ON u.type_id = ut.id WHERE u.id = $1",[userId]
	).then((result) => res.json(result.rows));
});

export default router;
