import { Router } from "express";
import db from "./db";
import logger from "./utils/logger";
import authentication from "./authentication";

const router = Router();
// router.use(Router.json());

router.get("/bookings", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, trainees!" });
});

router.get("/events/:id", (req, res) => {
	const eventId = req.params.id;
	db.query("SELECT * FROM events WHERE id = $1", [eventId])
		.then((result) => res.json(result.rows))
		.catch((error) => {
			logger.error(error);
			res.status(200).json(error);
		});
});

router.post("/checkUserLogin", authentication, (req, res) => {
	const userId = req.authentication.userId;
	logger.debug(userId);
	if (userId) {
		res.status(200).json({ userId: userId });

	} else {
		res.status(401).json({ message: "User not found" });
	}
});
 
router.get("/checkEvent/:eventId", authentication, (req, res) => {
	const eventId = req.params.eventId;
	const userId = req.authentication.userId;
	db.query("SELECT * FROM bookings WHERE user_id = $1 AND event_id = $2", [userId, eventId])
		.then(result => res.status(200).json(result.rows))
		.catch((error) => {
			logger.debug(error);
			res.status(500).json(error);
		});
});

router.post("/events/:eventId/book", authentication, (req, res) => {
	const eventId = req.params.eventId;
	const userId = req.authentication.userId;
	logger.debug(userId);

	db.query(
		"INSERT INTO bookings(event_id, user_id) values($1, $2)",
		[eventId, userId]
	)
		.then(() => {
			logger.info(`User ${userId} booked event ${eventId}`);
			res.status(200).json({ message: "Booking successful" });
		})
		.catch((error) => {
			logger.error(error);
			res.status(500).json({ error: "Booking failed" });
		});
});

router.delete("/bookings/:id", async (req, res) => {
	const bookingId = req.params.id;

	try {
		const result = await db.query("DELETE FROM bookings WHERE id = $1", [
			bookingId,
		]);

		if (result.rowCount === 1) {
			res.json({ message: "Booking deleted successfully" });
		} else {
			res.status(404).json({ message: "Booking not found" });
		}
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Failed to delete booking" });
	}
});

export default router;
