import AddEvent from "../components/eventSection/AddEvent.js";
import { useState, useEffect } from "react";
import EventsTable from "../components/eventSection/EventsTable.js";
import { useNavigate } from "react-router-dom";
import Logo from "../pages/Home/logo.png";
import { Link } from "react-router-dom";
import "../components/Header.css";
import Logout from "../components/logout/Logout.js";
import Button from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";
import EventIcon from "@mui/icons-material/Event";

const AdminDashboard = () => {

	const [isAdmin, setIsAdmin] = useState(false);
	const [eventForm, setEventForm] = useState(null);
	const [loggedIn, setLoggedIn] = useState(false);
	const [eventTable, setEventTable] = useState(true);
	const token = localStorage.getItem("Token"); // get token from local storage
	const navigate = useNavigate();

	const handleNewEvent = () => {
		setEventForm(!eventForm);
		setEventTable(false);
	};
	const handleEventTable = () => {
		setEventTable(true);
		setEventForm(null);
	};
	// check the user's role from token
	useEffect(() => {
		fetch("/api/checkUser", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => {
				if (!res.ok) {
					setLoggedIn(false);
					navigate("/AdminLogin");
				}
				setLoggedIn(true);
				return res.json();
			})
			.then((data) => {
				setIsAdmin(data.isAdmin);
			})
			.catch((err) => {
				console.error(err);
			});
	});
	return (
		<div>
			{isAdmin ? (
				<div>
					<div className="header">
						<div className="logo">
							<Link to="/">
								<img className="img" src={Logo} alt="Logo" />
							</Link>
						</div>
						<nav className="nav">
							<ul>
								{[
									{
										name: "Events",
										icon: <EventIcon />,
										clickEvent: handleEventTable,
									},
									{
										name: "New Event",
										icon: <Add />,
										clickEvent: handleNewEvent,
									},
								].map((e, i) => (
									<li key={i}>
										<Button
											className="m-3"
											variant="outlined"
											color="neutral"
											startDecorator={e.icon}
											onClick={e.clickEvent}
										>
											{e.name}
										</Button>
									</li>
								))}

								{loggedIn ? (
									<li>
										<Logout />
									</li>
								) : (
									""
								)}
							</ul>
						</nav>
					</div>
					{eventForm ? <AddEvent eventData={eventForm} /> : ""}
					{eventTable ? (
						<EventsTable event={setEventForm} setEventTable={setEventTable} />
					) : (
						""
					)}
				</div>
			) : (
				<div>Unauthorized Access</div>
			)}
		</div>
	);
};

export default AdminDashboard;
