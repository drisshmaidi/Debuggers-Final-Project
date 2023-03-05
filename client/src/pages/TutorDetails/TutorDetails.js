import React from "react";
import "./TutorDetails.css";
import Image1 from "../TutorDetails/Image1.jpg";
import Image2 from "../TutorDetails/Image2.jpg";
import Image3 from "../TutorDetails/Image3.png";
import Image4 from "../TutorDetails/Image4.jpg";


function EmployeeCard(props) {
	return (
		<div className="cards">
			<div className="imgBx">
				<img src={props.imageSrc} alt={props.name} />
			</div>
			<div className="content">
				<div className="details">
					<h2>
						{props.name} <br />
						<span>{props.jobTitle}</span>
					</h2>
					<ul className="social_icons">
						<li>
							<a href="#">
								<i className="fab fa-facebook-f"></i>
							</a>
						</li>
						<li>
							<a href="#">
								<i className="fab fa-linkedin"></i>
							</a>
						</li>
						<li>
							<a href="#">
								<i className="fab fa-slack"></i>
							</a>
						</li>
						<li>
							<a href="#">
								<i className="fas fa-envelope"></i>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

function App() {
	return (
		<>
			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
			/>
			<body>
				<div className="container">
					<EmployeeCard
						name="Hi All, I'm Michelle Louise"
						jobTitle="I Speak English and Want to Learn Spanish"
						imageSrc={Image1}
					/>
					<EmployeeCard
						name="Hey Guys, I'm Adam Johnson"
						jobTitle="I Speak Italian and Want to Learn German"
						imageSrc={Image4}
					/>
					<EmployeeCard
						name="Greetings, I'm George Li"
						jobTitle="I Speak Korean and Want to Learn English"
						imageSrc={Image2}
					/>
					<EmployeeCard
						name="Hiya, I'm Sara Ahmed"
						jobTitle="I Speak Arabic and Want to Learn French"
						imageSrc={Image3}
					/>
				</div>
			</body>
		</>
	);
}

export default App;

