import AddEvent from "../components/eventSection/AddEvent.js";
import { useState,useEffect } from "react";

const CreateEvent = ({ UID })=>{

const[userType, setUserType] = useState("Loading...");
// check the user's type
		useEffect(() => {
			fetch("/api/checkUserTpe", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					userId: UID,
				}),
			})
				.then((res) => {
					if (!res.ok) {
						throw new Error(res.statusText);
					}
					return res.json();
				})
				.then((body) => {
					setUserType(body[0].type);
				})
				.catch((err) => {
					console.error(err);
				});
		});
    return (
			<div>
				{/* <Header></Header> */}
                {userType === "Admin"?<AddEvent />:"Unauthorized Access"}
				{/* <Footer></Footer> */}
			</div>
		);
};

export default CreateEvent;