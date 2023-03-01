import { Router } from "express";
import db from "./db";
import logger from "./utils/logger";

const router = Router();

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

router.post("/events/:eventId/book", (req, res) => {
	const eventId = req.params.eventId;
	const { userId } = req.body;

	db.query(
		"INSERT INTO bookings(event_id, user_id, name, email, date) SELECT $1, $2, name, email, date FROM events WHERE id=$1",
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
