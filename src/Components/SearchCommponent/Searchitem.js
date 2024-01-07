
import React from "react";
import "./searchitem.css";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "../Context";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import like from "../../Images/like.png";
import love from "../../Images/thumbs-up (1).png";
import chat from "../../Images/chat.png";

function SearchComponent() {
  const { setpuId } = useAuth();
  const { apiSearch } = useAuth();

  return (
    <div>
      <Navbar />

      <div className="post-box-search-after-search">
        {apiSearch &&
          apiSearch.map((post) => (
            <Card
              key={post._id}
              sx={{ maxWidth: 450, maxHeight: 800, height: "30em", marginBottom: 2 }}
            >
              <Link
                className="userProfile-img-name"
                to={`/userprofile/${post?.author?._id}`}
                onClick={() => {
                  console.log("Setting puId:", post?.author?._id);
                  setpuId(post?.author?._id);
                }}
              >
                <div className="accountPost-img">
                  <Avatar alt={post.author.name} src={post.author.profileImage} />
                  <div className="author-name-name">
                    <h4 className="naem-author">{post.author.name}</h4>
                  </div>
                </div>
              </Link>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {post?.content} 
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                height="194"
                image={post?.channel?.image || post.images[0]}
                // image={post.images && post.images.length > 0 ? post.images[0] : "defaultImageURL"}
                alt="Paella dish"
              />
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
            </Card>
          ))}
        <div className="empty-div"></div>
      </div>
    </div>
  );
}

export default SearchComponent;
