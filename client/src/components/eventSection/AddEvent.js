import { useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { TextField } from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
import "./css/style.css";

const AddEvent = ({ eventData }) => {
	const [successMsg, setSuccessMsg] = useState("");
	const [severity,setSeverity] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const eventId = eventData[0]?.id;


	const [open, setOpen] = React.useState(false);

	const handleClose = (reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

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

		formData.append("img", data.img);
		formData.append("location", data.location);

		if (eventId) {
			formData.append("eventId", eventId);
			fetch("/api/updateEvent", { method: "PUT",headers:header, body: formData })
				.then((res) => {
					if(res.ok) {
						setSeverity("success");
						setTimeout(() => window.location.reload(), 3000);
					} else{
						setSeverity("warning");
					}
					return res.json();
				})
				.then((data) => {
					setSuccessMsg(data.message);
					setOpen(true);

				});
		} else {
			fetch("/api/addNewEvent", { method: "POST",headers:header, body: formData })
				.then((res) => {
					if (res.ok) {
						setSeverity("success");
						setTimeout(() => window.location.reload(), 3000);
					} else {
						setSeverity("warning");
					}
					return res.json();
				})
				.then((data) => {
					setSuccessMsg(data.message);
					setOpen(true);
				});
		}

	};
	return (
		<div className="event">
			<Stack spacing={2} sx={{ width: "100%" }}>
				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
					<Alert
						onClose={handleClose}
						severity={severity}
						sx={{ width: "100%" }}
					>{successMsg}
					</Alert>
				</Snackbar>
			</Stack>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-control">
					<TextField
						id="outlined-basic"
						label="Event Title*"
						variant="outlined"
						defaultValue={eventData["0"]?.title || ""}
						{...register("title", {
							required: "Event Title is required.",
						})}
					/>
					{errors.title && <p className="errorMsg">{errors.title.message}</p>}
				</div>
				<div className="form-control">
					<TextField
						id="outlined-basic"
						label="Image URL*"
						variant="outlined"
						defaultValue={eventData["0"]?.img || ""}
						{...register("img", {
							required: "img is required.",
						})}
					/>
					{errors.img && <p className="errorMsg">{errors.img.message}</p>}
				</div>

				<div className="form-control">
					<TextField
						id="outlined-multiline-static"
						label="Event Description*"
						multiline
						rows={4}
						defaultValue={eventData["0"]?.description || ""}
						{...register("desc", {
							required: "Event description is required",
						})}
					/>
					{errors.desc && <p className="errorMsg">{errors.desc.message}</p>}
				</div>
				<div className="form-control"></div>

				<div className="form-control">
					<label className="add-event-label">
						Event Start Date*
						<input
							defaultValue={
								eventData["0"]?.date
									? moment(eventData["0"].date).format("YYYY-MM-DD")
									: ""
							}
							type="date"
							min={!eventId ? new Date().toISOString().split("T")[0] : ""}
							{...register("startDate", {
								required: "Events start date is required.",
							})}
						/>
						{errors.startDate && (
							<p className="errorMsg">{errors.startDate.message}</p>
						)}
					</label>
				</div>

				<div className="form-control">
					<label className="add-event-label">
						Event end date
						<input
							defaultValue={
								eventData["0"]?.end_date
									? moment(eventData["0"].end_date).format("YYYY-MM-DD")
									: ""
							}
							min={!eventId ? new Date().toISOString().split("T")[0] : ""}
							type="date"
							{...register("endDate")}
						/>
					</label>
				</div>

				<div className="form-control">
					<label className="add-event-label">
						Event Time*
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
					</label>
				</div>

				<div className="form-control">
					<TextField
						id="outlined-basic"
						label="Email*"
						variant="outlined"
						defaultValue={eventData["0"]?.email || ""}
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
					<TextField
						id="outlined-basic"
						label="Mobile"
						variant="outlined"
						defaultValue={eventData["0"]?.mobile || ""}
						{...register("mobile", {
							pattern: {
								value: /^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/, ///regex for validating mobile
								message: "Mobile is not valid.",
							},
						})}
					/>
					{errors.mobile && <p className="errorMsg">{errors.mobile.message}</p>}
				</div>
				<div className="form-control">
					<TextField
						id="outlined-multiline-static"
						label="Events location*"
						multiline
						rows={4}
						defaultValue={eventData["0"]?.location || ""}
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
				</div>
			</form>
		</div>
	);
};
export default AddEvent;
