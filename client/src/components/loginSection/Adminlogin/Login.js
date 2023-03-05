/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import ReCaptcha from "../../captcha/ReCaptcha";




const LoginPage = ()=> {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [logMsg,setLogMsg] = useState(null);
	const navigate = useNavigate();
	const [captcha,setCaptcha] =useState(null);

    const token = localStorage.getItem("Token");

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
	};
	const handlePasswordChange = (event) => setPassword(event.target.value);


	//store generated reCaptcha token


	const handleLogin =  (event) => {
		event.preventDefault();

		// Send login details
		fetch("/api/adminLogin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password,captcha }),
		}).then((res)=>res.json())
		.then((data)=>{
			const token = data.token;
			if(token) {
				localStorage.setItem("Token",token);
				setLogMsg("Redirecting to Admin Dashboard...");
				navigate("/AdminDashboard");
			} else {
				setLogMsg(data.msg);
			}

		}).catch((er)=>console.log(er));
	};

	return (
		<div>
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
						<ReCaptcha setCaptcha={setCaptcha} />
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
						<p>{logMsg}</p>
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
