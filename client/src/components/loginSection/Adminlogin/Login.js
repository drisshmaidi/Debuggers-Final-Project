/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Header";

//import ReCaptcha from "../../captcha/ReCaptcha";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import ReCAPTCHA from "react-google-recaptcha";


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

	const captchaRef = useRef(null);




		// checking the user's role from token
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
						navigate("/AdminDashBoard");
					}
				})
				.catch((err) => {
					console.error(err);
				});
		});

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
				captchaRef.current.reset();

	};
	const handlePasswordChange = (event) => {
			setPassword(event.target.value);
				captchaRef.current.reset();

};


	//store generated reCaptcha token


	const handleLogin =  (event) => {
		event.preventDefault();

		if(!captcha) {
			captchaRef.current.reset();
			setSeverity("warning");
			setLogMsg("Redirecting to Admin Dashboard...");
			setOpen(true);
			return;
		}

		// Send login details


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
				<div className="col-sm-6 col-md-4">
					<h3 className="mb-3">Admin Login</h3>
					<Form onSubmit={handleLogin}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address*</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={handleEmailChange}
								style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password*</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={password}
								onChange={handlePasswordChange}
								style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
							/>
						</Form.Group>
						{/* <ReCaptcha setCaptcha={setCaptcha} /> */}
						<ReCAPTCHA
							ref={captchaRef}
							sitekey="6Lc2jdQkAAAAAIF76dQJd4l45yXSFWal4eNZgmKr"
							onChange={(token)=>setCaptcha(token)}
						/>
						<Button
							// variant="danger"
							type="submit"
							block="true"
							style={{
								marginTop: "20px",
								marginRight: "20px",
								boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
								background: "red",
							}}
						>
							Log in
						</Button>
						<div className="mt-2 text-center">
							<span className="text-muted">Don't have an account? </span>
							<Link to="/signup">Sign up</Link>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
