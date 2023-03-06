import Header from "../components/Header";
import { useState, useEffect } from "react";
import Home from "./Home/Home";

const User = ({ email }) => {
    console.log(email);
    const [user, setUser] = useState("");

	useEffect(() => {
		fetch("/api/login")
			.then((res) => res.json())
            .then((data) => {
                const loggedUser = data.filter((val) => val.email === email);
                 setUser(loggedUser[0].first_name);
            });
	});

	return (
		<div>
			<Header />
            <h2 style={{ marginTop: "20px", fontSize: "2.5rem" }}>Welcome {user} </h2>
            <Home />
		</div>
	);
};

export default User;
