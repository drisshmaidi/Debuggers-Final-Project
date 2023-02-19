const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./db");

const router = express.Router();

router.post("/register", (req, res) => {
	const { firstName, lastName, email, password, isAdmin } = req.body;

	//Validate
	if (!firstName || !lastName || !email || !password) {
		return res
			.status(400)
			.json({ mesage: "Please provide all required fields" });
	}

	//Password hash generating
	const saltRounds = 10;
	const passwordHash = bcrypt.hashSync(password, saltRounds);

	//storing user data in DB
	const sql =
		'INSERT INTO users (first_name, last_name, email, password_hash, is_admin) VALUES (?, ?, ?, ?, ?)';
	const values = [firstName, lastName, email, passwordHash, isAdmin];

	db.query(sql, values, (err, result) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: "Error creating user" });
		}
		return res
			.status(201)
			.json({ message: "User account created successfully" });
	});
});

module.exports = router;
