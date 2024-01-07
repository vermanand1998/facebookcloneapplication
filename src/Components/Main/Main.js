import React from "react";
import Navbar from "../Navbar";
import Homepage from "../Homepage";
import '../Main/Main.css'
import WhatIsOnUrMind from "../WhatIsOnUrMind";
import SidebarLeft from "../SidebarLeft";
import RightSideBar from "../RightSideBar";

function Main() {
  return (
    <div>
      <Navbar />
      <RightSideBar/>
      <WhatIsOnUrMind/>
      <Homepage />
      <SidebarLeft/>
        
    </div>
  );
}

export default Main;
