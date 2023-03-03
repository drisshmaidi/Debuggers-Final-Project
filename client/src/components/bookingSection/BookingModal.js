import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

const BookingModal = ({ eventId }) => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [userId, setUserId] = useState(null);
	const [bookedEvent, setBookedEvent] = useState(false);
	// localStorage.setItem(
	// 	"token",
	// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW5AY3lmLnVrIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjc3NzkyMjU3LCJleHAiOjE2NzgzOTcwNTd9.Y5w3W6YQifAZaztpJX1yfPUc_YR5QF_OFxfgClBv3pQ"
	// );
	const token = localStorage.getItem("userLoginToken");
	const header = { Authorization: `Bearer ${token}` };
	console.log(eventId);
	useEffect(() => {
		fetch("/api/checkUserLogin", {
			method: "POST",
			headers: header,
		})
			.then((res) => res.json())
			.then((data) => {
				setUserId(data.userId);
				console.log(data.userId);
			})
			.catch((err) => {
				console.error(err);
			});
		fetch("/api/checkEvent/" + eventId, {
			method: "GET",
			headers: header,
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.length > 0) {
					setBookedEvent(true);
				}
			});
	}, []);

	console.log(header);
	const handleBookEvent = () => {
		if (!userId) {
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
			if (bookedEvent) {
				setErrorMessage(<p>You already booked this event.</p>);
				return;
			}
			fetch(`/api/events/${eventId}/book`, {
				method: "POST",
				headers: header,
			})
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
