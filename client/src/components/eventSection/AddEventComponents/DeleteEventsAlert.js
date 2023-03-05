import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import Typography from "@mui/joy/Typography";

export default function AlertDialogModal({ eventId, title  }) {

	const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState(
			`Are you sure you want to delete event ${title}?`
		);
    const [eventDeleted,setEventDeleted] =React.useState(false);

    const token = localStorage.getItem("Token");
	const header = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};


    const handleDelete = () => {

        fetch("/api/deleteEvent", {
					method: "DELETE",
					headers: header,
					body: JSON.stringify({ eventId }),
				}).then((res) => res.json())
					.then((data) => {
						setEventDeleted(true);
                        setMsg(data.msg);

					});

        //setOpen(false);
    };

	return (
		<React.Fragment>
			<Button
				variant="outlined"
				color="danger"
				endDecorator={<DeleteForever />}
				onClick={() => setOpen(true)}
			>
				Discard
			</Button>
			<Modal open={open} onClose={() => setOpen(false)}>
				<ModalDialog
					variant="outlined"
					role="alertdialog"
					aria-labelledby="alert-dialog-modal-title"
					aria-describedby="alert-dialog-modal-description"
				>
					<Typography
						id="alert-dialog-modal-title"
						component="h2"
						startDecorator={
							eventDeleted ? <InfoRoundedIcon /> : <WarningRoundedIcon />
						}
					>
						Confirmation
					</Typography>
					<Divider />
					<Typography
						id="alert-dialog-modal-description"
						textColor="text.tertiary"
					>
						{msg}
					</Typography>
					<Box
						sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 2 }}
					>
						{!eventDeleted ? (
							<Button
								variant="plain"
								color="neutral"
								onClick={() => setOpen(false)}
							>
								Cancel
							</Button>
						) : (
							""
						)}
						{eventDeleted ? (
							<Button
								variant="plain"
								color="neutral"
								onClick={() => window.location.reload()}
							>
								Ok
							</Button>
						) : (
							<Button
								variant="solid"
								color="danger"
								onClick={() => handleDelete()}
							>
								Delete Event
							</Button>
						)}
					</Box>
				</ModalDialog>
			</Modal>
		</React.Fragment>
	);
}
