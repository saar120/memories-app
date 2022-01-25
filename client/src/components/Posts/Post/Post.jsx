import React from "react";
import moment from "moment";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function Post({ post, setCurrentId }) {
  return (
    <Card>
      <CardMedia component="img" src={post.selectedFile} title={post.title} />
      <div>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div>
        <Button style={{ color: "white" }} size="small" onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon style={{ color: "black" }} />
        </Button>
      </div>
      <div>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag}`)}
        </Typography>
      </div>
      <Typography variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          <ThumbUpIcon />
          Like {post.likeCount}
        </Button>
        <Button size="small" color="primary">
          <DeleteIcon />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
