import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";

const userId = 1;

const App = () => (


	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/about/this/site" element={<About />} />
		<Route path="/events/createNewEvents" element={<CreateEvent UID={userId} />} />
	</Routes>
);

export default App;
