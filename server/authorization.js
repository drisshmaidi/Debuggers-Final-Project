import jwt from "jsonwebtoken";


//Authorization Middleware
const authorization = (req, res, next) => {
	//get token
	let token = req.headers.authorization;
	token = token.split(" ")[1];
	try {
		//if token exist
		if (token) {
			//verify token
			const { isAdmin } = jwt.verify(token, process.env.JWT_SECRET);

			req.authorization = {
				isAdmin: isAdmin,
			};
		} else {
			res.status(401).json({ message: "Token not found" });
			return;
			//req.body.authentication = { status: 498, authMsg: "Token not found" };
		}
	} catch (err) {
		//return error if token or secret key is invalid
		res.status(401).json({ message: "Invalid token" });
		return;
	}

	next();
};

module.exports = authorization;
