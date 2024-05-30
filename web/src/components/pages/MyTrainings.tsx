import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CardPlan from "../CardPlan";

export default function MyTrainings() {
  const logout = async () => {};

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
