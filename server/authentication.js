import jwt from "jsonwebtoken";


//Authorization Middleware
const authentication = (req, res, next) => {
	//get token
	let token = req.headers.authorization;

	try {
		//if token exist

		if (token) {
			//verify token
			token = token.split(" ")[1];
			const { username, userId } = jwt.verify(token, process.env.JWT_SECRET);

			req.authentication = {
				username: username,
				userId: userId,
			};
		} else {
			res.status(401).json({ message: "Token not found" });
			return;
		}
	} catch (err) {
		//return error if token or secret key is invalid
		res.status(401).json({ message: "Invalid token" });
		return;
	}
	next();
};

module.exports = authentication;
