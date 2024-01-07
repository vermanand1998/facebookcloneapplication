import React from "react";
import "../Styles/search.css";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
function SearchComponent({ apiSearchData }) {
  return (
    <div>
      <section className="postSection">
        {apiSearchData.map((post) => (
          <Box className="postBox" key={post._id}>
            <div className="accountPostBox">
            {post.author && (
              <>
              <Avatar alt={post.author.name} src={post.author.profileImage} />
              <Typography>{post.author.name}</Typography>
              </>
              )}
            </div>
           
            <div className="captionForPost">
              <Typography id="captionPost">{post.content}</Typography>
            </div>
            <section className="imgPostBox">
            {post.channel && (
              <img
                  src={post.channel && post.channel.image ? post.channel.image : "defaultImageURL"}
                className="imgPost"
                alt="Imageofpost"
              />
               )}
            </section>
            <section className="countLikeComment">
              <div className="countLike">
                <ThumbUpOutlinedIcon />
                <Typography>{post.likeCount}</Typography>
              </div>
              <div className="countComment">
                <CommentOutlinedIcon />
                <Typography>{post.commentCount}</Typography>
              </div>
            </section>
            <footer>
              <section className="postButtons">
                <Button startIcon={<ThumbUpOutlinedIcon />}>Like</Button>
                <Button startIcon={<CommentOutlinedIcon />}>Comment</Button>
                <Button>Send</Button>
              </section>
            </footer>
          </Box>
        ))}
      </section>
    </div>
  );
}
export default SearchComponent;
