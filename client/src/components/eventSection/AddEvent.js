

import { useState } from "react";
import { useForm } from "react-hook-form";

import "./css/style.css";


const AddEvent =({ UID })=>{
	const [successMsg, setSuccessMsg] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = (data) => {


		//Sends form field values to server via fetch.
		let formData = new FormData();


		formData.append("title", data.title);
		formData.append("description", data.desc);
		formData.append("startDate", data.startDate);
		formData.append("time",data.time);

		formData.append("endDate", data.endDate);
		formData.append("email",data.email);
		formData.append("mobile",data.mobile);

		formData.append("eventPic", data.eventPic[0]);
		formData.append("location",data.location);
		formData.append("UID",UID);




		fetch("/api/addNewEvent", { method: "POST", body: formData })
			.then((res) => res.json())
			.then((data) => {
				setSuccessMsg(data.message);
			});
			reset();
	};
return (
	<div>
		<form onSubmit={handleSubmit(onSubmit)}>
			{successMsg && <p className="success-msg">{successMsg}</p>}
			<div className="form-control">
				<label>Event Title*</label>
				<input
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
				<label>Event Time</label>
				<input
					type="time"
					{...register("time", {
						required: "Events start time is required.",
					})}
				/>
				{errors.time && (
					<p className="errorMsg">{errors.time.message}</p>
				)}
			</div>

			<div className="form-control">
				<label>Event end date</label>
				<input type="date" {...register("endDate")} />
			</div>

			<div className="form-control">
				<label>Email*</label>
				<input
					type="text"
					placeholder="Email"
					{...register("email", {
						required: "Email is required.",
						pattern: {
							value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
							message: "Email is not valid.",
						},
					})}
				/>
				{errors.email && <p className="errorMsg">{errors.email.message}</p>}
			</div>

			<div className="form-control">
				<label>Mobile</label>
				<input
					type="tel"
					placeholder="Mobile"
					{...register("mobile", {
						pattern: {
							value: /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/,
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
				<input type="submit" />
			</div>
		</form>
	</div>
);
};
export default AddEvent;