/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [logMsg,setLogMsg] = useState(null);
	const navigate = useNavigate();


        //  localStorage.setItem(
		// 				"Token",
		// 				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImluZm9AZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwidXNlcklkIjoiMSIsImlhdCI6MTY3NzE4NzI0MCwiZXhwIjoxNjc3NzkyMDQwfQ.mhh9rmwJ68FpztWm8nIhb-yrUG_LndLqbxPdKqfjo1Q"
		// 			);
    const token = localStorage.getItem("Token");

		// checking the user's role from token

		useEffect(() => {
			fetch("/api/checkUser", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => {
					if (!res.ok) {

						throw new Error(res.statusText);
					}
					return res.json();
				})
				.then((data) => {
					data.isAdmin && data.userId
						? navigate("/events/AdminDashBoard")
						: navigate("/AdminLogin");
                    //alert(data.userId);
				})
				.catch((err) => {
					console.error(err);
				});
		},[]);

	const handleEmailChange = (event) => setEmail(event.target.value);
	const handlePasswordChange = (event) => setPassword(event.target.value);

	const handleLogin =  (event) => {
		event.preventDefault();

		// Send login details
		fetch("/api/adminLogin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		}).then((res)=>res.json())
		.then((data)=>{
			const token = data.token;
			if(token) {
				localStorage.setItem("Token",token);
				navigate("/events/AdminDashboard");
			} else {
				setLogMsg(data.msg);
			}

		}).catch((er)=>console.log(er));

		// if (response.ok) {
		// 	// If the response is successful, store the token and isAdmin from the response in local storage
		// 	const data = await response.json();
		// 	localStorage.setItem("token", data.token);
		// 	// localStorage.setItem("isAdmin", data.isAdmin);
		// 	// Navigate to the main page
		// 	navigate("/");
		// } else {
		// 	// If the response is unsuccessful, show an error message
		// 	alert("Invalid email or password");
		// }
	};

	return (
		<div className="container">
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
}

export default LoginPage;
