import React from "react";
import { Avatar, Container, Grid, Paper, Typography, TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
export default function Auth() {
  const isSignedUp = false;
  const handleSubmit = () => {};
  const handleChange = () => {};
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
                <TextField name="firstName" label="First Name" autoFocus xs={6} onChange={handleChange} />
                <TextField name="lastName" label="First Name" autoFocus xs={6} onChange={handleChange} />
              </>
            )}
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
