import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Booking from "./components/bookingSection/Booking";
import Home from "./pages/Home";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/about/this/site" element={<About />} />
		<Route path="/booking" element={<Booking />} />
	</Routes>
);

export default App;
