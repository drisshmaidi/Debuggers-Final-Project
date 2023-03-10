import { useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { TextField, Typography } from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import "./css/style.css";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddEvent = ({ eventData }) => {
	const [successMsg, setSuccessMsg] = useState("");
	const [severity,setSeverity] = useState(null);
	const [loading, setLoading] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const eventId = eventData[0]?.id;

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

		let api = { url:"addNewEvent",reqMethod:"POST" };

		if (eventId) {
			formData.append("eventId", eventId);
			api.url = "updateEvent";
			api.reqMethod="PUT";
		}

		fetch(`/api/${api.url}`, {
			method: api.reqMethod,
			headers: header,
			body: formData,
		})
			.then((res) => {
				if (res.ok) {
					setSeverity("success");
					setLoading(true);
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
	};
	return (
		<div className="event">
			<Stack spacing={2} sx={{ width: "100%" }}>
				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
					<Alert
						onClose={handleClose}
						severity={severity}
						sx={{ width: "100%" }}
					>
						{successMsg}
					</Alert>
				</Snackbar>
			</Stack>
			<div className="event-form-container">
				<div className="event-title">
					<Typography color="error" variant="h3">
						{eventId ? "Update" : "Add New"} Event
					</Typography>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="event-form-container">
						<div className="form-control">
							<TextField
								size="small"
								id="outlined-basic"
								label="Event Title*"
								variant="outlined"
								defaultValue={eventData["0"]?.title || ""}
								{...register("title", {
									required: "Event Title is required.",
								})}
							/>
							{errors.title && (
								<Typography variant="caption" className="text-danger">
									{errors.title.message}
								</Typography>
							)}
						</div>
						<div className="form-control">
							<TextField
								size="small"
								id="outlined-basic"
								label="Image URL*"
								variant="outlined"
								defaultValue={eventData["0"]?.img || ""}
								{...register("img", {
									required: "Image link is required.",
								})}
							/>
							{errors.img && (
								<Typography variant="caption" className="text-danger">
									{errors.img.message}
								</Typography>
							)}
						</div>

						<div className="form-control">
							<TextField
								size="small"
								id="outlined-multiline-static"
								label="Event Description*"
								multiline
								rows={4}
								defaultValue={eventData["0"]?.description || ""}
								{...register("desc", {
									required: "Event description is required",
								})}
							/>
							{errors.desc && (
								<Typography variant="caption" className="text-danger">
									{errors.desc.message}
								</Typography>
							)}
						</div>
						<div className="form-control">
							<TextField
								label="Event Start Date"
								variant="outlined"
								size="small"
								InputLabelProps={{ shrink: true }}
								defaultValue={
									eventData["0"]?.date
										? moment(eventData["0"].date).format("YYYY-MM-DD")
										: ""
								}
								type="date"
								{...register("startDate", {
									required: "Events start date is required.",
								})}
							/>
							{errors.startDate && (
								<Typography variant="caption" className="text-danger">
									{errors.startDate.message}
								</Typography>
							)}
						</div>

						<div className="form-control">
							<TextField
								label="Event End Date"
								variant="outlined"
								size="small"
								InputLabelProps={{ shrink: true }}
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
							<TextField
								label="Event Time"
								variant="outlined"
								size="small"
								InputLabelProps={{ shrink: true }}
								defaultValue={
									moment(eventData[0]?.time, "HH:mm:ss").format("HH:mm") || ""
								}
								type="time"
								{...register("time", {
									required: "Events time is required.",
								})}
							/>
							{errors.time && (
								<Typography variant="caption" className="text-danger">
									{errors.time.message}
								</Typography>
							)}
						</div>

						<div className="form-control">
							<TextField
								size="small"
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
							{errors.email && (
								<Typography variant="caption" className="text-danger">
									{errors.email.message}
								</Typography>
							)}
						</div>

						<div className="form-control">
							<TextField
								size="small"
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
							{errors.mobile && (
								<Typography variant="caption" className="text-danger">
									{errors.mobile.message}
								</Typography>
							)}
						</div>
						<div className="form-control">
							<TextField
								size="small"
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
								<Typography variant="caption" className="text-danger">
									{errors.location.message}
								</Typography>
							)}
						</div>
						<div className="form-control">
							<LoadingButton
								className="m-3"
								color={eventId ? "warning" : "success"}
								type="submit"
								loading={loading}
								loadingPosition="start"
								startIcon={<SaveIcon />}
								variant="contained"
							>
								<span>{eventId ? "Update" : "Submit"}</span>
							</LoadingButton>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
export default AddEvent;
