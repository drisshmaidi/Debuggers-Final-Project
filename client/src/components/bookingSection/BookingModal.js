import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const BookingModal = ({ eventId }) => {
	const [show, setShow] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [date, setDate] = useState("");
	const [error, setError] = useState(null);

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

		const response = await fetch(`/api/events/${eventId}/bookings`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, date }),
		});

		if (!response.ok) {
			setError("Failed to add booking!");
			return;
		}

		const data = await response.json();

		console.log(`Added booking with id ${data.id}`);

		setName("");
		setEmail("");
		setDate("");
		setShow(false);
	};

	return (
		<>
			<div className="mb-3">
				<Button variant="primary" onClick={handleShow}>
					Book Event
				</Button>
			</div>
			<div>
				<button
					className="btn btn-primary"
					onClick={() => window.history.back()}
				>
					Go Back
				</button>
			</div>

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
						<Button variant="primary" type="submit">
							Book
						</Button>{" "}
						<Button variant="secondary" onClick={handleClose}>
							Cancel
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default BookingModal;


