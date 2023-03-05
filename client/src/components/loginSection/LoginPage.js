// import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";

// function LoginPage() {
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [errorMessage, setErrorMessage] = useState("");
// 	const navigate = useNavigate();

// 	const handleEmailChange = (event) => setEmail(event.target.value);
// 	const handlePasswordChange = (event) => setPassword(event.target.value);

// 	const handleLogin = async (event) => {
// 		event.preventDefault();

// 		// Send a POST request with the email and password in the request body
// 		const response = await fetch("/api/login", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({ email, password }),
// 		});

// 		if (response.ok) {
// 			// If the response is successful, store the token and isAdmin from the response in local storage
// 			const data = await response.json();
// 			localStorage.setItem("userLoginToken", data.token);
// 			// localStorage.setItem("isAdmin", data.isAdmin);
// 			// Navigate to the main page
// 			navigate("/user");
// 		} else {
// 			// If the response is unsuccessful, show an error message
// 			setErrorMessage("Invalid email or password");
// 		}
// 	};

// 	return (
// 		<div>
// 			<div className="row justify-content-center mt-5">
// 				<div className="col-sm-6 col-md-4">
// 					<h3 className="mb-3">Log in</h3>
// 					<Form onSubmit={handleLogin}>
// 						<Form.Group controlId="formBasicEmail">
// 							<Form.Label>Email address</Form.Label>
// 							<Form.Control
// 								type="email"
// 								placeholder="Enter email"
// 								value={email}
// 								onChange={handleEmailChange}
// 								style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
// 							/>
// 						</Form.Group>

// 						<Form.Group controlId="formBasicPassword">
// 							<Form.Label>Password</Form.Label>
// 							<Form.Control
// 								type="password"
// 								placeholder="Password"
// 								value={password}
// 								onChange={handlePasswordChange}
// 								style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
// 							/>
// 						</Form.Group>

// 						<div style={{ marginTop: "10px" }}>
// 							{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
// 						</div>

// 						<Button
// 							type="submit"
// 							block
// 							style={{
// 								marginTop: "20px",
// 								boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
// 								background: "red",
// 								width: "100%",
// 								maxWidth: "none",
// 							}}
// 						>
// 							Log in
// 						</Button>

// 						<div className="mt-2 text-center">
// 							<span className="text-muted">Don't have an account? </span>
// 							<Link to="/register">Sign up</Link>
// 						</div>
// 					</Form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default LoginPage;
import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
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
			localStorage.setItem("Token", data.token);
			// localStorage.setItem("isAdmin", data.isAdmin);
			// Navigate to the main page
			navigate("/user");
		} else {
			// If the response is unsuccessful, show an error message
			setErrorMessage("Invalid email or password");
		}
	};

	return (
		<>
			<Header />
			<div className="row justify-content-center mt-5">
				<div className="col-sm-6 col-md-4">
					<Card style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
						<Card.Body>
							<h3 className="mb-3">Log in</h3>
							<Form onSubmit={handleLogin}>
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Email address</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter email"
										value={email}
										onChange={handleEmailChange}
									/>
								</Form.Group>

								<Form.Group controlId="formBasicPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Password"
										value={password}
										onChange={handlePasswordChange}
									/>
								</Form.Group>

								<div style={{ marginTop: "10px" }}>
									{errorMessage && (
										<p style={{ color: "red" }}>{errorMessage}</p>
									)}
								</div>

								<Button
									type="submit"
									block="true"
									style={{
										marginTop: "20px",
										boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
										background: "red",
									}}
								>
									Log in
								</Button>

								<div className="mt-2 text-center">
									<span className="text-muted">Don't have an account? </span>
									<Link to="/register">Sign up</Link>
								</div>
							</Form>
						</Card.Body>
					</Card>
				</div>
			</div>
		</>
	);
}

export default LoginPage;
