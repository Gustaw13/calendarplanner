import {
  Stack,
  Box,
  TextField,
  Typography,
  Button,
  ButtonGroup,
  AppBar,
} from "@mui/material";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyTrainings from "./components/pages/MyTrainings";
import NavBar from "./components/NavBar";
import BookSession from "./components/pages/BookSession";
import Home from "./components/pages/Home";

import LogIn from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import AddEvent from "./components/AddEvent";

function App() {
  const getCurrentUser = async () => {
    await fetch("http://localhost:8000/get-current-user", {
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
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <BrowserRouter>
      <Stack className="App">
        <Box
          sx={{
            backgroundColor: "#fffef1",
            display: "flex",
            flexDirection: "column",
            height: "5000%",
            width: "100%",
          }}
        >
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mytrainings" element={<MyTrainings />} />
            <Route path="/booksession" element={<BookSession />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Box>
      </Stack>
    </BrowserRouter>
  );
}

export default App;
