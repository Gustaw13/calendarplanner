import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import BookSession from "./components/pages/BookSession";
import Home from "./components/pages/Home";
import MyTrainings from "./components/pages/MyTrainings";

import { UserContext } from "./components/context/UserContext";
import LogIn from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";

function App() {
  const [user, setUser] = useState();
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
        setUser(data);
      });
    });
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
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
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
