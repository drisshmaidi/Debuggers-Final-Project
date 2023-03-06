import React from "react";
import video from "./video.mp4";
import "./HomeVideo.css";
import Header from "../../components/Header";



const Main = () => {
	return (
		<div>
			<Header />
			<video type="video/mp4" src={video} autoPlay loop muted />
		</div>
	);
};

export default Main;
