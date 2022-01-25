import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Container, Grid, Paper, Typography, Button, Icon } from "@mui/material";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import Input from "./Input";
import { useDispatch } from "react-redux";

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {};
  const handleChange = () => {};

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignedUp((prevIsSignedUp) => !prevIsSignedUp);
    handleShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj; //taking profile obj from google res
    const token = res?.tokenId;
    dispatch({ type: "AUTH", data: { result, token } });
    navigate("/");
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = async (error) => {
    console.log(error);
    console.log("google sign in failed");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignedUp ? "Sign Up" : "Sign In"}</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignedUp && (
              <>
                <Input name="firstName" label="First Name" autoFocus half handleChange={handleChange} />
                <Input name="lastName" label=" Last Name" half handleChange={handleChange} />
              </>
            )}
            <Input name="email" label="Email" handleChange={handleChange} type="email" />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignedUp && (
              <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
            )}
            <Button type="submit" fullWidth color="primary" variant="contained">
              {isSignedUp ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <Button
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<GoogleIcon />}
                  variant="contained">
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <Grid container justify="flex-end">
              <Button onClick={switchMode}>
                {isSignedUp ? "Already have an account ? Sign in" : "Don't have an account ? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
