import { Box, Typography } from "@mui/material";
import React from "react";
import CardPlan from "../CardPlan";

export default function MyTrainings() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h2">Upcoming trainings...</Typography>
      <CardPlan />
    </Box>
  );
}
