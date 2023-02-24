import React, { useState, useEffect } from "react";


import "./RegistrationForm.css";

const RegistrationForm = () => {
	const [formData, setFormData] = useState([]);



    	const fetchRegister = () => {
				console.log("test");
				fetch(`/api/register`)
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
						setFormData(data);
					});
			};
			useEffect(() => {
				fetchRegister();
			}, []);


	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

	//send form data to backend 
fetch('/register', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(formData)
}).then(() => {
	//Redirect to login page
	window.location.href ="/login";
}).catch((err) => {
	console.error(err);
})
};

	return (
		<div className="form-container">
			<h1 className="titleRegister">Create your account</h1>

			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: "10px" }}>
					<label htmlFor="firstName">First Name:</label>
					<input
						type="text"
						placeholder="First Name"
						name="firstName"
						onChange={handleInputChange}
						required
					/>
				</div>
				<div style={{ marginBottom: "10px" }}>
					<label htmlFor="lastName">Last Name:</label>
					<input
						type="text"
						placeholder="Last Name"
						name="lastName"
						onChange={handleInputChange}
						required
					/>
				</div>
				<div style={{ marginBottom: "10px" }}>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						placeholder="Enter email"
						name="email"
						onChange={handleInputChange}
						required
					/>
				</div>
				<div style={{ marginBottom: "10px" }}>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleInputChange}
						required
					/>
				</div>

				<div style={{ marginBottom: "10px" }}>
					<label htmlFor="isAdmin">Admin: </label>
					<input type="checkbox" name="isAdmin" onChange={handleInputChange} />
				</div>

				<button className="RegisterButton" type="submit">
					Register
				</button>
			</form>
		</div>
	);
};

export default RegistrationForm;

