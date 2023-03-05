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
				<p>
					Develop Your Language Skills by Joining Language Education{" "}
					<span>
						<Link to="/events" className="link">
							Events
						</Link>
					</span>{" "}
					and{" "}
					<span>
						<Link to="/tutors" className="link">
							Connect
						</Link>
					</span>{" "}
					with Language Buddies
				</p>
			</div>
			<div className="image-container">
				<img src={image} alt="Language Exchange Programme" />
			</div>
		</div>
	);
}

export default Home;
