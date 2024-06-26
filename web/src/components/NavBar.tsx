import {
  Stack,
  Typography,
  Box,
  Button,
  createTheme,
  Tooltip,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";

export default function NavBar() {
  const navigate = useNavigate();
  const { user, getCurrentUser } = useContext(UserContext);

  return (
    <Stack
      direction={"row"}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        overflow: "hidden",
        backgroundColor: "#1f1f1f",
        /* "linear-gradient(185deg, rgba(237,232,245,1) 35%, rgba(173,187,218,1) 100%)", */
        minHeight: "5rem",
        height: "5rem",
        alignItems: "center",
        boxSizing: "border-box",
        padding: "0 2rem",
        justifyContent: "space-between",
        color: "white",
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "h6.fontSize",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        Training Planner
      </Typography>

      <Stack direction="row" spacing={5}>
        <Typography
          onClick={() => {
            navigate("/mytrainings");
          }}
        >
          My Trainings
        </Typography>

        <Typography
          onClick={() => {
            navigate("/booksession");
          }}
        >
          Book Training
        </Typography>
      </Stack>
      {user && user.email ? (
        <Button
          color="inherit"
          variant="text"
          size="small"
          onClick={async () => {
            await fetch("http://localhost:8000/logout", {
              credentials: "include",
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }).then((response) => {
              response.json().then((data) => {
                console.log(data);
              });
            });
            getCurrentUser();
          }}
        >
          Logout
        </Button>
      ) : (
        <Stack direction="row" spacing={1}>
          <Button
            color="inherit"
            variant="text"
            size="small"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
          <Button
            color="inherit"
            variant="text"
            size="small"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
