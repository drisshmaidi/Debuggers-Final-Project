

import { useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";

import "./css/style.css";

const AddEvent = ({ eventData }) => {
	const [successMsg, setSuccessMsg] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

const eventId = eventData[0]?.id;

	const onSubmit = (data) => {
		//Sends form field values to server via fetch.
		const token = localStorage.getItem("Token");
		const header= { Authorization: `Bearer ${token}` };

		let formData = new FormData();

		formData.append("title", data.title);
		formData.append("description", data.desc);
		formData.append("startDate", data.startDate);
		formData.append("time", data.time);

		formData.append("endDate", data.endDate);
		formData.append("email", data.email);
		formData.append("mobile", data.mobile);

		formData.append("eventPic", data.eventPic[0]);
		formData.append("location", data.location);

		if (eventId) {
			formData.append("eventId", eventId);
			fetch("/api/updateEvent", { method: "PUT",headers:header, body: formData })
				.then((res) => res.json())
				.then((data) => {
					console.log(data.message);
					setSuccessMsg(data.message);
				});
		} else {
			fetch("/api/addNewEvent", { method: "POST",headers:header, body: formData })
				.then((res) => res.json())
				.then((data) => {
					setSuccessMsg(data.message);
				});
		}
		setTimeout(() => window.location.reload(), 3000);


	};
	return (
		<div className="event">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-control">
					<label>Event Title*</label>
					<input
						defaultValue={eventData["0"]?.title || ""}
						type="text"
						placeholder="Event Title"
						{...register("title", {
							required: "Event Title is required.",
						})}
					/>
					{errors.title && <p className="errorMsg">{errors.title.message}</p>}
				</div>

				<div className="form-control">
					<lable> Event Description*</lable>
					<textarea
						defaultValue={eventData["0"]?.description || ""}
						placeholder="Event Description"
						{...register("desc", {
							required: "Event description is required",
						})}
					/>
					{errors.desc && <p className="errorMsg">{errors.desc.message}</p>}
				</div>

				<div className="form-control">
					<label>Event Start Date*</label>
					<input
						defaultValue={
							eventData["0"]?.end_date
								? moment(eventData["0"].start_date).format("YYYY-MM-DD")
								: ""
						}
						type="date"
						{...register("startDate", {
							required: "Events start date is required.",
						})}
					/>
					{errors.startDate && (
						<p className="errorMsg">{errors.startDate.message}</p>
					)}
				</div>

				<div className="form-control">
					<label>Event Time*</label>
					<input
						defaultValue={
							moment(eventData[0]?.time, "HH:mm:ss").format("HH:mm") || ""
						}
						type="time"
						{...register("time", {
							required: "Events start time is required.",
						})}
					/>
					{errors.time && <p className="errorMsg">{errors.time.message}</p>}
				</div>

				<div className="form-control">
					<label>Event end date</label>
					<input
						defaultValue={
							eventData["0"]?.end_date
								? moment(eventData["0"].end_date).format("YYYY-MM-DD")
								: ""
						}
						type="date"
						{...register("endDate")}
					/>
				</div>

				<div className="form-control">
					<label>Email*</label>
					<input
						defaultValue={eventData["0"]?.email || ""}
						type="text"
						placeholder="Email"
						{...register("email", {
							required: "Email is required.",
							pattern: {
								value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, ///regex for validating email address
								message: "Email is not valid.",
							},
						})}
					/>
					{errors.email && <p className="errorMsg">{errors.email.message}</p>}
				</div>

				<div className="form-control">
					<label>Mobile</label>
					<input
						defaultValue={eventData["0"]?.mobile || ""}
						type="tel"
						placeholder="Mobile"
						{...register("mobile", {
							pattern: {
								value: /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/, ///regex for validating mobile
								message: "Mobile is not valid.",
							},
						})}
					/>
					{errors.mobile && <p className="errorMsg">{errors.mobile.message}</p>}
				</div>

				<div className="form-control">
					<label>Upload event poster*</label>
					<input
						type="file"
						accept="image/png, image/jpeg"
						{...register("eventPic", {
							validate: {
								lessThan10MB: (files) =>
									files[0]?.size < 1000000 || "Max size  1mb",
							},
						})}
					/>
					{errors.eventPic && (
						<p className="errorMsg">{errors.eventPic.message}</p>
					)}
				</div>

				<div className="form-control">
					<label>Event's location*</label>
					<textarea
						defaultValue={eventData["0"]?.location || ""}
						placeholder="Enter event location"
						{...register("location", {
							required: "Event location is required",
						})}
					/>
					{errors.location && (
						<p className="errorMsg">{errors.location.message}</p>
					)}
				</div>

				<div className="form-control">
					<input
						type="submit"
						className="btn btn-info"
						value={eventId ? "Update" : "Submit"}
					/>
					{successMsg && <p className="success-msg">{successMsg}</p>}
				</div>
			</form>
		</div>
	);
};
export default AddEvent;