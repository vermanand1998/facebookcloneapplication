import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Avatar from "@mui/material/Avatar";
import "./myProfile.css";
import { Button } from "@mui/material";

function MyProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const bearerToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchData = async () => {
    console.log("inside myProfile");
    console.log("my id", userId);
    const response = await fetch(
      `https://academics.newtonschool.co/api/v1/facebook/user/${userId}`,
      {
        method: "Get",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          projectID: "mkrxzeo3o2hi",
        },
      }
    );
    const data = await response.json();
    setUserProfile(data.data);
    console.log("profile Data", data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const myProfile = {
    photoURL:
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FydG9vbiUyMGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3D",
  };

  return (
    <div>
      <Navbar />
      <section className="myProfileContent">
        <section className="profileHeader">
          <section className="profileImage">
            <img id="profileimg" src={myProfile.photoURL} alt="user" />
          </section>
          <section className="profileAvtar">
            <div className="profileAvtarDiv">
              <section className="avtarProfile">
                <Avatar
                  sx={{ width: 135, height: 135 }}
                  src={myProfile.photoURL}
                ></Avatar>
              </section>

              <section>
                <h3 className="userProfileName">{userProfile?.name}</h3>
              </section>
              <section>
                <Button
                  variant="contained"
                  className="Button-follow"
                  style={{
                    textTransform: "none",
                    width: "140px",
                    fontWeight: "bold",
                  }}
                >
                  Learn more
                </Button>
              </section>
            </div>
          </section>
        </section>
      </section>
    </div>
  );
}

export default MyProfile;
