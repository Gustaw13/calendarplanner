import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SuccessConfirm from "./SuccessConfirm";
import { Box, Stack, TextField } from "@mui/material";
import ChooseTime from "./ChooseTime";
import SelectTrainee from "./SelectTrainee";

export default function AddEvent({ open, setOpen, selectedDate }) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(event);
    const data = new FormData(event.currentTarget);
    console.log({
      trainee: data.get("trainee"),
      comment: data.get("comment"),
      eventDate: data.get("eventDate"),
    });

    await fetch("http://localhost:8000/add-event", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        trainee: data.get("trainee"),
        traineeId: data.get("traineeId"),
        comment: data.get("comment"),
        eventDate: data.get("eventDate"),
      }),
    }).then(async (response) => {
      await response.json().then((data) => {
        console.log(data);
      });
    });
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        /* aria-describedby="alert-dialog-description" */
      >
        <DialogTitle id="alert-dialog-title">{"Create event"}</DialogTitle>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <DialogContent>
            <Stack sx={{ gap: "1.5rem" }}>
              <SelectTrainee />
              <TextField
                id="comment"
                name="comment"
                label="Add comment"
                variant="outlined"
              />
              <ChooseTime />
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button type="submit" color="success">
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
