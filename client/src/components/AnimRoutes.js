import React, { useState } from "react";
// import pages
import Home from "../pages/Home/Home";
import Events from "../components/eventSection/EventsPage";
import About from "../pages/About";
import SignIn from "../pages/SignIn/SignIn";
import TutorDetails from "../pages/TutorDetails/TutorDetails";
import Booking from "../components/bookingSection/Booking";
import AdminPortal from "../pages/AdminDashboard";
import HomeVideo from "../pages/HomeVideo/HomeVideo";
import RegistrationForm from "../components/registration/RegistrationForm";
import LoginPage from "./loginSection/LoginPage";
import User from "../pages/User";

// import routes route & useLocation hook
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const AnimRoutes = () => {
	const [eventId, setEventId] = useState();
	const location = useLocation();

	return (
		<AnimatePresence initial={true} mode="wait">
			<Routes key={location.pathname} location={location}>
				<Route path="/" element={<Home />} />
				<Route path="/about/this/site" element={<About />} />
				<Route path="/events" element={<Events setEventId={setEventId} />} />
				<Route path="/booking" element={<Booking eventId={eventId} />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/tutors" element={<TutorDetails />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/events/createNewEvents" element={<AdminPortal />} />
				<Route path="/register" element={<RegistrationForm />} />
				<Route path="/video" element={<HomeVideo />} />
				<Route path="/user" element={<User />} />
			</Routes>
		</AnimatePresence>
	);
};

export default AnimRoutes;
