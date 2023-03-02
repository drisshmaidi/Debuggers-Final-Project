// import { response } from "express";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";

const BookingModal = ({ eventId }) => {
	const [show, setShow] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [date, setDate] = useState("");
	const [error, setError] = useState(null);
	const [loggedIn, setLoggedIn] = useState(false);
	const [isBooked, setIsBooked] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const emailRegex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!emailRegex.test(email)) {
			setError("Invalid email format!");
			return;
		}
		try {
			const response = await fetch("/api/bookings", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(`token`)}`,
				},
				body: JSON.stringify({ eventId, name, email, date }),
			});

			if (!response.ok) {
				throw new Error("Failed to add booking!");
			}

			const data = await response.json();

			console.log(`Added booking with id ${data.id}`);

			setName("");
			setEmail("");
			setDate("");
			setShow(false);
			setIsBooked(true);
		} catch (error) {
			setError(error.message);
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setLoggedIn(true);
		} else {
			setLoggedIn(false);
		}
	}, []);




	useEffect(() => {
		//Check if the user is already booked for this event
		const checkBooking = async () => {
			try {
				const response = await fetch(`/api/bookings?eventId=${eventId}`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${localStorage.getItem(`token`)}`,
					},
				});
	
			if (!response.ok) {
				throw new Error("Failed to get bookings!");
			}

			const data = await response.json();

			if (data.length > 0) {
				setIsBooked(true);
			} else {
				setIsBooked(false);
			} 
		} catch (error) {
				console.log(error);
			}
		};

		if (loggedIn) {
			checkBooking();
		} else {
			setIsBooked(false);
		} 
	}, [eventId, loggedIn]);


	const handleBookingClick = () => {
		// event.preventDefault();
		if (loggedIn && !isBooked) {
			handleShow();
		} else if (loggedIn && isBooked) {
			setError("You have already booked this event!");
		} else {
			return <Redirect to = "/login"/>;
		}
	};

	return (
		<>
			<Col
				md
				style={{ marginBottom: "40%", marginLeft: "20%", marginRight: "5%" }}
			>
				<Button
					className="btn rounded shadow"
					style={{ background: "red" }}
					onClick={handleBookingClick}
				>
					Book Event
				</Button>
				{isBooked && (
					<div className="mt-2" style={{ color: "red"}}>
						You have already booked this event
					</div>
				)}
				{!loggedIn && (
					<div className="mt-2" style={{ color: "red" }}>
						You need to log in to book an event
					</div>
				)}
			</Col>
			<Col md style={{ marginBottom: "40%", paddingRight: "20px" }}>
				<button
					className="btn rounded shadow"
					style={{ background: "red", color: "white" }}
					onClick={() => window.history.back()}
				>
					Back to Event
				</button>
			</Col>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Book Event</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{error && <div className="alert alert-danger">{error}</div>}
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formBasicName">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter your name"
								value={name}
								onChange={(event) => setName(event.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="formBasicBookingDate">
							<Form.Label>Booking Date</Form.Label>
							<Form.Control
								type="date"
								placeholder="Enter booking date"
								value={date}
								onChange={(event) => setDate(event.target.value)}
								required
							/>
						</Form.Group>
						<Button style={{ background: "red" }} type="submit">
							Book
						</Button>{" "}
						<Button style={{ background: "red" }} onClick={handleClose}>
							Cancel
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default BookingModal;
