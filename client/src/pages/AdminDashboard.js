import AddEvent from "../components/eventSection/AddEvent.js";
import { useState,useEffect } from "react";
import EventsTable from "../components/eventSection/EventsTable.js";

import Logout from "../components/logout/Logout";


//import "bootstrap/dist/css/bootstrap.min.css";

//admin token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NzcwMTI0NzIsImV4cCI6MTY3NzYxNzI3Mn0.S5Ekh2yYqI-qSb0uEt_KFJJoyMBgYG2FQLE26h8n3D4

const AdminDashboard = ()=>{

	//store userid and it's role
const[isAdmin, setIsAdmin] = useState(false);
const[username,setUserName]=useState(null);
const [eventData, setEventData] = useState(null);



localStorage.setItem(
	"Token",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImluZm9AZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwidXNlcklkIjoiMSIsImlhdCI6MTY3NzE4NzI0MCwiZXhwIjoxNjc3NzkyMDQwfQ.mhh9rmwJ68FpztWm8nIhb-yrUG_LndLqbxPdKqfjo1Q"
);

localStorage.setItem("Token","");


//get token from local storage
const token = localStorage.getItem("Token");

// checking the user's role from token

		useEffect(() => {
			fetch("/api/checkUserType", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => {
					if (!res.ok) {
						throw new Error(res.statusText);
					}
					return res.json();
				})
				.then((data) => {

					setIsAdmin(data.isAdmin);
					setUserName(data.username);
				})
				.catch((err) => {
					console.error(err);
				});
		});
    return (
			<div>
				<button className={`btn ${!eventData?"btn-primary":"btn-danger"}`} onClick={()=>setEventData(!eventData)} >{!eventData?"Add Event":"Close Form"}</button>
				{isAdmin ? (
					<div>
						{eventData ? <AddEvent eventData={eventData} UID={username} /> : ""}
						<EventsTable event={setEventData} />
					</div>
				) : (
					<div>Unauthorized Access</div>
				)}
				<Logout />
			</div>
		);
};

export default AdminDashboard;