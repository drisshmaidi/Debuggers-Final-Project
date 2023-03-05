import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = ({ setCaptcha }) => {
	const onChange = (tokenValue) => {
		setCaptcha(tokenValue);
	};
	return (
		<ReCAPTCHA
			sitekey="6Lc2jdQkAAAAAIF76dQJd4l45yXSFWal4eNZgmKr"
			onChange={onChange}
		/>
	);
};

export default ReCaptcha;
