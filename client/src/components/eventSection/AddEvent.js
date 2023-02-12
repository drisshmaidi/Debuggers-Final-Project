import { useState,useEffect } from "react";

import "./css/style.css";


const AddEvent =()=>{





return (
	<div>
		<h1>Hello from Admin</h1>
		<form>
			<input type="text" placeholder="Event Title" />
			<input type="text" placeholder="Event Description" />
			<input type="date" placeholder="Select Start Date" />
			<input type="date" />
			<input type="text" placeholder="Email" />
			<input type="number" placeholder="mobile" />
            <input type="file" placeholder="upload image" />
			<textarea placeholder="Enter event location"></textarea>
            <input type="submit" />
		</form>
	</div>
);
};
export default AddEvent;