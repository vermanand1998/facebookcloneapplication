import React, { useEffect,useState } from "react";
import "../Styles/CreatePage.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function CreatePage() {
  const token = localStorage.getItem("token");
  const [pageName, setPageName] = useState("");
  const [category, setCategory] = useState("");
  const [bio, setBio] = useState("");
  const handlePageNameChange = (e) => {
    setPageName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  };

  async function CreatePageApi() {
    console.log(token);
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/facebook/channel/",
        {
          method: "POST",
          body: JSON.stringify({
            name: pageName,
            title: category,
            description: "bio",
            images: "postImage",
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            projectID: "mkrxzeo3o2hi",
          },
        }
      );
      console.log(response);
      let json = await response.json();
      console.log(json);
      if (response.ok) {
        console.log("Successfully created a page");
      } else {
        if (json.status === "fail" && json.message === "Channel with this name already exists") {
          console.log("Channel with this name already exists");
        } else {
          console.log("Failed to create a page");
          console.log(json);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  

  useEffect(() => {
    CreatePageApi();
  }, []);

  return (
    <div className="CreatePage">
    {/* <Navbar /> */}
    <Link to="/main">
       <img  className="create_page"  src="https://static.xx.fbcdn.net/rsrc.php/yI/r/4aAhOWlwaXf.svg" alt=".."></img>
       </Link>
      <div className="page__container">
        <h5>Pages - Create a Page</h5>
        <h2>Create a Page</h2>
        <p>
          Your Page is where people go to learn <br />
          more about you. Make sure that yours has <br />
          all of the information they may need
        </p>

        <div className="page-name">
          <form onSubmit={handleFormSubmit}>
            <input
              className="page-name-required"
              type="text"
              placeholder="Page name(required)"
              value={pageName}
              onChange={handlePageNameChange}
            />
            <p>
              Use the name of your business, brand, or organization or a <br />{" "}
              name that helps explain your Page. <span>Learn more</span>
            </p>
            <input
              className="page-name-required"
              type="text"
              placeholder="Category(required)"
              value={category}
              onChange={handleCategoryChange}
            />
            <p>Enter a category that best describes you.</p>
            <input
              className="page-bio"
              type="text"
              placeholder="Bio(optional)"
              value={bio}
              onChange={handleBioChange}
            />
            <p>Tell people a little about what you do.</p>
            <div className="Create-btn">
              <button type="submit" className="Create-page-btn" onClick={CreatePageApi()}>
                Create page
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
