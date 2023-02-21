/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React from "react";
import image from "../../pages/Home/home.png";
import { Link } from "react-router-dom";

import "../Home/Home.css";

function Home() {
	return (
		<div className="home">
			<div className="text-container">
				<h1>The Language Exchange Programme</h1>
				<p>Connect With Code Your Future</p>
			</div>
			<div className="image-container">
				<img src={image} alt="Language Exchange Programme" />
			</div>
		</div>
	);
}

export default Home;
