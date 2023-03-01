import React from "react";
import video from "./video.mp4";
import "./HomeVideo.css";



const Main = () => {
	return (
			<video type="video/mp4" src={video} autoPlay loop muted />
	);
};

export default Main;
