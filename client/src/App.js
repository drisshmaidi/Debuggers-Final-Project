import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Events from "./components/eventSection/EventsPage";
import About from "./pages/About";
import Booking from "./components/bookingSection/Booking";
import Home from "./pages/Home";

const App = () => {
	const [eventId, setEventId] = useState();

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about/this/site" element={<About />} />
			<Route path="/events" element={<Events setEventId={setEventId} />} />
			<Route path="/booking" element={<Booking eventId={eventId} />} />
		</Routes>
	);
};

export default App;
