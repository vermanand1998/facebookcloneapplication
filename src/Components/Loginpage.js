import React, { useState } from "react";
import "../Styles/Loginpage.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { setBearerToken, UserMap } from "./Datastore";

function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [unAuthorized, setUnAuthorized] = useState(false);
  const [apiDown, setAPiDown] = useState(false);
  const navigate = useNavigate();


  function mailInput(e) {
    const mailSet = e.target.value;
    setEmail(mailSet);
  }

  function passwordInput(e) {
    const passwordSet = e.target.value;
    setPassword(passwordSet);
  }

  async function handleLogin() {
    setEmail('');
    setPassword('');
    setAPiDown(false);
    setUnAuthorized(false);
    // try {
      console.log("xxxx");
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectID: "mkrxzeo3o2hi",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            appType: "facebook",
          }),
        }
      );
      if(response.status===401){
        setUnAuthorized(true);
      }else if(response.status===500){
        setAPiDown(true);
      }else if (response.ok) {
        console.log("Successfully logged in");
        const json = await response.json();
        setBearerToken(json["token"]);
        console.log(json);
        localStorage.setItem("token", json.token);
        localStorage.setItem("userId", json.data._id);
        localStorage.setItem("userName",json.data.name);
        // localStorage.
        console.log(json.name);
        console.log(json.data._id);
        localStorage.setItem("userId",json.data._id);
        if(UserMap.has(json.data._id)===false){
          console.log("user Value is not found in map");
        UserMap.set(json.data._id,{name:json.data.name,photo:"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/995.jpg"})
        }
       
        console.log(UserMap.get("652e8f8c64d7830e72354ff6"));
        navigate("/main");
      } else {
        console.log(response.status);
      }
    // }
    // } catch (error) {
    //   console.error("Error:", error);
     
    // }
  }

  return (
    <div className="container">
      {/* Left side */}
      <div className="left-container">
        <div className="content">
          <div className="f-logo">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/yI/r/4aAhOWlwaXf.svg"
              alt="Facebook Logo"
              className="logo"
            ></img>
          </div>
          <div className="F-content">
            <p>
              Facebook helps you connect and share <br /> with the people in
              your life.
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="right-container">
        <div className="card-container">
          <div className="card-details">
            <div className="input-filed">
              {unAuthorized && <p className="warning">wrong email id password</p>}
              {apiDown && <p className="warning">It's not you,it's us.Please try again after some time</p>}
              <input
                type="text"
                name="text"
                placeholder="Email address or phone number"
                value={email}
                onChange={mailInput}
              ></input>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={passwordInput}
              ></input>
            </div>
            <div className="login-button">
              <Button
                variant="contained"
                className="Button"
                onClick={handleLogin}
              >
                Log In
              </Button>
            </div>
            <div className="Forgot-text">
              <Link to={"/update"}>
                <p>Forgotten password?</p>
              </Link>
            </div>
            <div className="line"></div>

            <div className="create-button">
              <Link to={"/signup"}>
                <button type="button" className="C-A-Button">
                  Create new account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
