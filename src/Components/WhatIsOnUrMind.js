import React from "react";
import "../Styles/WhatIsOnUrMind.css";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import closePNG from "../Images/close.png";
import Button from "@mui/material/Button";
import { useRef, useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import { useAuth } from "./Context";

function WhatIsOnUrMind({ onPostCreated }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const bearerToken = localStorage.getItem("token");
  const [errorPost, setErrorPost] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const username = localStorage.getItem("userName");
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { setflag } = useAuth();
  const handleCloseModal = () => {
    setOpen(false);
    setSelectedFile(null);
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setSelectedFile(selectedFile);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const myAvtarr = {
    photoURL:
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FydG9vbiUyMGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3D",
    displayName: "Pratik",
  };
  const myAvtar = {
    photoURL:
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FydG9vbiUyMGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3D",
    displayName: "Pratik",
  };

  // create a post

  const handleCreatePost = async () => {
    setflag(true);
    console.log("Function is called");

    try {
      const formData = new FormData();

      formData.append("content", postContent);

      formData.append("images", selectedFile);

      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/facebook/post/",

        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,

            projectID: "mkrxzeo3o2hi",
          },

          body: formData,
        }
      );

      if (response.ok) {
        console.log("Succecfully Posted");
        setSnackbarOpen(true);

        setSnackbarOpen(true);
        const data = await response.json();
        setTimeout(() => {
          setSnackbarOpen(false);
          window.location.reload();
        }, 1000);
        handleCloseModal();

        onPostCreated(data);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);

      setErrorPost("An error occurred. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPostImage(file);
    setSelectedFile(file);
  };

  const handleOpenImage = () => {
    triggerFileInput();
  };

  return (
    <div to={"/commingsoon"} className="wht-is-on-your-mind">
      {/* reels box */}
      <div className="parent-reel-section">
        <Link to={"/commingsoon"} className="reel-box">
          <img
            className="story-img"
            src="https://i0.wp.com/www.smartprix.com/bytes/wp-content/uploads/2022/11/Naruto.jpg?ssl=1&quality=80&w=800"
            alt="#"
          />
        </Link>
        <Link to={"/commingsoon"} className="reel-box">
          <img
            className="story-img"
            src="https://cdn.mos.cms.futurecdn.net/68nJwaxHSFmE6whdL4r5oH-970-80.jpg.webp"
            alt="#"
          />
        </Link>
        <Link to={"/commingsoon"} className="reel-box">
          <img
            className="story-img"
            src="https://thumbor.forbes.com/thumbor/trim/0x53:980x604/fit-in/711x399/smart/https://specials-images.forbesimg.com/imageserve/60834c47698b7d2cd708c3f0/0x0.jpg"
            alt="#"
          />
        </Link>
        <Link to={"/commingsoon"} className="reel-box">
          <img
            className="story-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnG0NLa59PE1ZVQeqq4ZJkkkhuibDTG2hHYg&usqp=CAU"
            alt="#"
          />
        </Link>
        <Link to={"/commingsoon"} className="reel-box">
          <img
            className="story-img"
            src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20191101175718/How-do-I-become-a-good-Java-programmer.png"
            alt="#"
          />
        </Link>
      </div>
      {/* mind box */}

      <div className="wht_on_ur_mind">
        <div className="first_st_div" onClick={() => setOpen(true)}>
          <div className="parent-avtar">
            <Avatar alt="Remy Sharp" src={myAvtar.photoURL} />
          </div>

          <div className="box__name">
            <p>{`What's on your mind,${username}?`}</p>
          </div>
        </div>
        <div className="wht_line_sec"></div>
        <div className="second_nd_div">
          <div className="icon_box">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yF/r/v1iF2605Cb5.png"
              alt=".."
            />
            <p>Live Video</p>
          </div>
          <div className="icon_box" onClick={handleOpen}>
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png"
              alt=".."
            />
            <p>Photos/Video</p>
          </div>
          <div className="icon_box">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/yMDS19UDsWe.png"
              alt=".."
            />
            <p>Feeling/Activity</p>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Post successfully created"
        style={{ backgroundColor: "white" }}
      />

      <section className="modal_for_create_post">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <div className="css-bhp9pd-MuiPaper-root-MuiCard-root">
              <div className="header_post_modal">
                <h3 className="test_">Create post</h3>

                <img
                  src={closePNG}
                  alt=""
                  onClick={handleClose}
                  className="clickableImage"
                />
              </div>
              <div className="line__modal"></div>
              <div className="avatar__modal">
                <Avatar src={myAvtarr.photoURL} />
                <strong>{username}</strong>
                <div className="friend_div">
                  <img
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/zPcex_q0TM1.png"
                    alt=".."
                  />
                  <p>Friends</p>
                </div>
              </div>
              <div className="middle_div">
                <input
                  type="text"
                  id="myInput"
                  placeholder={`What's on your mind, ${username}?`}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
              </div>
              <div className="add_tp_ur_post" onClick={handleOpenImage}>
                <p>Add to your post</p>
                {selectedFile && (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="selected_img"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                )}
                <img
                  onClick={triggerFileInput}
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png"
                  alt="select_img"
                />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileInputChange}
              />
              <Button
                variant="contained"
                className="post__button"
                style={{ textTransform: "none", borderRadius: "8px" }}
                onClick={handleCreatePost}
              >
                Post
              </Button>
            </div>
          </Box>
        </Modal>
      </section>
    </div>
  );
}

export default WhatIsOnUrMind;
