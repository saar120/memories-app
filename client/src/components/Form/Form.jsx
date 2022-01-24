import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import { createPost } from "../../actions/posts";
import { TextField, Typography } from "@mui/material";
import { FormContainer, FormStyled, FileInputStyled, SubmitButton } from "./Form.styles";

export default function Form() {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    tags: "",
    message: "",
    selectedFile: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPost(postData));
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const clearHandler = () => {};

  return (
    <FormContainer>
      <FormStyled autoComplete="off" noValidate onSubmit={submitHandler}>
        <Typography variant="h6">Create a Post</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={inputChangeHandler}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={inputChangeHandler}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={inputChangeHandler}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={inputChangeHandler}
        />
        <FileInputStyled>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </FileInputStyled>
        <SubmitButton variant="contained" color="primary" size="large" type="submit" fullWidth>
          Submit
        </SubmitButton>
        <SubmitButton variant="contained" color="secondary" size="small" onClick={clearHandler} fullWidth>
          Clear
        </SubmitButton>
      </FormStyled>
    </FormContainer>
  );
}
