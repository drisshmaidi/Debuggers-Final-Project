import jwt from "jsonwebtoken";

//Authorization Middleware
const authorization = (req, res, next) => {
	//get token


	const token = req.headers.authorization;
	req.body.testMsg = "Hello from Authorization";
	try {
		//if token exist
		if (token) {
			//verify token
			const { username, userId } = jwt.verify(
				token.split(" ")[1],
				process.env.JWT_SECRET
			);
            req.body.authentication ={ userId:userId,username:username };
		} else {
			req.body.authMsg = "Invalid Token";
		}
	} catch (err) {
		//return error if token or secret key is invalid
		req.body.authMsg = "Invalid signature";
	}
	next();
};

module.exports = authorization;
