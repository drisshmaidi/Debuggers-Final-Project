import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		isAdmin: false,
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			//sending to the user data to the backend to create a new user
			const res = await axios.post("/register", formData);

			//Redirecting to the login page
			window.location.href = "/login";
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="firstName">First Name:</label>
					<input
						type="text"
						name="firstName"
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="lastName">Last Name:</label>
					<input
						type="text"
						name="lastName"
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						name="email"
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						name="password"
						onChange={handleInputChange}
						required
					/>
				</div>

				<div>
					<label htmlFor="isAdmin">Admin: </label>
					<input type="checkbox" name="isAdmin" onChange={handleInputChange} />
				</div>
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default RegistrationForm;
