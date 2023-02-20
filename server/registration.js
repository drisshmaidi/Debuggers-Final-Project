const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./db");
const logger = require("./utils/logger");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/register", (_, res) => {
	logger.debug("Message");
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

	//Password hash generating
	const saltRounds = 10;
	const passwordHash = bcrypt.hashSync(password, saltRounds);

	//storing user data in DB
	const sql =
		"INSERT INTO users (first_name, last_name, email, password_hash, is_admin) VALUES ($1, $2, $3, $4, $5)";
	const values = [firstName, lastName, email, passwordHash, isAdmin];

	db.query(sql, values)
		.then((result) => {
			return res.status(201).json({
				message: "User account created successfully",
			});
		})
		.catch((error) => {
			logger.error(error);
			return res.status(500).json({ message: "Error to create user account" });
		});
});

router.post("/login", (req,res) => {
	const { email, password } = req.body;

	//Validation
	if(!email || !password) {
		return res 
.status(400)
.json({ message: " Please provide email and password"});
	}

	//Check user in DB
	const sql = "SELECT * FROM users WHERE email = $1";
	const values = [email];

})

module.exports = router;
