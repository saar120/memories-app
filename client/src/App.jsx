import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import { Container, Grow, Grid } from "@mui/material";
import { AppBarStyled, HeaderStyled } from "./styles";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBarStyled position="static" color="inherit">
        <HeaderStyled variant="h2" align="center">
          Blogs
        </HeaderStyled>
      </AppBarStyled>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}
