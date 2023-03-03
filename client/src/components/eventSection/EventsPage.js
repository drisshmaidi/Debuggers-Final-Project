/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./appEvent.css";

import event from "../eventSection/event2.jpg";

import { Link } from "react-router-dom";

function EventsPage({ setEventId }) {
	const [events, setEvents] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

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

	const filteredEvents = events.filter((event) => {
		return event.title.toLowerCase().includes(searchTerm.toLowerCase());
	});

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString();
	};

	return (
		<>
			{/* <h1 className="allEvents">All Events</h1> */}
			<div className="home-event">
				<div className="text-containerEvent ">
					<h1>Upcoming Events</h1>
				</div>
				<div>
					<img
						src={event}
						alt=""
						width="550px"
						height="300px"
						className="eventsImage"
					/>
				</div>
			</div>

			<div className="searchBar">
				<input
					className="inputEvents"
					type="text"
					placeholder="Search events by name"
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.target.value)}
				/>
				<button>Search</button>
			</div>

			{events.length === 0 ? (
				<p>There are no events planned.</p>
			) : (
				<div className="eventsContainer">
					{filteredEvents.map((event, index) => (
						<div className="card" key={event.id}>
							<img
								width="270px"
								heigh="240px"
								src={event.img}
								title="Event Title"
							/>
							<div className="card-content2">
								<h2 className="eventTitle">{event.title}</h2>
								<span className="locationEvents">🌎 {event.location}</span>
								<span className="dataEvents"> 🗓️ {formatDate(event.date)}</span>
								<p className="descriptionEvent">{event.description}</p>
								{/* <p>
									<a
										href={event.url}
										target="_blank"
										rel="noopener noreferrer"
										className="see-details-button"
									>
										See details
									</a>
								</p> */}
								<Link
									to="/booking"
									onClick={() => setEventId(event.id)}
									className="eventButton"
								>
									Book Now
								</Link>
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
}

export default EventsPage;
