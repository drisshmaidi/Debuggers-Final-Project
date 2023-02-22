import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleEmailChange = (event) => setEmail(event.target.value);
	const handlePasswordChange = (event) => setPassword(event.target.value);

	const handleLogin = async (event) => {
		event.preventDefault();

		// Send a POST request with the email and password in the request body
		const response = await fetch("/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (response.ok) {
			// If the response is successful, store the token and isAdmin from the response in local storage
			const data = await response.json();
			localStorage.setItem("token", data.token);
			// localStorage.setItem("isAdmin", data.isAdmin);
			// Navigate to the main page
			navigate("/");
		} else {
			// If the response is unsuccessful, show an error message
			alert("Invalid email or password");
		}
	};

	return (
		<div className="container">
			<div className="row justify-content-center mt-5">
				<div className="col-sm-6 col-md-4">
					<h3 className="mb-3">Log in</h3>
					<Form onSubmit={handleLogin}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={handleEmailChange}
								style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={password}
								onChange={handlePasswordChange}
								style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
							/>
						</Form.Group>

						<Button
							// variant="danger"
							type="submit"
							block
							style={{
								marginTop: "20px",
								marginRight: "20px",
								boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
								background: "red",
							}}
						>
							Log in
						</Button>

						<Button
							// variant="danger"
							block
							style={{
								marginTop: "20px",
								boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
								background: "red",
							}}
						>
							<i className="fa fa-google fa-fw"></i> Log in with G
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
}

export default LoginPage;
