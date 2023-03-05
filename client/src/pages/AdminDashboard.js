import AddEvent from "../components/eventSection/AddEvent.js";
import { useState,useEffect } from "react";
import EventsTable from "../components/eventSection/EventsTable.js";
import { useNavigate } from "react-router-dom";
import Logout from "../components/logout/Logout";
import Header from "../components/Header.js";


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
				<button className={`m-2 btn ${!eventData?"btn-primary":"btn-danger"}`} onClick={()=>setEventData(!eventData)} >{!eventData?"Add Event":"Close Form"}</button>
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