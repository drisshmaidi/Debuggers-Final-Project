import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import { Typography } from "@mui/material";

export default function SimpleBottomNavigation() {
	const [value, setValue] = React.useState(0);

	return (
		<Box sx={{ width: "100%", bottom: "0" }}>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
			>
				<Typography>© Copy right 2023 | All rights reserved </Typography>
			</BottomNavigation>
		</Box>
	);
}
