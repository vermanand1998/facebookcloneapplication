import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import MoodRoundedIcon from "@mui/icons-material/MoodRounded";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CollectionsIcon from "@mui/icons-material/Collections";
import PlaceIcon from "@mui/icons-material/Place";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { userMap } from "../Datastoar";
import { Link } from "react-router-dom";
import "./home.css";
import { useAuth } from "../Context/Context";

//import { BrowserRouter, Route, Routes } from "react-router-dom";

function HomePage() {
  const boxes = [1, 2, 3, 4];

  const [searchQuery, setSearchQuery] = useState("");

  const [postContent, setPostContent] = useState("");

  const [postImage, setPostImage] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const bearerToken = localStorage.getItem("token");
  const [errorPost, setErrorPost] = useState("");
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState("");
  const [likeCounts, setLikeCounts] = useState({});
  const { setPostuserId } = useAuth();
  const [commentCount, setCommentCount] = useState({});
  const [Click, SetClick] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [editedCommentId, setEditedCommentId] = useState("");
  const loggedInUserId = localStorage.getItem("userId");
  const loggedInUserName = localStorage.getItem("userName");

  const handlepaperclick = () => {
    alert("paper is clickd!!!!");
  };

  const handleSearch = () => {
    alert(`Search for:${searchQuery}`);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://academics.newtonschool.co/api/v1/facebook/post?limit=100",

      {
        method: "Get",

        headers: {
          Authorization: `Bearer ${bearerToken}`,

          projectID: "f104bi07c490",
        },
      }
    );

    const r = await response.json();

    // console.log(r);

    setApiData(r["data"]);
  };

  const style = {
    position: "absolute",

    top: "60%",

    left: "50%",

    transform: "translate(-50%, -50%)",

    width: 400,

    height: 320,

    bgcolor: "background.paper",

    border: "2px solid #000",

    boxShadow: 24,

    p: 4,
  };

  async function fetchCreatedPost() {
    const response = await fetch(
      "https://academics.newtonschool.co/api/v1/facebook/post/",

      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${bearerToken}`,

          projectID: "f104bi07c490",
        },
      }
    );
  }

  const handleCreatePost = async () => {
    console.log("Function is called");

    try {
      const formData = new FormData();

      formData.append("content", postContent);

      if (postImage) {
        formData.append("images", postImage);
      }

      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/facebook/post/",

        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${bearerToken}`,

            projectID: "f104bi07c490",
          },

          body: formData,
        }
      );

      if (response.ok) {
        console.log("Succecfully Posted");

        const data = await response.json();

        // console.log("Post Data:", data);

        fetchData();
      } else {
        const errorData = await response.json();

        setErrorPost(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);

      setErrorPost("An error occurred. Please try again.");
    }
  };

  const handleOpenImage = () => {
    const fileInput = document.getElementById("imageInput");

    fileInput.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setPostImage(file);
  };

  // For Like Post

  const handleLikePost = async (postId) => {
    console.log("Like Function Called");

    const isLiked = Click;

    SetClick(!isLiked);

    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/like/${postId}`,

        {
          method: isLiked ? "DELETE" : "POST",

          headers: {
            Authorization: `Bearer ${bearerToken}`,

            projectID: "f104bi07c490",
          },
        }
      );

      if (response.ok) {
        console.log(isLiked ? "Unlike is clicked" : "Like is clicked");

        setLikeCounts((prevCounts) => ({
          ...prevCounts,

          [postId]: isLiked ? prevCounts[postId] - 1 : prevCounts[postId] + 1,
        }));
      } else {
        const errorData = await response.json();

        console.error("Error while liking the post:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const counts = {};

    const commentsData = {};

    // const fetchUserInformation = async (userId) => {

    //   const response = await fetch(

    //     `https://academics.newtonschool.co/api/v1/user/${userId}`,

    //     {

    //       method: "GET",

    //       headers: {

    //         Authorization: `Bearer ${bearerToken}`,

    //         projectID: "f104bi07c490",

    //       },

    //     }

    //   );

    //   if (response.ok) {

    //     const userData = await response.json();

    //     userMap.set(userId, userData.data);

    //   } else {

    //     console.error("Error while fetching user information");

    //   }

    // };

    if (apiData) {
      apiData.forEach((post) => {
        counts[post._id] = post.likeCount;

        commentsData[post._id] = [];

        handleFetchComments(post._id);

        // if (post.comments) {

        //   post.comments.forEach((comment) => {

        //     fetchUserInformation(comment.author);

        //   });

        // }
      });

      setLikeCounts(counts);

      setComments(commentsData);
    }
  }, [apiData]);

  // For Display Comment

  const handleFetchComments = async (postId) => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/post/${postId}/comments`,

        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${bearerToken}`,

            projectID: "f104bi07c490",
          },
        }
      );

      if (response.ok) {
        console.log("Comment is click");

        const data = await response.json();

        // console.log(data);

        const commentsWithUsernames = data.data.map((comment) => ({
          ...comment,

          authorName: userMap.get(comment.author)?.name,
        }));

        setComments((prevComments) => ({
          ...prevComments,

          [postId]: commentsWithUsernames,
        }));
      } else {
        const errorData = await response.json();

        console.error("Error while fetching comments:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //for Create Comment

  const createCommentForPost = async (postId) => {
    console.log("create comment function is called ");

    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/comment/${postId}`,

        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${bearerToken}`,

            projectID: "f104bi07c490",

            "Content-Type": "application/json",
          },

          body: JSON.stringify({ content: commentInput }),
        }
      );

      if (response.ok) {
        console.log("Comment created successfully");

        const data = await response.json();

        setComments((prevComments) => ({
          ...prevComments,

          [postId]: [...prevComments[postId], data.data.content],
        }));

        setCommentInput("");

        handleFetchComments(postId);
      } else {
        const errorData = await response.json();

        console.error("Error while creating a comment:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleComment = (e) => {
    setCommentInput(e.target.value);
  };

  //for Update Comment

  const updateCommentForPost = async (postId, commentId, updatedComment) => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/comment/${commentId}`,

        {
          method: "PATCH",

          headers: {
            Authorization: `Bearer ${bearerToken}`,

            projectID: "f104bi07c490",

            "Content-Type": "application/json",
          },

          body: JSON.stringify({ content: updatedComment }),
        }
      );

      if (response.ok) {
        console.log("Comment updated successfully");
      } else {
        const errorData = await response.json();

        console.error("Error while updating a comment:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditComment = (postId, commentId, commentContent) => {
    setEditedComment(commentContent);

    setEditedCommentId(commentId);
  };

  const handleSaveEditedComment = async (postId) => {
    await updateCommentForPost(postId, editedCommentId, editedComment);

    setEditedComment("");

    setEditedCommentId("");

    handleFetchComments(postId);
  };

  const isEditingComment = (commentId) => commentId === editedCommentId;

  // For Delete comment

  const deleteCommentForPost = async (postId, commentId) => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/comment/${commentId}`,

        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${bearerToken}`,

            projectID: "f104bi07c490",
          },
        }
      );

      if (response.ok) {
        console.log("Comment deleted successfully");

        setComments((prevComments) => ({
          ...prevComments,

          [postId]: prevComments[postId].filter(
            (comment) => comment._id !== commentId
          ),
        }));
      } else {
        const errorData = await response.json();

        console.error("Error while deleting a comment:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const imageUrls = [
    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1147.jpg",
  ];

  return (
    <div className="homePage">
      {/* For Status */}

      <section className="gridBox">
        <Grid container justifyContent="center" spacing={2}>
          <Paper className="paper" onClick={handlepaperclick}>
            <img
              className="imgStory"
              src={
                "https://thumbor.forbes.com/thumbor/trim/0x53:980x604/fit-in/711x399/smart/https://specials-images.forbesimg.com/imageserve/60834c47698b7d2cd708c3f0/0x0.jpg"
              }
            />
          </Paper>

          <Paper className="paper" onClick={handlepaperclick}>
            <img
              className="imgStory"
              src={
                "https://cdn.mos.cms.futurecdn.net/68nJwaxHSFmE6whdL4r5oH-970-80.jpg.webp"
              }
            />
          </Paper>

          <Paper className="paper" onClick={handlepaperclick}>
            <img
              className="imgStory"
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnG0NLa59PE1ZVQeqq4ZJkkkhuibDTG2hHYg&usqp=CAU"
              }
            />
          </Paper>

          <Paper className="paper" onClick={handlepaperclick}>
            <img
              className="imgStory"
              src={
                "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20191101175718/How-do-I-become-a-good-Java-programmer.png"
              }
            />
          </Paper>
        </Grid>
      </section>

      {/* For Create Post */}

      <section className="searchSection">
        <Box className="searchBox">
          <div className="searchBar">
            <Avatar src={userMap.get(loggedInUserId)?.photo} />

            <div className="searchInputpost">
              <InputBase
                className="searchInputUser"
                placeholder={`What's on your mind,${loggedInUserName}`}
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
          </div>

          <Divider id="divider" />

          <div className="filterButtons">
            <Button id="buttonFilter">Live</Button>

            <Button
              id="buttonFilter"
              onClick={handleOpen}
              startIcon={<AddAPhotoRoundedIcon />}
            >
              {" "}
              Photo/video
            </Button>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <section className="createPostHeader">
                  <Typography variant="h6" component="h2">
                    Create a Post
                  </Typography>

                  <Divider id="createPostDivider" />
                </section>

                <section className="createPostAccount">
                  <Avatar src={userMap.get(loggedInUserId)?.photo} />

                  <h3>{loggedInUserName}</h3>
                </section>

                <section>
                  <textarea
                    id="createPostBio"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  >
                    What's on your mind,{loggedInUserName}?
                  </textarea>

                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="imageInput"
                    onChange={handleImageChange}
                  />
                </section>

                <section className="createPostBar">
                  <h3>Add to your post</h3>

                  <CollectionsIcon onClick={handleOpenImage} />

                  <PlaceIcon />
                </section>

                <section>
                  <button className="createPostBtn" onClick={handleCreatePost}>
                    Post
                  </button>
                </section>
              </Box>
            </Modal>

            <Button id="buttonFilter" startIcon={<MoodRoundedIcon />}>
              {" "}
              Feeling/activity
            </Button>
          </div>
        </Box>
      </section>

      {/* For Post */}

      <section className="postSection">
        {apiData &&
          apiData.map((post) => (
            <Box className="postBox" key={post._id}>
              <Link className="userProfileName" to="/userprofile">
                <div
                  onClick={() => {
                    setPostuserId(post.author._id);
                  }}
                  className="accountPostBox"
                >
                  {/*<Avatar>{post.author.profileImage}</Avatar>*/}

                  <Avatar
                    alt={post.author.name}
                    src={post.author.profileImage}
                  />

                  <Typography>{post.author.name}</Typography>
                </div>
              </Link>

              <div className="captionForPost">
                <Typography id="captionPost">{post.content}</Typography>
              </div>

              <section className="imgPostBox">
                <img
                  src={post.channel.image}
                  //src={"https://img.freepik.com/free-photo/maldives-island_74190-478.jpg?w=996&t=st=1696610601~exp=1696611201~hmac=b604347e0b051b603ab3ebd409486633c249828ee4da57b9e2d786c4d16dcd2e"}

                  className="imgPost"
                  alt="Image of post"
                />
              </section>

              <section className="countLikeComment">
                <div className="countLike">
                  <ThumbUpOutlinedIcon />

                  <Typography>{likeCounts[post._id]}</Typography>
                </div>

                <div className="countComment">
                  <CommentOutlinedIcon />

                  <Typography>{post.commentCount}</Typography>
                </div>
              </section>

              <Divider id="likeDevider" />

              <section className="postButtons">
                <Button
                  onClick={() => handleLikePost(post._id)}
                  startIcon={<ThumbUpOutlinedIcon />}
                >
                  Like
                </Button>

                <Button
                  // onClick={() => handleFetchComments(post._id)}

                  startIcon={<CommentOutlinedIcon />}
                >
                  Comment
                </Button>
              </section>

              <Divider />

              <section className="PostComment">
                <div className="commentInputDiv">
                  <Avatar sx={{ width: 35, height: 35 }}></Avatar>

                  <input
                    type="text"
                    id="inputBoxComment"
                    placeholder="Write a comment..."
                    value={commentInput}
                    onChange={handleComment}
                  />

                  <button onClick={() => createCommentForPost(post._id)}>
                    <SendIcon />
                  </button>
                </div>

                <div className="commentsSection">
                  <div className="commentData">
                    <h3 id="headingComment">Comment</h3>

                    {comments[post._id] &&
                      comments[post._id].map((comment, index) => (
                        <div key={index} className="comment">
                          <div className="CommentAuthor">
                            <Avatar
                              sx={{ width: 30, height: 30 }}
                              src={userMap.get(comment.author)?.photo}
                            ></Avatar>

                            <h3>{comment.authorName}</h3>

                            {comment.author === loggedInUserId && (
                              <div className="editCommetSection">
                                <EditIcon
                                  className="editIconComment"
                                  onClick={() =>
                                    handleEditComment(
                                      post._id,

                                      comment._id,

                                      comment.content
                                    )
                                  }
                                ></EditIcon>

                                <DeleteIcon
                                  className="deleteIconComment"
                                  onClick={() =>
                                    deleteCommentForPost(post._id, comment._id)
                                  }
                                ></DeleteIcon>
                              </div>
                            )}
                          </div>

                          {isEditingComment(comment._id) ? ( // Check if the comment is being edited
                            <div className="editCommentDiv">
                              <input
                                type="text"
                                id="inputBoxCommentEdit"
                                placeholder="Edit your comment..."
                                value={editedComment}
                                onChange={(e) =>
                                  setEditedComment(e.target.value)
                                }
                              />

                              <button
                                className="editCommentBtn"
                                onClick={() =>
                                  handleSaveEditedComment(post._id)
                                }
                              >
                                <SendIcon />
                              </button>
                            </div>
                          ) : (
                            <h3 className="commentH3">{comment.content}</h3>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </section>
            </Box>
          ))}
      </section>
    </div>
  );
}

export default HomePage;
