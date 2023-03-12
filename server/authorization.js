import jwt from "jsonwebtoken";


//Authorization Middleware
const authorization = (req, res, next) => {
	//get token
	let token = req.headers.authorization;

	try {
		//if token exist
		if (token) {
			//verify token
			token = token.split(" ")[1];
			const { isAdmin } = jwt.verify(token, process.env.JWT_SECRET);

			req.authorization = {
				isAdmin: isAdmin,
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

module.exports = authorization;
``