
import React, { useState, useContext } from "react";
import AnimRoutes from "./components/AnimRoutes";
import { motion } from "framer-motion";
import { CursorContext } from "./components/context/CursorContext";
import Header from "./components/Header";


const App = () => {
const { cursorVariants, cursorBG } = useContext(CursorContext);
	return (
		<>
			<AnimRoutes />
			<div className="frame">
				<motion.div variants={cursorVariants} animate={cursorBG}></motion.div>
			</div>
		</>
	);
};


export default App;
