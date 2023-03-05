import React from "react";
import logo from "../SignIn/student.png";
// import images

// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";

import "../SignIn/SignIn.css";
import Header from "../../components/Header";


function SignIn() {
	return (
		<div>
			<Header />
			<div className="signin">
				<div>
					<h1 className="title">Sign In</h1>
					<p className="contact_paragraph">
						Sign In To Connect With Language Tutors
					</p>
					<div className="button-group">
						<Link to="/login">
							<button className="button">Trainee Login</button>
						</Link>
						<Link to="/AdminLogin">
							<button className="button">Admin Login</button>
						</Link>
						<Link to="/register">
							<button className="button">Create Account</button>
						</Link>
					</div>
				</div>
				<img src={logo} alt="Logo" className="image" />
			</div>
		</div>
	);
}

export default SignIn;


