/* eslint-disable linebreak-style */
import React from "react";
import Logo from "../pages/Home/logo.png";
import { Link } from "react-router-dom";
import "../components/Header.css";

function Header() {
	return (
		<div className="header">
			<div className="logo">
				<Link to="/">
					<img className="img" src={Logo} alt="Logo" />
				</Link>
			</div>
			<nav className="nav">
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/tutors">Connect</Link>
					</li>
					<li>
						<Link to="/events">Events</Link>
					</li>
					<li>
						<Link to="/signin">Sign In / Register</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Header;