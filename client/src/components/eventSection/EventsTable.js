import { useEffect, useState } from "react";

const EventsTable = ({ event }) => {
	const [events, setEvents] = useState(null);


	useEffect(() => {
		fetch("/api/events")
			.then((res) => res.json())
			.then((data) => setEvents(data));
	}, []);

	const handleUpdate = (e) =>{
		const eventId = e.target.name;
		fetch(`/api/events/${eventId}`)
			.then((res) => res.json())
			.then((data) => event(data));
		};

	const handleSearch = (e) => {
		const searchValue = e.target.value;
		console.log(searchValue);
		fetch(`/api/events/search/${searchValue}`)
			.then((res) => res.json())
			.then((data) => setEvents(data));
	};
	return (
		<div>
			<div><input type="text" onChange={handleSearch} placeholder="Search...." /></div>
			<table className="table">
				<thead className="thead-dark">
					<tr>
						<th scope="col">Event ID#</th>
						<th scope="col">Title</th>
						<th scope="col">Description</th>
						<th scope="col">Edit</th>
						<th scope="col">Delete</th>
					</tr>
				</thead>
				<tbody>
					{events?.map((e, k) => {
						return (
							<tr key={k}>
								<th scope="row">{e.id}</th>
								<td>{e.title}</td>
								<td>{e.description}</td>
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
									<button name={e.id} className="btn btn-danger">
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default EventsTable;
