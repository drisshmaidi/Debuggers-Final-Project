import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BookingModal from "./BookingModal";
import "./Booking.css";

function Booking({ eventId }) {
	const [event, setEvent] = useState(null);

	useEffect(() => {
		fetch(`/api/events/${eventId}`)
			.then((res) => res.json())
			.then((data) => setEvent(data))
			.catch((err) => console.log(err));
	}, [eventId]);

	if (!event) {
		return <div>Loading...</div>;
	}

	return (
		<div className="d-flex flex-column h-100  bg-light gray">
			<main>
				<div className="container my-5">
					<div className="text-center">
						<img
							src={event[0].img}
							alt={event[0].title}
							className="mx-auto d-block mb-5 rounded shadow"
							style={{ width: "500px", height: "200px" }}
						/>
					</div>
					<div className="d-flex justify-content-center">
						<div className="col-md-4">
							<h3 className="text-primary">{event[0].title}</h3>
							<p className="descriptionEvent">{event[0].description}</p>
							<p>Event time: {event[0].time}</p>
							<p>Event location: {event[0].location}</p>
						</div>
						<div className="col-md-4">
							<BookingModal eventId={eventId} />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Booking;
