import React, { useState } from "react";
import "../Styles/Updatepassword.css";
import { getBearerToken, setBearerToken } from "./Datastore";
import { Link } from "react-router-dom";

function Updatepassword() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  async function makeAPICall() {
    console.log("update called");
    const loginresponse = await fetch(
      "https://academics.newtonschool.co/api/v1/user/login",
      {
        method: "POST",
        headers: {
          projectId: "f104bi07c490",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: currentPassword,
          appType: "facebook",
        }),
      }
    );
    const loginjson = await loginresponse.json();
    console.log(loginjson);
    setBearerToken(loginjson["token"]);
    console.log("bearer token after successful login " + getBearerToken());
    const token = getBearerToken();
    console.log("token in starting in update " + token);
    const response = await fetch(
      "https://academics.newtonschool.co/api/v1/user/updateMyPassword",
      {
        method: "PATCH",
        headers: {
          projectId: "mkrxzeo3o2hi",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name: name,
          email: email,
          passwordCurrent: currentPassword,
          password: newPassword,
          appType: "facebook",
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    console.log("token after update call " + json["token"]);
  }
  return (
    <div className="new-container">
      <Link to={"/"}>
      <img
        src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
        alt="Facebook Logo"
        className="fb__logo"
      /></Link>
      <div className="input-section">
        <h1>Update password</h1>
        <div className="name-email-password-btn">
          <div>
            <input
              className="your-name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
            <div className="input-for-email">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="password-current">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
              />
            </div>
            <div className="password-new">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
            </div>
            <div className="update-btn">
              <button type="submit" className="update-password-btn" onClick={makeAPICall}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Updatepassword;
