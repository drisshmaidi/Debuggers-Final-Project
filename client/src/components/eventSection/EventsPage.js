/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./appEvent.css";
import { Link } from "react-router-dom";

function EventsPage({ setEventId }) {
	const [events, setEvents] = useState([]);

	const fetchEvent = () => {
		fetch("/api/events")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setEvents(data);
			});
	};

	useEffect(() => {
		fetchEvent();
	}, []);

	return events.map((event) => (
		<Link to="/booking" onClick={() => setEventId(event.id)}>
			<section className="event" key={event.id}>
				<div className="row">
					<div className="titleEvent">
						<h1>{event.title}</h1>
						<img width="500" height="300" src={event.img} title="Event Title" />
						<h2>{event.location}</h2>
						<h2>{event.date}</h2>
						<p className="descriptionEvent">{event.description}</p>
					</div>
				</div>
			</section>
		</Link>
	));
}

export default EventsPage;
