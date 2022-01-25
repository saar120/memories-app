import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBarStyled, HeaderStyled } from "../../styles";
import { Toolbar, Typography } from "@mui/material";
import { Button, Avatar } from "@mui/material";
import { useDispatch } from "react-redux";

export const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  return (
    <AppBarStyled position="static" color="inherit">
      <div>
        <HeaderStyled component={Link} to="/" variant="h2" align="center">
          Blogs
        </HeaderStyled>
      </div>
      <Toolbar>
        {user ? (
          <div>
            <Avatar alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h6">{user.result.name}</Typography>
            <Button variant="contained" color="secondary" onClick={logOut}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBarStyled>
  );
};
