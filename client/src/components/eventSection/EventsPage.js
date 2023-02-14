import React, { useState, useEffect } from "react";
import "./appEvent.css";
// import event from "../eventSection/event.jpg";

function EventsPage() {
	const [events, setEvents] = useState([]);

	const fetchEvent = () => {
		console.log("test");
		fetch(`/api/events`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setEvents(data);
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
			<div className="wholePage">
				<h1 className="allEvents">All Events</h1>
				{/* <img src={event} alt="" width="1800px" height="700px" /> */}

				<div className="eventsContainer">
					{events.map((event) => (
						<section className="event" key={event.id}>
							<div className="eventContent">
								<h1>{event.title}</h1>
								<img
									width="500"
									height="300"
									src={event.img}
									title="Event Title"
								/>
								<h2>{event.location}</h2>
								<h2>{formatDate(event.date)}</h2>
								<p className="descriptionEvent">{event.description}</p>
							</div>
						</section>
					))}
				</div>
			</div>
		</>
	);
	
}

export default EventsPage;
