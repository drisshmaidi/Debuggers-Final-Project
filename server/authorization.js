import jwt from "jsonwebtoken";
import logger from "./utils/logger";

//Authorization Middleware
const authorization = (req, res, next) => {
    //get token
	const token = req.headers.authorization;
	try {
        //if token exist
		if (token) {
            //verify token
			const { isAdmin } = jwt.verify(
				token.split(" ")[1],process.env.JWT_SECRET
			);
			logger.debug(isAdmin);
			req.body.authorization = { isAdmin:isAdmin,status:200,authMsg:"Token is valid" };
		} else {
			req.body.authorization={ staus:498,authMsg:"Token not found" };

        }
	} catch (err) {
        //return error if token or secret key is invalid
		req.body.authorization = { staus: 498, authMsg: "Invalid token" };

	}
	next();
};

module.exports = authorization;
