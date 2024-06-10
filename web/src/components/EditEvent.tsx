import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, TextField } from "@mui/material";

export default function EditEvent({
  closeParent,
  currentlyClickedEvent,
  slicedDate,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button color="info" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {currentlyClickedEvent && (
          <>
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
                />
                <TextField
                  id="comment"
                  label="Time"
                  variant="standard"
                  defaultValue={currentlyClickedEvent.startHour}
                />
                <TextField
                  id="comment"
                  label="Date"
                  variant="standard"
                  defaultValue={slicedDate}
                />
              </Stack>
            </DialogContent>

            <DialogActions>
              <Button
                color="error"
                onClick={() => {
                  closeParent();
                  handleClose();
                }}
              >
                Delete
              </Button>
              <Button
                color="info"
                onClick={() => {
                  closeParent();
                  handleClose();
                }}
              >
                Save
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </React.Fragment>
  );
}
