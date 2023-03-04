const express = require("express");
const bcrypt = require("bcrypt");
import db from "./db";
const logger = require("./utils/logger");

const router = express.Router();

router.get("/register", (_, res) => {
	// logger.debug("Message");
	res.json({ message: "Users registration" });
});

router.post("/register", (req, res) => {
	const { firstName, lastName, email, password, isAdmin } = req.body;
	//Validate
	if (!firstName || !lastName || !email || !password) {
		return res
			.status(400)
			.json({ message: "Please provide all required fields" });
	}

	// Check password complexity
	const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
	if (!passwordRegex.test(password)) {
		return res.status(400).json({
			message:
				"Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one numeric digit",
		});
	}
	
	// //Password hash generating
	const saltRounds = 10;
	const passwordHash = bcrypt.hashSync(password, saltRounds);

	db.query("select * from users where email = $1", [email])
		.then((result) => {
			console.log(result.rows.length);
			if (result.rows.length > 0) {
				return res.json({
					message: "Email already exists, try again",
				});
			} else {
				const sql =
					"INSERT INTO users (first_name, last_name, email, password_hash, is_admin) VALUES ($1, $2, $3, $4, $5)";
				const values = [
					firstName,
					lastName,
					email,
					passwordHash,
					isAdmin ? true : false,
				];

				db.query(sql, values)
					.then((result) => {
						return res.status(201).json({
							message: "User account created successfully",
						});
					})
					.catch((error) => {
						res.status(500).json(error);
					});
			}
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

router.post("/login", (req, res) => {
	const { email, password } = req.body;

	//Validation
	if (!email || !password) {
		return res
			.status(400)
			.json({ message: " Please provide email and password" });
	}

	//Check if user exists in database
	const sql = "SELECT * FROM users WHERE email = $1";
	const values = [email];

	db.query(sql, values)
		.then((result) => {
			if (result.rows.length === 0) {
				return res.status(404).json({ message: "User not found" });
			}

			const user = result.rows[0];
			const passwordMatch = bcrypt.compareSync(password, user.password_hash);
			if (!passwordMatch) {
				return res.status(401).json({ message: "Invalid credentials" });
			}

			return res.json({ message: "Login successful" });
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

module.exports = router;
