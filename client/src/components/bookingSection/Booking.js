/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import BookingModal from "./BookingModal";
// import BookingModal from "./BookingModal";
import "./Booking.css";

function Booking() {
	return (
		<div className="d-flex flex-column h-100  bg-light gray">
			<main>
				<div className="container my-5">
					<div className="text-center">
						<img
							src="image-placeholder.png"
							alt="Event Image"
							className="mx-auto d-block mb-5 rounded shadow"
							style={{ width: "500px", height: "200px" }}
						/>
					</div>
					<div className="d-flex justify-content-center">
						<div className="col-md-4">
							<h3 className="text-primary">Event Name</h3>
							<p>Event description goes here...</p>
							<p>Event time: 10:00 AM - 12:00 PM</p>
							<p>Event location: 123 Main Street, Anytown, USA</p>
						</div>
						<div className="col-md-4">
							<BookingModal />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Booking;
