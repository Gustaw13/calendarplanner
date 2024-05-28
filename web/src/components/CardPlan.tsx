import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CancelAlert from "./CancelAlert";
import ConfirmAlert from "./ConfirmAlert";

export default function CardPlan() {
  return (
    <Stack
      direction={"row"}
      sx={{ justifyContent: "center", flexWrap: "wrap", width: "70%" }}
    >
      <Stack sx={{ padding: "2rem", width: "300px" }}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">
              13 May 17:30
            </Typography>
            <Typography gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
              provident fuga corporis nostrum sint expedita illum veritatis aut
              quasi eveniet! Recusandae incidunt totam error amet vero ullam est
              ducimus dolores!
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                justifyContent: "center",
              }}
            >
              <ConfirmAlert />
              <CancelAlert />
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Stack sx={{ padding: "2rem", width: "300px" }}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">
              13 May 17:30
            </Typography>
            <Typography gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
              provident fuga corporis nostrum sint expedita illum veritatis aut
              quasi eveniet! Recusandae incidunt totam error amet vero ullam est
              ducimus dolores!
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                justifyContent: "center",
              }}
            >
              <ConfirmAlert />
              <CancelAlert />
            </Stack>
          </CardContent>
        </Card>
      </Stack>
      <Stack sx={{ padding: "2rem", width: "300px" }}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">
              13 May 17:30
            </Typography>
            <Typography gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
              provident fuga corporis nostrum sint expedita illum veritatis aut
              quasi eveniet! Recusandae incidunt totam error amet vero ullam est
              ducimus dolores!
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                justifyContent: "center",
              }}
            >
              <ConfirmAlert />
              <CancelAlert />
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Stack width="300px" height="350px" sx={{ padding: "2rem" }}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">
              22 November 15:20
            </Typography>
            <Typography gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
              vitae sapiente necessitatibus dolorum porro aperiam magni? Fugit
              cum, consequuntur quisquam culpa architecto modi veritatis dolorum
              aliquam laborum, porro odio. Harum!
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                justifyContent: "right",
              }}
            >
              <Button variant="outlined" size="small" color="success">
                Confirm
              </Button>
              <Button
                onClick={() =>
                  alert("Are you sure you want to cancel your training?")
                }
                variant="outlined"
                size="small"
                color="error"
              >
                Cancel
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
}
