import React, { useState, useEffect, createContext } from "react";

// create context
export const CursorContext = createContext();

const CursorProvider = ({ children }) => {
  // cursor position state
  const [cursorPos, setCursorPos] = useState({
 
  });
  // cursor bg state
  const [cursorBG, setCursorBG] = useState("default");

  const mobileViewportIsActive = window.innerWidth < 768;

  useEffect(() => {
    if (!mobileViewportIsActive) {
      const move = (e) => {
        
      };
      window.addEventListener("mousemove", move);
      // remove event
      return () => {
        
      };
    } 
  });

  // cursor variants
  const cursorVariants = {
   
   
  };

  // mouse enter handler
  const mouseEnterHandler = () => {
    setCursorBG("text");
  };
  // mouse leaver handler
  const mouseLeaveHandler = () => {
    setCursorBG("default");
  };

  return (
    <CursorContext.Provider
      value={{ cursorVariants, cursorBG, mouseEnterHandler, mouseLeaveHandler }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export default CursorProvider;
