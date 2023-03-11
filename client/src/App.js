
import React, { useState, useContext } from "react";
import AnimRoutes from "./components/AnimRoutes";
import { motion } from "framer-motion";
import { CursorContext } from "./components/context/CursorContext";
import Footer from "./components/footer";


const App = () => {
const { cursorVariants, cursorBG } = useContext(CursorContext);
	return (
		<>
			<AnimRoutes />
			<div className="frame">
				<motion.div variants={cursorVariants} animate={cursorBG}></motion.div>
			</div>
			<Footer />
		</>
	);
};


export default App;
