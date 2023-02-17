import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import AdminPortal from "./pages/AdminDashboard";

const userId = 1;

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/about/this/site" element={<About />} />
		<Route
			path="/events/createNewEvents"
			element={<AdminPortal UID={userId} />}
		/>
	</Routes>
);

export default App;
