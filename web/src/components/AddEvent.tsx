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
import SelectStudent from "./SelectStudent";
import { useReducer } from "react";

export default function AddEvent({
  open,
  setOpen,
  selectedDate,
  students,
  calendarLoadData,
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const eventDate = data.get("eventDate");
    const date = selectedDate.date;
    if (eventDate && date) {
      const [hours, minutes] = eventDate.toString().split(":").map(Number);
      date.setHours(hours, minutes);
      console.log(date);
      await fetch("http://localhost:8000/add-event", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          studentId: data.get("studentId"),
          comment: data.get("comment"),
          eventDate: date.toLocaleString("sv-SE"),
        }),
      }).then(async (response) => {
        await response.json().then(async (data) => {
          console.log(data);
          await calendarLoadData();
          setOpen(false);
          window.location.reload();
        });
      });
    }
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
              <SelectStudent students={students} />
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
