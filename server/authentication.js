import jwt from "jsonwebtoken";

//Authorization Middleware
const authorization = (req, res, next) => {
	//get token
	const token = req.headers.authentication;
	try {
		//if token exist
		if (token) {
			//verify token
			const { username, userId } = jwt.verify(
				token.split(" ")[1],
				process.env.JWT_SECRET
			);
			req.body.authentication = {
				username: username,
                userId: userId,
				status: 200,
				authMsg: "Token is valid",
			};
		} else {
			req.body.authentication = { staus: 498, authMsg: "Token not found" };
		}
	} catch (err) {
		//return error if token or secret key is invalid
		req.body.authentication = { staus: 498, authMsg: "Invalid token" };
	}
	next();
};

module.exports = authorization;
