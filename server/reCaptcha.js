const { default: logger } = require("./utils/logger");

//reCaptcha Middleware
const reCaptcha = (req, res, next) => {
	//get token
	const captcha = req.body.captcha;

	const sec_key = process.env.SECRET_KEY;

	const url = `https://www.google.com/recaptcha/api/siteverify?secret=${sec_key}&response=${captcha}`;
    try{
        fetch(url, {
			method: "post",
		})
		.then((response) => response.json())
		.then((google_response) => {
			if (!google_response.success) {
				res.status(200).json({ msg: "Captcha not verified, try again." });
			}
		});
    }catch(err) {
		logger.debug(err);
        res.status(401).json({ msg: "Captcha error while verifying." });
	}
	next();
};

module.exports = reCaptcha;
