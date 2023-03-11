/* eslint-disable linebreak-style */
import React from "react";
import Logo from "../pages/Home/logo.png";
import { Link } from "react-router-dom";
import "../components/Header.css";

import { useEffect,useState } from "react";

import Logout from "./logout/Logout";

function Header() {




	const [loggedIn, setLoggedIn] = useState(false);

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
					setLoggedIn(false);
				} else {
					setLoggedIn(true);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	});

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
						<Link to="/about">Explore</Link>
					</li>
					<li>
						<Link to="/tutors">Connect</Link>
					</li>
					<li>
						<Link to="/events">Events</Link>
					</li>

					{!loggedIn ? (
						<li>
							<Link to="/signin">Sign In</Link>
						</li>
					) : (
						""
					)}

					{loggedIn ? (
						<li>
							<Logout />
						</li>
					) : (
						""
					)}
				</ul>
			</nav>
		</div>
	);
}

export default Header;