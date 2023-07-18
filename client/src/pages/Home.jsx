import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box, Grid, ImageList, ImageListItem } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { SnackbarContext, UserContext } from "../context";

export default function Home() {
  const navigate = useNavigate();
  const [cols, setCols] = useState(2);
  const { setSnack } = useContext(SnackbarContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setSnack({
        message: "successfully logged in, redirecting to tasks page",
        severity: "success",
        open: true,
      });
      //   navigate("/tasks");
    }
    const width = screen.width;
    if (width > 800) {
      setCols(3);
    }
    if (width < 600) {
      setCols(1);
    }
  }, [user]);

  const images = [
    "/to_do_image.jpg",
    "/to_do_image_2.jpg",
    "/to_do_image_3.jpg",
    "/to_do_image_4.jpg",
    "/to_do_image_5.jpg",
    "/to_do_image_6.jpg",
  ];

  return (
    <Box
      sx={{
        textAlign: "center",
        width: { xs: "100vw", md: "80%" },
        margin: { md: "20px auto", xs: "o auto" },
        padding: "20px",
        boxShadow: "0 0 6px #00000085",
      }}
    >
      <h1>Welcome to Dudu's To Do List</h1>
      <h2>
        in here you can add new tasks,update old tasks,delete tasks,set your
        destination time for the task and more!
      </h2>
      <ImageList sx={{ width: "100%" }} cols={cols}>
        {images.map((imageUrl) => (
          <ImageListItem key={imageUrl}>
            <img src={imageUrl} alt="to-do image" loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={cols < 3 ? 12 : 4}>
          <Button
            fullWidth
            sx={{
              backgroundColor: "#aab8c4",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#85929d",
              },
            }}
            variant="contained"
            onClick={() => navigate("/tasks")}
          >
            Guest
          </Button>
        </Grid>
        <Grid item xs={cols < 3 ? 12 : 4}>
          <Button
            sx={{
              backgroundColor: "#6b737b",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#565e66",
              },
            }}
            fullWidth
            variant="contained"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </Button>
        </Grid>
        <Grid item xs={cols < 3 ? 12 : 4}>
          <Button
            sx={{
              backgroundColor: "#5581a6",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#2c78b8",
              },
            }}
            fullWidth
            variant="contained"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
