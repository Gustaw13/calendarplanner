import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SuccessConfirm from "./SuccessConfirm";
import { Stack, TextField } from "@mui/material";
import ChooseTime from "./ChooseTime";

export default function AddEvent({ open, setOpen }) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        {
          <DialogContent>
            {/* <DialogContentText id="alert-dialog-description">
            Your training will be confirmed.
          </DialogContentText> */}
            <Stack sx={{ gap: "1.5rem" }}>
              <TextField
                id="outlined-basic"
                label="Name an event"
                variant="outlined"
              />
              <ChooseTime />
            </Stack>
          </DialogContent>
        }
        <DialogActions>
          <Button color="success" onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
