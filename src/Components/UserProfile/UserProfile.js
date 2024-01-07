import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "../Context";
import { Box, Button } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemButton from "@mui/material/ListItemButton";
function UserProfile() {
  const [userProfile, setUserProfile] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);
  const bearerToken = localStorage.getItem("token");
  const [Data, setData] = useState([]);
  const { puId } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const loggedInUserId = localStorage.getItem("userId");
  console.log(bearerToken);

  const fetchData = async () => {
    console.log("user id", puId);
    // console.log("user id", userId);
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/user/${puId}`,
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
        setUserProfile(data.data);
        console.log("User profile Data", data);

        if (data.data) {
          setIsFollowed(data.data.isFollowed);
        }
      } else {
        console.error("Failed to fetch user profile data");
      }
    } catch (error) {
      console.error("Error fetching user profile data", error);
    }
  };

  const toggleFollow = async () => {
    try {
      const method = isFollowed ? "DELETE" : "POST";

      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/follow/${puId}`,
        {
          method: method,
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            projectID: "mkrxzeo3o2hi",
          },
        }
      );

      if (response.ok) {
        console.log(
          `User ${isFollowed ? "unfollowed" : "followed"} successfully`
        );

        setIsFollowed(!isFollowed);
      } else {
        console.error(`Failed to ${isFollowed ? "unfollow" : "follow"} user`);
      }
    } catch (error) {
      console.error("Error toggling follow status", error);
    }
  };

  function isNullOrUndefinedorFalse(flag) {
    if (flag === null || flag === undefined || flag === false) {
      return true;
      
    }
    return false;
  }

  // fetching users post

  const GetData = async () => {
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/facebook/post?limit=1000",
        {
          headers: {
            projectID: "mkrxzeo3o2hi",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // const userPosts = data.data.filter(post => post.userId === puId);
        setData(data.data);
      } else {
        console.error("Error while fetching data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
  // const userPosts = Data.filter(post => post.userId === puId);
  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
    GetData();
  }, []);
  const userPosts = Data.filter((post) => post.author._id === puId);

  const openDropdown = () => {
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div>
      <Navbar />
      <section className="myProfileContent">
        <section className="profileHeader">
          <section className="profileImage">
            <img
              id="profileimg"
              src={userProfile?.profileImage || "defaultImageURL"}
              alt="userImage"
            />
          </section>
          <section className="profileAvtar">
            <div className="profileAvtarDiv">
              <section className="avtarProfile">
                <Avatar
                  sx={{ width: 135, height: 135 }}
                  src={userProfile?.profileImage || "de"}
                ></Avatar>
              </section>

              <section>
                <h3 className="userProfileName">{userProfile?.name}</h3>
              </section>
              <section className="btn-follow-mess">
                <Button
                  variant="contained"
                  className="Button-follow"
                  onClick={toggleFollow}
                  style={{
                    textTransform: "none",
                    width: "100px",
                    fontWeight: "bold",
                  }}
                >
                  {isFollowed ? "Unfollow" : "Follow"}
                </Button>
              </section>
            </div>
          </section>
        </section>
        {/* <div className="line_info"></div> */}
      </section>

      <div className="user_user_info">
        <div className="about_field">
          <h2>About</h2>

          {/* Displaying user details */}
          <p>
            <strong>Name:</strong> {userProfile?.name}
          </p>
          <p>
            <strong>Email:</strong> {userProfile?.email}
          </p>
          <p>
            <strong>Gender:</strong> {userProfile?.gender}
          </p>
          <p>
            <strong>Phone:</strong> {userProfile?.phone}
          </p>
        </div>
        {/* Displaying address details */}
        <div className="about_field">
          <h3>Address</h3>
          {userProfile?.address &&
            userProfile?.address.map((address, index) => (
              <p key={index}>
                {address.street}, {address.city}, {address.state},{" "}
                {address.country} - {address.zipCode}
              </p>
            ))}
        </div>
        {/* Displaying experience */}
        <div className="about_field">
          <h3>Work Experience</h3>
          {userProfile?.workExperience &&
            userProfile?.workExperience.map((experience, index) => (
              <div key={index}>
                <p>
                  <strong>Company:</strong> {experience.companyName}
                </p>
                <p>
                  <strong>Designation:</strong> {experience.designation}
                </p>
                <p>
                  <strong>Location:</strong> {experience.location}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(experience.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(experience.endDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Description:</strong> {experience.description}
                </p>
              </div>
            ))}
        </div>
        {/* Displaying education details */}
        <div className="about_field">
          <h3>Education</h3>
          {userProfile?.education &&
            userProfile?.education.map((education, index) => (
              <div key={index}>
                <p>
                  <strong>School Name:</strong> {education.schoolName}
                </p>
                <p>
                  <strong>Degree:</strong> {education.degree}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(education.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(education.endDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Description:</strong> {education.description}
                </p>
              </div>
            ))}
        </div>
        {/* Displaying skills */}
        <div className="about_field">
          <h3>Skills</h3>
          {userProfile?.skills && (
            <ul>
              {userProfile.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="user_post">
        {userPosts.map((post, index) => (
          <Box
            key={index}
            sx={{
              maxWidth: 450,
              maxHeight: 800,
              height: "50em",
              backgroundColor: "white",
              boxShadow:
                "0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)",
              borderRadius: 3,
            }}
          >
            <div className="userProfile-img-name" to="/userprofile">
              <div className="accountPost-img">
                <Avatar src={post.author.profileImage} />

                <div className="author-name-name">
                  <h4 className="naem-author">{post.author.name}</h4>
                </div>

                <div
                  className="dlt-fnc"
                  style={{ position: "relative", left: "61%", top: "5px" }}
                >
                  {post.author._id === loggedInUserId && (
                    <div className="moreIconDiv">
                      <div className="moreIcon" onClick={openDropdown}>
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

                {/* dlt function */}
              </div>
            </div>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.content}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="194"
              src={
                post.images && post.images.length > 0
                  ? post.images[0]
                  : "defaultImageURL"
              }
              alt="Post Image"
              sx={{
                height: "362px",
                borderRadius: "0px 0px 10px 10px",
              }}
            />
          </Box>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
