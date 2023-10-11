import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function AddBicycle() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: {}, reason: string) => {
    if (reason === "backdropClick") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="fixed bottom-20 right-4">
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Bicycle</DialogTitle>
        <DialogContent>{/* Form goes here */}</DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleClose(e, "")}>Cancel</Button>
          <Button onClick={(e) => handleClose(e, "")}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
