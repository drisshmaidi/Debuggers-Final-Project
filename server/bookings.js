// import { Router } from "express";
// import db from "./db";
// import logger from "./utils/logger";

// const router = Router();

// router.get("/booking", (_, res) => {
// 	logger.debug("Welcoming everyone...");
// 	res.json({ message: "Hello, trainees!" });
// });

// router.post("/booking", (req, res) => {
// 	const bookingData = req.body;

// 	if (!bookingData.name || !bookingData.email || !bookingData.date) {
// 		return res
// 			.status(400)
// 			.json({ message: "Name, email and date fields are required" });
// 	}

// 	db.query("INSERT INTO bookings (name, email, date) VALUES ($1, $2, $3)", [
// 		bookingData.name,
// 		bookingData.email,
// 		bookingData.date,
// 	])
// 		.then(() => res.json({ message: "Booking created successfully" }))
// 		.catch((error) => {
// 			logger.error(error);
// 			res.status(400).json(error);
// 		});
// });


// export default router;
import { Router } from "express";
import db from "./db";
import logger from "./utils/logger";
import nodemailer from "nodemailer";

const router = Router();

async function sendEmail(to, subject, message) {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: "your_email@gmail.com",
			pass: "your_email_password",
		},
	});

	const mailOptions = {
		from: "your_email@gmail.com",
		to,
		subject,
		text: message,
	};

	await transporter.sendMail(mailOptions);
}

router.get("/bookings", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, trainees!" });
});

router.post("/bookings", async (req, res) => {
	const bookingData = req.body;

	if (!bookingData.name || !bookingData.email || !bookingData.date) {
		return res
			.status(400)
			.json({ message: "Name, email and date fields are required" });
	}

	try {
		await db.query(
			"INSERT INTO bookings (name, email, date) VALUES ($1, $2, $3)",
			[bookingData.name, bookingData.email, bookingData.date]
		);

		const emailSubject = "New booking created";
		const emailMessage = `A new booking has been created by ${bookingData.name}. Email: ${bookingData.email}. Date: ${bookingData.date}`;
		await sendEmail("recipient_email@example.com", emailSubject, emailMessage);

		res.json({ message: "Booking created successfully" });
	} catch (error) {
		logger.error(error);
		res.status(400).json(error);
	}
});

export default router;
//////////////////////////////////
// import { Router } from "express";
// import db from "./db";
// import logger from "./utils/logger";

// const router = Router();

// router.get("/bookings", (_, res) => {
// 	logger.debug("Welcoming everyone...");
// 	res.json({ message: "Hello, trainees!" });
// });

// router.post("/bookings", (req, res) => {
// 	const bookingData = req.body;

// 	if (!bookingData.name || !bookingData.email || !bookingData.date) {
// 		return res
// 			.status(400)
// 			.json({ message: "Name, email, and date fields are required" });
// 	}

// 	db.query("INSERT INTO bookings (name, email, date) VALUES ($1, $2, $3)", [
// 		bookingData.name,
// 		bookingData.email,
// 		bookingData.date,
// 	])
// 		.then(() => {
// 			res.json({ message: "Booking created successfully" });
// 			logger.debug("Booking created successfully");
// 		})
// 		.catch((error) => {
// 			logger.error(error);
// 			res.status(400).json({ message: "Error creating booking" });
// 		});
// });

// export default router;