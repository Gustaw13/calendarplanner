import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CardPlan from "../CardPlan";

export default function MyTrainings() {
  const logout = async () => {
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
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        // justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h2">Upcoming trainings...</Typography>
      <CardPlan />
    </Box>
  );
}
