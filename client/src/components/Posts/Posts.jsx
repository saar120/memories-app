import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

export default function Posts() {
  const posts = useSelector((state) => state.posts);

  console.log(posts);

  return (
    <>
      <h1>posts</h1>
      <Post />
      <Post />
      <Post />
    </>
  );
}
