// import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import CursorProvider from "./components/context/CursorContext";

// createRoot(document.getElementById("root")).render(
// 	<BrowserRouter>
// 		<App />
// 	</BrowserRouter>
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<CursorProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</CursorProvider>
);