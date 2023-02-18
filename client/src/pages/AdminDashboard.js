import AddEvent from "../components/eventSection/AddEvent.js";
import { useState,useEffect } from "react";

//import "bootstrap/dist/css/bootstrap.min.css";


const AdminDashboard = ({ UID })=>{

const[userType, setUserType] = useState("Loading...");
// checking the user's type


		useEffect(() => {

			fetch("/api/checkUserType", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-type": "application/json",
				},
				body: JSON.stringify({ "userId":UID }),

			})
				.then((res) => {
					if (!res.ok) {
						throw new Error(res.statusText);
					}
					return res.json();
				})
				.then((body) => {
					console.log(body);
					setUserType(body[0].type);

				})
				.catch((err) => {
					console.error(err);
				});
		});
    return (
			<div>

				{/* <Header></Header> */}
				{userType === "Admin"?<AddEvent UID={UID} />:"Unauthorized Access"}
				{/* <Footer></Footer> */}
			</div>
		);
};

export default AdminDashboard;