/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./appEvent.css";

import event from "../eventSection/event.png";

import { Link } from "react-router-dom";


function EventsPage({ setEventId }) {
	const [events, setEvents] = useState([]);

	const fetchEvent = () => {
		fetch("/api/events")
			.then((res) => res.json())
			.then((data) => {
				const currentDate = new Date();
				const futureEvents = data.filter(
					(event) => new Date(event.date) >= currentDate
				);
				setEvents(futureEvents);
			});
	};

	useEffect(() => {
		fetchEvent();
	}, []);


	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString();
	};

	return (
		<>
			<h1 className="allEvents">All Events</h1>
			<img src={event} alt="" width="1750px" height="600px" class="center" />
			{events.length === 0 ? (
				<p>There are no events planned.</p>
			) : (
				<div className="eventsContainer">
					{events.map((event, index) => (
          <Link to="/booking" onClick={() => setEventId(event.id)}>
						<section className="event" key={event.id}>
							<div className="eventContent">
								<h1 className="eventTitle">{event.title}</h1>
								<img
									width="500"
									height="300"
									src={event.img}
									title="Event Title"
								/>
								<h2>{event.location}</h2>
								<h2>{formatDate(event.date)}</h2>
								<p className="descriptionEvent">{event.description}</p>
								<p>
									<a href={event.url} target="_blank">
										See details
									</a>
								</p>
							</div>
						</section>
            </Link>
					))}
				</div>
			)}
		</>
	);

}

export default EventsPage;
