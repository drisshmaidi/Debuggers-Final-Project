import { Router } from "express";
import db from "./db";
import logger from "./utils/logger";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
router.get("/apilogin", (req, res) => {
    res.json({ message: "Hi" });
});

router.post("/login", async (req, res) => {
	res.json({ message: "Hello World" });
    const eml = req.body.email;
	const pwd = req.body.password;
	logger.debug(eml);
    //hash password cyf@123 = $2b$04$11zRBYmlf23KGUww4JaHEOES75NU405VZyNsbjhHmBbxnwv4ILFyq
    //const password_hash = bcrypt.hashSync(pwd, 2);
    try{
    const result = await db.query(
        "select id,email,password_hash,admin from users WHERE email = $1",
        [eml]
    );
    const { id, email, password_hash, admin } = result.rows[0];
    const passwordMatch = bcrypt.compareSync(pwd, password_hash);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
        const token = jwt.sign(
            {
                id:id,
                email: email,
                isAdmin:admin,
            },
            process.env.JWT_SECRET || "ThisIsMySecretKey" ,
            {
                expiresIn: "1h",
            }
        );
        return res.status(200).json({ token:token });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

export default router;
