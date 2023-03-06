import AddEvent from "../components/eventSection/AddEvent.js";
import { useState,useEffect } from "react";
import EventsTable from "../components/eventSection/EventsTable.js";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.js";
import Button from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";




//import "bootstrap/dist/css/bootstrap.min.css";


const AdminDashboard = ()=>{

	//store userId and it's role
	const [isAdmin, setIsAdmin] = useState(false);
	const [eventData, setEventData] = useState(null);
	const navigate = useNavigate();

	//get token from local storage
	const token = localStorage.getItem("Token");

// checking the user's role from token
		useEffect(() => {
			fetch("/api/checkUser", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => {
					if (!res.ok) {
						navigate("/AdminLogin");
					}
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
				<Header />
				<Button
					className="m-3"
					variant="outlined"
					color="neutral"
					startDecorator={<Add />}
					onClick={() => setEventData(!eventData)}
				>
					{!eventData ? "Add Event" : "Close Form"}
				</Button>
				{isAdmin ? (
					<div>
						{eventData ? <AddEvent eventData={eventData} /> : ""}
						<EventsTable event={setEventData} />
					</div>
				) : (
					<div>Unauthorized Access</div>
				)}
			</div>
		);
};

export default AdminDashboard;