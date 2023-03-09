import React, { useEffect, useState, useRef } from "react";
import { Form } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import Header from "../../Header";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ReCAPTCHA from "react-google-recaptcha";
import { FormControl, TextField, Typography } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const LoginPage = ()=> {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [logMsg,setLogMsg] = useState(null);
	const navigate = useNavigate();
	const [captcha,setCaptcha] =useState(null);
	const [open, setOpen] = React.useState(false);
    const token = localStorage.getItem("Token");
	const [severity, setSeverity] = useState(null);
	const [loading, setLoading] = React.useState(false);

	const captchaRef = useRef(null);

		// check the Admin is already logged in or not
		useEffect( () => {
			fetch("/api/checkUser", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if(data.isAdmin && data.userId) {
						navigate("/AdminDashBoard"); // not need for login if the token is valid
					}
				})
				.catch((err) => {
					console.error(err);
				});
		});


		//reset captcha if email or/and password changed
	const handleEmailChange = (event) => {
		setEmail(event.target.value);
				captchaRef.current.reset();
	};
	const handlePasswordChange = (event) => {
			setPassword(event.target.value);
				captchaRef.current.reset();
	};

	const handleLogin =  (event) => {
		event.preventDefault();

		if(!captcha) {
			captchaRef.current.reset();
			setSeverity("warning");
			setLogMsg("Please verify you are not a robot");
			setOpen(true);
			return;
		}

		setLoading(true);

		fetch("/api/adminLogin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password, captcha }),
		}).then((res)=>{
			if (res.ok) {

				setSeverity("success");
			} else {
				setSeverity("warning");
			}
			return res.json();
		})
		.then((data)=>{
			const token = data.token;
			if(token) {
				localStorage.setItem("Token",token);
				setLogMsg("Redirecting to Admin Dashboard...");
				setOpen(true);
				navigate("/AdminDashboard");
			} else {
				setLogMsg(data.msg);
				setOpen(true);
			}
			setLoading(false);

		}).catch((er)=>console.log(er));
	};

	const handleClose = (reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	return (
		<div>
			<Header />
			<Stack spacing={2} sx={{ width: "100%" }}>
				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
					<Alert
						onClose={handleClose}
						severity={severity}
						sx={{ width: "100%" }}
					>
						{logMsg}
					</Alert>
				</Snackbar>
			</Stack>
			<div className="row justify-content-center mt-5">
				<div className="col-sm-6 col-md-3">
					<Typography variant="h4" component="h2" className="mt-5 mb-3">
						Admin Login
					</Typography>
					<Form onSubmit={handleLogin}>
						<div className="d-grid">
							<FormControl>
								<TextField
									className="mt-4 mb-4"
									size="small"
									type="email"
									label="Enter your email address"
									defaultValue={email}
									onChange={handleEmailChange}
									required
									autoComplete="username"
								/>
							</FormControl>
							<FormControl>
								<TextField
									className=" mb-4"
									size="small"
									type="password"
									label="Enter your Password"
									defaultValue={password}
									onChange={handlePasswordChange}
									required
									autoComplete="current-password"
								/>
							</FormControl>
							<ReCAPTCHA
								ref={captchaRef}
								sitekey="6Lc2jdQkAAAAAIF76dQJd4l45yXSFWal4eNZgmKr"
								onChange={(token) => setCaptcha(token)}
							/>
							<LoadingButton
								className="m-4"
								color="error"
								type="submit"
								loading={loading}
								loadingPosition="start"
								startIcon={<LoginIcon />}
								variant="contained"
							>
								<span>Login</span>
							</LoadingButton>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
