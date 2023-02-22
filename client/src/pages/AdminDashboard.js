import AddEvent from "../components/eventSection/AddEvent.js";
import { useState,useEffect } from "react";


//import "bootstrap/dist/css/bootstrap.min.css";

//admin token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NzcwMTI0NzIsImV4cCI6MTY3NzYxNzI3Mn0.S5Ekh2yYqI-qSb0uEt_KFJJoyMBgYG2FQLE26h8n3D4

const AdminDashboard = ()=>{

	//store userid and it's role
const[isAdmin, setIsAdmin] = useState(false);
const[username,setUserName]=useState(null);

localStorage.setItem(
	"Token",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NzcwMTI0NzIsImV4cCI6MTY3NzYxNzI3Mn0.S5Ekh2yYqI-qSb0uEt_KFJJoyMBgYG2FQLE26h8n3D4"
);

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

				{/* <Header></Header> */}
				{isAdmin?<AddEvent UID={username}  />:"Unauthorized Access"}
				{/* <Footer></Footer> */}
			</div>
		);
};

export default AdminDashboard;