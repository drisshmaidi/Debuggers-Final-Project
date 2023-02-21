import React from "react";
import logo from "../SignIn/student.png";
// import images

// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";

import "../SignIn/SignIn.css";


function SignIn() {
	return (
		<div className="signin">
			<div>
				<h1 className="title">Sign In</h1>
				<p className="contact_paragraph">
					Sign In To Connect With Language Tutors
				</p>
				<div className="button-group">
					<button className="button">Trainee Login</button>
					<button className="button">Admin Login</button>
					<button className="button">Create Account</button>
				</div>
			</div>
			<img src={logo} alt="Logo" className="image" />
		</div>
	);
}

export default SignIn;


