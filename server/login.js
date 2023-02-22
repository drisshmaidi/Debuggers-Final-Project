import { Router } from "express";
import db from "./db";
import logger from "./utils/logger";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
router.get("/api/login", (req, res) => {
	res.json({ message: "Hi" });
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	logger.debug(email);

	try {
		const result = await db.query(
			"SELECT id, email, password_hash FROM users WHERE email = $1",
			[email]
		);
		const user = result.rows[0];

		if (!user) {
			res.status(401).json({ message: "Invalid email or password" });
			return;
		}

		const passwordMatch = await bcrypt.compare(password, user.password_hash);
		if (!passwordMatch) {
			res.status(401).json({ message: "Invalid email or password" });
			return;
		}

		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
			},
			process.env.JWT_SECRET || "ThisIsMySecretKey",
			{
				expiresIn: "1h",
			}
		);
		res.status(200).json({ token: token });
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

export default router;
