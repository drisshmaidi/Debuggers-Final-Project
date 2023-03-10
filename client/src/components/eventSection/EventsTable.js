import { useEffect, useState } from "react";
import Delete from "./deleteEvent/DeleteEventsAlert";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "bootstrap/dist/css/bootstrap.min.css";
import Typography from "@mui/material/Typography";
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";
import { LinearProgress } from "@mui/material";

const EventsTable = ({ event,setEventTable }) => {
	const [events, setEvents] = useState(null);
	const [totalEvent, setTotalEvent] = useState(0);
	const [countSearchResult, setCountSearchResult] = useState(0);
	const token = localStorage.getItem("Token");
	const [loading,setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/events")
			.then((res) => res.json())
			.then((data) => {
				const countEvents = data.length;
				setEvents(data);
				setTotalEvent(countEvents);
				setCountSearchResult(countEvents);
				setLoading(false);
			});
	}, []);

	const handleUpdate = (e) =>{
		const eventId = e.target.name;
		fetch(`/api/events/${eventId}`)
			.then((res) => res.json())
			.then((data) => {
				event(data);
				setEventTable(false);
			});
			//scroll to the top of the page
			window["scrollTo"]({ top:0, behavior: "smooth" });
		};

	const handleSearch = (value) => {
		setLoading(true);
		const url = !value
			? "/api/events"
			: `/api/events/search/${value}`;
		fetch(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => res.json())
		.then((data) => {
			setEvents(data);
			setCountSearchResult(data.length);
			setLoading(false);
		});
	};

	return (
		<div>
			<div className="search-field">
				<Typography className="m-4" variant="h4" gutterBottom>
					List of Events
				</Typography>
				<Box
					component="form"
					className="float-right"
					sx={{
						float: "right",
						"& .MuiTextField-root": { m: 1, width: "25ch" },
					}}
					noValidate
					autoComplete="off"
				>
					<TextField
						id="standard-search"
						label="Search by id, title, and description"
						type="search"
						variant="standard"
						onInput={(e) => handleSearch(e.target.value)}
					/>
					<Typography variant="caption" display="block" gutterBottom>
						{`${countSearchResult} / ${totalEvent} Results found`}
					</Typography>
				</Box>
			</div>
			<div>
				<table className="table">
					<thead className="thead-dark">
						<tr>
							<th scope="col">
								<Typography className="m-3" variant="h6" gutterBottom>
									ID#
								</Typography>
							</th>
							<th scope="col">
								<Typography className="m-3" variant="h6" gutterBottom>
									Title
								</Typography>
							</th>
							<th scope="col">
								<Typography className="m-3" variant="h6" gutterBottom>
									Description
								</Typography>
							</th>
							<th scope="col">
								<Typography className="m-3" variant="h6" gutterBottom>
									Edit
								</Typography>
							</th>
							<th scope="col">
								<Typography className="m-3" variant="h6" gutterBottom>
									Delete
								</Typography>
							</th>
						</tr>
					</thead>
					<tbody>
						{!loading ? (
							events
								?.sort((x, y) => (x.id < y.id ? 1 : -1))
								.map((e, k) => {
									return (
										<tr key={k}>
											<th scope="row" key={k}>
												<Typography
													className="m-3"
													variant="body1"
													gutterBottom
												>
													{e.id}
												</Typography>
											</th>
											<td>
												<Typography
													className="m-3"
													variant="body1"
													gutterBottom
												>
													{e.title}
												</Typography>
											</td>
											<td>
												<Typography
													className="m-3"
													variant="body1"
													gutterBottom
												>
													{e.description}
												</Typography>
											</td>
											<td>
												<button
													name={e.id}
													onClick={handleUpdate}
													className="btn btn-warning"
												>
													Edit
												</button>
											</td>
											<td>
												<React.StrictMode>
													<StyledEngineProvider injectFirst>
														<CssVarsProvider>
															<Delete eventId={e.id} title={e.title} />
														</CssVarsProvider>
													</StyledEngineProvider>
												</React.StrictMode>
											</td>
										</tr>
									);
								})
						) : (
							<tr>
								<td colSpan="5">
									<Box sx={{ width: "50%", margin: "4rem auto" }}>
										<LinearProgress />
									</Box>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default EventsTable;
