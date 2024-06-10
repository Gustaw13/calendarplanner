import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SuccessConfirm from "./SuccessConfirm";
import { Stack, TextField } from "@mui/material";
import EditEvent from "./EditEvent";

export default function ClickedEvent({ currentlyClickedEvent, open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const slicedDate = currentlyClickedEvent.date.slice(5);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {currentlyClickedEvent.label}
        </DialogTitle>

        <DialogContent>
          <Stack
            direction="column"
            sx={{
              gap: "1rem",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              id="comment"
              label="Comment"
              variant="standard"
              defaultValue={currentlyClickedEvent.comment}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="comment"
              label="Time"
              variant="standard"
              defaultValue={currentlyClickedEvent.startHour}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="comment"
              label="Date"
              variant="standard"
              defaultValue={slicedDate}
              InputProps={{
                readOnly: true,
              }}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <EditEvent
            closeParent={handleClose}
            slicedDate={slicedDate}
            currentlyClickedEvent={currentlyClickedEvent}
          />

          <Button color="info" onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
