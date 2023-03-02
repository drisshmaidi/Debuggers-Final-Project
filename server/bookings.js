import { Router } from "express";
import db from "./db";
import logger from "./utils/logger";

const router = Router();

router.get("/bookings", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, trainees!" });
});

router.post("/bookings", async (req, res) => {
	const bookingData = req.body;

	if (
		!bookingData.eventId ||
		!bookingData.name ||
		!bookingData.email ||
		!bookingData.date
	) {
		return res
			.status(400)
			.json({ message: "Name, email and date fields are required" });
	}

	try {
		await db.query(
			"INSERT INTO bookings (event_id, name, email, date) VALUES ($1, $2, $3, $4)",
			[
				bookingData.eventId,
				bookingData.name,
				bookingData.email,
				bookingData.date,
			]
		);

		res.json({ message: "Booking created successfully" });
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Failed to add booking" });
	}
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
