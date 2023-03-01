import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import axios from "axios";

const BookingModal = ({ eventId, loggedIn }) => {
	const [errorMessage, setErrorMessage] = useState(null);

	const handleBookEvent = () => {
		if (!loggedIn) {
			setErrorMessage(
				<p>
					You need to{" "}
					<span style={{ textDecoration: "none" }}>
						<a href="/login" style={{ color: "blue", textDecoration: "none" }}>
							Sign In
						</a>
					</span>{" "}
					first!
				</p>
			);
		} else {
			axios
				.post(`/api/events/${eventId}/book`, {})
				.then(() => {
					setErrorMessage(
						<p style={{ color: "green" }}>You have successfully booked!</p>
					);
					// Handle booking event
					console.log("Booking event...");
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return (
		<Card
			style={{
				marginBottom: "60px",
				marginRight: "50px",
				boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
			}}
		>
			<Card.Body>
				<div
					className="d-flex flex-wrap justify-content-center justify-content-md-between"
					style={{ gap: "10px" }}
				>
					<Button
						className="btn rounded shadow"
						style={{ background: "red" }}
						onClick={handleBookEvent}
					>
						Book Event
					</Button>
					<Button
						className="btn rounded shadow"
						style={{
							background: "red",
							color: "white",
						}}
						onClick={() => window.history.back()}
					>
						Back to Event
					</Button>
				</div>
				<div style={{ marginTop: "10px" }}>{errorMessage}</div>
			</Card.Body>
		</Card>
	);
};

export default BookingModal;
