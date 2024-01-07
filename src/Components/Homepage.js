import React, { useState, useEffect } from "react";
import "../Styles/Homepage.css";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import like from "../Images/like.png";
import love from "../Images/thumbs-up (1).png";
import chat from "../Images/chat.png";
import { Box, Button } from "@mui/material";
import { Send } from "@mui/icons-material";
import { UserMap } from "./Datastore";
import { useAuth } from "./Context";
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemButton from "@mui/material/ListItemButton";

function Homepage() {
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [likedStatus, setLikedStatus] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const { setpuId,flag,setflag } = useAuth();
  const [likedPosts, setLikedPosts] = useState([]);
  const [Data, setData] = useState([]);
  const [comments, setComments] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const bearerToken = localStorage.getItem("token");
  const [apiData] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [editedCommentId, setEditedCommentId] = useState("");
  const loggedInUserId = localStorage.getItem("userId");


  useEffect(()=>{
 
      GetData();
      setLikeCounts(false);
  
    
  },[page,postsPerPage,flag])


  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const GetData = async () => {
    setflag(false);
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/post?limit=${postsPerPage}&page=${page}`,
        {
          headers: {
            projectID: "mkrxzeo3o2hi",
          },
        }
      );

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.data.length === 0) {
          // If there are no more posts, set hasMore to false
          setHasMore(false);
        } else {
          // Append the new posts to the existing ones
          setData((prevData) => [...prevData, ...data.data]);
        // setData(data.data);
     

        data.data.forEach(async (post) => {
          await delay(2000); // Add a delay of 1 second between requests
          handleFetchComments(post._id,bearerToken);
        });
      }
      } else {
        console.error("Error while fetching data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };



  /*like post*/

  const handleLikePost = async (postId) => {
    const isLiked = likedStatus[postId] || false;

    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/like/${postId}`,
        {
          method: isLiked ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            projectID: "mkrxzeo3o2hi",
          },
        }
      );

      if (response.ok) {
        toast.success(isLiked ? "Post Unliked!" : "Post Liked!", {
          position: toast.POSITION.BOTTOM_LEFT,
          iconTheme: { primary: "#0566ff" },
        });
        const updatedData = Data.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              likeCount: isLiked ? post.likeCount - 1 : post.likeCount + 1,
            };
          }
          return post;
        });

        setData(updatedData);
        setLikedStatus((prevStatus) => ({
          ...prevStatus,
          [postId]: !isLiked,
        }));
      } else {
        const errorData = await response.json();

        // Check if the error is due to the post already being liked
        if (
          response.status === 400 &&
          errorData.message === "You already liked this post"
        ) {
          // Assume the user wants to unlike, so update the state accordingly
          setLikedStatus((prevStatus) => ({
            ...prevStatus,
            [postId]: true, // Update the local state to simulate unliking
          }));

          setLikeCounts((prevCounts) => ({
            ...prevCounts,
            [postId]: prevCounts[postId] - 1,
          }));
        } else {
          console.error("Error while liking/unliking the post:", errorData);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const counts = {};
    const commentsData = {};
    if (apiData) {
      apiData.forEach((post) => {
        counts[post._id] = post.likeCount;
        commentsData[post._id] = [];
        handleFetchComments(post._id);
      });
      setLikeCounts(counts);
      setComments(commentsData);
    }
  }, [apiData]);


  /*fetching comments*/

  const handleFetchComments = async (postId) => {
    // try {
    const response = await fetch(
      `https://academics.newtonschool.co/api/v1/facebook/post/${postId}/comments`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          projectID: "mkrxzeo3o2hi",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: data.data,
      }));
    } else {
      const errorData = await response.json();
      console.error("Error while fetching comments:", errorData);
    }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  const handleCommentCountUpdate = (postId, increment) => {
    // Update comment count on the client side
    const updatedData = Data.map((post) => {
      if (post._id === postId) {
        return {
          ...post,
          commentCount: post.commentCount + increment,
        };
      }
      return post;
    });

    setData(updatedData);
  };


  /*adding comments */

  const createCommentForPost = async (postId) => {
    console.log("create comment function is called ");
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/comment/${postId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            projectID: "mkrxzeo3o2hi",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: commentInput }),
        }
      );

      if (response.ok) {
        console.log("Comment created successfully");
        const data = await response.json();
        // Increment the comment count for the current post
        const updatedData = Data.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              commentCount: post.commentCount + 1,
            };
          }
          return post;
        });
        setData(updatedData);

        // Update the comments state
        setComments((prevComments) => ({
          ...prevComments,
          [postId]: [...prevComments[postId], data.data.content],
        }));

        setCommentInput("");
        handleFetchComments(postId);
        toast.success("Comment added successfully", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
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

  /**edit comments */

  const updateCommentForPost = async (postId, commentId, updatedComment) => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/comment/${commentId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            projectID: "mkrxzeo3o2hi",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: updatedComment }),
        }
      );

      if (response.ok) {
        console.log("Comment updated successfully");
        toast.success("Comment edited successfully", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
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

  const deleteCommentForPost = async (postId, commentId) => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            projectID: "mkrxzeo3o2hi",
          },
        }
      );

      if (response.ok) {
        console.log("Comment deleted successfully");
        toast.success("Comment deleted successfully", {
          position: toast.POSITION.BOTTOM_LEFT,
        });

        // Decrement the comment count for the current post
        handleCommentCountUpdate(postId, -1);

        // Update the comments state
        setComments((prevComments) => ({
          ...prevComments,
          [postId]: prevComments[postId].filter((comment) => comment._id !== commentId),
        }));

        handleFetchComments(postId);
      } else {
        const errorData = await response.json();
        console.error("Error while deleting a comment:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const openDropdown = () => {
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // dlt post//
  const handleDeletePost = async (postId) => {
    const loggedInUserId = localStorage.getItem("userId");

    const postToDelete = Data.find((post) => post._id === postId);
    if (postToDelete && postToDelete.author._id === loggedInUserId) {
      try {
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/facebook/post/${postId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              projectID: "mkrxzeo3o2hi",
            },
          }
        );

        if (response.ok) {
          console.log(`Post with ID ${postId} deleted successfully`);
          const updatedPosts = Data.filter((post) => post._id !== postId);
          setTimeout(() => {
        
            window.location.reload();
          }, 1000);
          
          setData(updatedPosts);
        } else {
          console.error(`Failed to delete post with ID ${postId}`);
        }
      } catch (error) {
        console.error("Error deleting post", error);
      }
    } else {
      console.log("You are not authorized to delete this post.");
    }
  };

  //dlt post//

  return (
    <div className="post-box">
      <ToastContainer />
      {Data &&
        Data.map((post) => {
          const buttonStyle = {
            cursor: "pointer",
            marginTop: "-4px",
            fontSize: "22px",
            textTransform: "lowercase",
            color: likedStatus[post._id] ? "#0566ff" : "gray",
          };

          return (
            <Box
              className="main_post_box"
              key={post._id}
            >
              <Link
                className="userProfile-img-name"
                to={`/userprofile/${post?.author?._id}`}
              >
                <div
                  className="accountPost-img"
                  onClick={() => {
                    console.log("Setting puId:", post?.author?._id);
                    setpuId(post?.author?._id);
                  }}
                >
                  <Avatar
                    alt={post.author.name}
                    src={post.author.profileImage}
                  />
                  <div className="author-name-name">
                    <h4 className="naem-author">{post.author.name}</h4>
                  </div>
                </div>
              </Link>
                      {/* dlt */}
                      
                <div
                  className="dlt-fnc-main"
                  style={{ position: "relative", left: "61%", top: "5px" }}
                >
                  {post.author._id === loggedInUserId && (
                    <div className="moreIconDiv-main">
                      <div className="moreIcon-main" onClick={openDropdown}>
                        <MoreVertIcon />
                      </div>
                      {isDropdownOpen && (
                        <div
                          className="dropdownContent"
                          onMouseEnter={openDropdown}
                          onMouseLeave={closeDropdown}
                        >
                          <div className="accountBox">
                            <div
                              className="dropMyBookings"
                              onClick={closeDropdown}
                            >
                              <ListItemButton
                                onClick={() => handleDeletePost(post._id)}
                              >
                                <p>Delete</p>
                              </ListItemButton>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                      {/* dlt */}
              <CardContent>
                <Typography
                  variant="body2"
                  
                  style={{ width: "427px",color:"#1e1b1b" }}
                >
                  {post.content}
                </Typography>
              </CardContent>

              <div className="cardcontent">
                <img
                  src={
                    post.images && post.images.length > 0
                      ? post.images[0]
                      : "defaultImageURL"
                  }
                  alt="not available"
                />
              </div>

              <div className="like-icon">
                <div className="like-section-count">
                  <img src={like} alt="..." />
                  <img src={love} alt="..." />
                  <p id="L-count">{post.likeCount}</p>
                </div>
                <div className="commemt-icon">
                  <p>{post.commentCount}</p>
                  <img
                    src={chat}
                    alt="..."
                    style={{
                      position: "relative",
                      top: "10px",
                      height: "21px",
                    }}
                  />
                </div>
              </div>
              <div className="line"></div>

              <div className="footer">
                <div
                  className="like-post-like-btn"
                  onClick={() => handleLikePost(post._id)}
                >
                  <Button
                    onClick={handleLikeClick}
                    style={buttonStyle}
                    className="Like_-button"
                  >
                    <span>
                      <BiSolidLike
                        onClick={handleLikeClick}
                        style={buttonStyle}
                      />
                      <span id="S-comment">Like</span>
                    </span>
                  </Button>
                </div>
                <div
                  className="like-post-like-btn"
                  style={{ marginRight: "31px", marginTop: "-3px" }}
                >
                  <Button
                    style={{
                      textTransform: "none",
                      color: "black",
                      width: "115px",
                      background: "none",
                    }}
                    className="Like_-button"
                  >
                    {/* <img src={comment} alt="..." /> */}
                    <FaComment style={{ fontSize: "20px", color: "gray" }} />
                    <span
                      id="S-comment"
                      style={{ position: "relative", top: "-1px" }}
                    >
                      Comment
                    </span>
                  </Button>
                </div>
              </div>
              <div className="line2"></div>

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
                  <Send />
                </button>
              </div>

              <div className="chat-container">
                {comments[post._id] && (
                  <div className="scroll-container">
                    {comments[post._id].map((comment, index) => (
                      <div key={index} className="comment">
                        <div
                          className="add-commnet-section"
                          style={{ display: "flex" }}
                        >
                          <Avatar
                            style={{
                              height: "35px",
                              width: "35px",
                              marginLeft: "12px",
                              marginRight: "4px",
                              cursor: "pointer",
                            }}
                            src={UserMap.get(comment.author)?.img}
                          ></Avatar>

                          <div className="added-comment">
                            <p>
                              {comment.author && (
                                <strong style={{ fontSize: "12px" }}>
                                  {UserMap.get(comment.author)?.name}
                                </strong>
                              )}
                            </p>
                            {isEditingComment(comment._id) ? (
                              <div className="edit-comment-after-clicked">
                                <input
                                  type="text"
                                  id="inputBoxCommentEdit"
                                  placeholder="Edit your comment..."
                                  value={editedComment}
                                  onChange={(e) =>
                                    setEditedComment(e.target.value)
                                  }
                                  className="comment-edit-input" // Apply the CSS class here
                                />
                                <Send
                                  className="editCommentBtn"
                                  onClick={() =>
                                    handleSaveEditedComment(post._id)
                                  }
                                >
                                  <Send />
                                </Send>
                              </div>
                            ) : (
                              <p style={{ fontSize: "15px" }}>
                                {comment.content}
                              </p>
                            )}
                          </div>
                        </div>

                        {comment.author === loggedInUserId && (
                          <div style={{ display: "flex" }} className="l-r-s">
                            <p
                              onClick={() =>
                                handleEditComment(
                                  post._id,
                                  comment._id,
                                  comment.content
                                )
                              }
                            >
                              Edit
                            </p>
                            <p
                              onClick={() =>
                                deleteCommentForPost(post._id, comment._id)
                              }
                            >
                              Delete
                            </p>
                            <p>Share</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Box>
          );
        })}
        {hasMore && (
        <Button onClick={loadMorePosts} className="LoadMoreButton">
          Load More
        </Button>
      )}

    </div>
  );
}

export default Homepage;
