import { useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";
import LogoutIcon from "@mui/icons-material/Logout";

const Logout = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.setItem("Token", "");
		navigate("/signin");
	};

	return (
		<Button
			variant="solid"
			color="danger"
			startDecorator={<LogoutIcon />}
			onClick={handleLogout}
		>
			Logout
		</Button>
	);
};

export default Logout;
