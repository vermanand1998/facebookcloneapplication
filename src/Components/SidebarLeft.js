
import React from "react";
import "../Styles/SidebarLeft.css";
import { ExpandMoreOutlined } from "@mui/icons-material";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from "@mui/icons-material/Chat";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const myAvtar = {
  photoURL:
    "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FydG9vbiUyMGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3D",
  displayName: "Pratik",
};

function SidebarLeft() {
 
  const username = localStorage.getItem("userName");

  return (
    <div className="SidebarLeft">
      <Link to={"/profile"} className="sidebar-icon">
      <Link to={"/profile"}>
        <div className="abc">
          <Avatar src={myAvtar.photoURL} className="a" />
        </div></Link>
        <Link to={"/profile"}>
        <h4>{username}</h4></Link>
      </Link>
     {/* <Link to={"/commingsoon"}> */}
      <Link to={"/createpage"} className="sidebarRow">
        <EmojiFlagsIcon />
        <p className="right-sec">Pages</p>
      </Link>
      <Link to={"/commingsoon"} className="sidebarRow">
        <PeopleIcon />
        <p className="right-sec">Friends</p>
      </Link>
      <Link to={"/commingsoon"} className="sidebarRow">
        <ChatIcon />
        <p className="right-sec">Messenger</p>
      </Link>
      <Link to={"/commingsoon"} className="sidebarRow">
        <StorefrontIcon />
        <p className="right-sec">Marketplace</p>
      </Link>
      <Link to={"/commingsoon"} className="sidebarRow">
        <VideoLibraryIcon />
        <p className="right-sec">Videos</p>
      </Link>
      <Link to={"/commingsoon"} className="sidebarRow">
        <ExpandMoreOutlined />
        <p className="right-sec">More</p>
      </Link>
      {/* </Link> */}
    </div>
  );
}

export default SidebarLeft;
