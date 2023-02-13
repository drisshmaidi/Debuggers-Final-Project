import { Router } from "express";

import logger from "./utils/logger";
import db from "./db";
const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

export default router;



// GET "/"
router.get("/events", (req, res) => {
	db.query("SELECT * FROM events")
		.then((result) => res.json(result.rows))
		.catch((error) => {
			console.error(error);
			res.status(200).json(error);
		});
});

router.get("/events/:id", (req, res) => {
	const eventId = req.params.id;
	db
		.query("SELECT * FROM events WHERE id=$1", [eventId])
		.then((result) => res.json(result.rows))
		.catch((error) => {
			console.error(error);
			res.status(200).json(error);
		});
});
