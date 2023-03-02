/* eslint-disable linebreak-style */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable linebreak-style */
import React from "react";
import "./TutorDetails.css";
import Image1 from "../TutorDetails/Image1.png";
import Image2 from "../TutorDetails/Image2.png";
import Image3 from "../TutorDetails/Image3.png";
import Image4 from "../TutorDetails/Image4.png";

const FirstTutorCard = () => {
	return (
		<div className="card">
			<img className="tutor-image" src={Image1} alt="" />
			<div className="card-content">
				<h2 className="tutor-name">Juan Perez</h2>
				<div className="tutor-details">
					<span className="tutor-origin">🌎 Mexico</span>
					<span className="tutor-language">🗣️ Spanish</span>
				</div>
				<p className="tutor-intro">
					Hi, I'm Juan! I'm a native Spanish speaker and have been teaching
					Spanish for over 5 years.
				</p>
				<p className="tutor-interests">
					In my free time, I love hiking, cooking, and reading novels. Let's
					book a free trial and learn Spanish together!
				</p>
				<button className="book-trial-button">LinkedIn</button>
				<button className="book-trial-button">Slack</button>
			</div>
		</div>
	);
};

const SecondTutorCard = () => {
	return (
		<div className="card">
			<img className="tutor-image" src={Image2} alt="" />
			<div className="card-content">
				<h2 className="tutor-name">Juan Perez</h2>
				<div className="tutor-details">
					<span className="tutor-origin">🌎 Mexico</span>
					<span className="tutor-language">🗣️ Spanish</span>
				</div>
				<p className="tutor-intro">
					Hi, I'm Juan! I'm a native Spanish speaker and have been teaching
					Spanish for over 5 years.
				</p>
				<p className="tutor-interests">
					In my free time, I love hiking, cooking, and reading novels. Let's
					book a free trial and learn Spanish together!
				</p>
				<button className="book-trial-button">LinkedIn</button>
				<button className="book-trial-button">Slack</button>
			</div>
		</div>
	);
};

const ThirdTutorCard = () => {
	return (
		<div className="card">
			<img className="tutor-image" src={Image3} alt="" />
			<div className="card-content">
				<h2 className="tutor-name">Juan Perez</h2>
				<div className="tutor-details">
					<span className="tutor-origin">🌎 Mexico</span>
					<span className="tutor-language">🗣️ Spanish</span>
				</div>
				<p className="tutor-intro">
					Hi, I'm Juan! I'm a native Spanish speaker and have been teaching
					Spanish for over 5 years.
				</p>
				<p className="tutor-interests">
					In my free time, I love hiking, cooking, and reading novels. Let's
					book a free trial and learn Spanish together!
				</p>
				<button className="book-trial-button">LinkedIn</button>
				<button className="book-trial-button">Slack</button>
			</div>
		</div>
	);
};

const FourthTutorCard = () => {
	return (
		<div className="card">
			<img className="tutor-image" src={Image4} alt="" />
			<div className="card-content">
				<h2 className="tutor-name">Juan Perez</h2>
				<div className="tutor-details">
					<span className="tutor-origin">🌎 Mexico</span>
					<span className="tutor-language">🗣️ Spanish</span>
				</div>
				<p className="tutor-intro">
					Hi, I'm Juan! I'm a native Spanish speaker and have been teaching
					Spanish for over 5 years.
				</p>
				<p className="tutor-interests">
					In my free time, I love hiking, cooking, and reading novels. Let's
					book a free trial and learn Spanish together!
				</p>
				<button className="book-trial-button">LinkedIn</button>
				<button className="book-trial-button">Slack</button>
			</div>
		</div>
	);
};

const TutorList = () => {
	return (
		<div className="tutor-list">
			<FirstTutorCard />
			<SecondTutorCard />
			<ThirdTutorCard />
			<FourthTutorCard />
		</div>
	);
};

export default TutorList;
