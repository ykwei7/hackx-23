import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import QrReader from "react-qr-reader";
import ImageUploader from "react-images-upload";

export default function AddBicycle() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [deviceId, setDeviceId] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: {}, reason: string) => {
    if (reason === "backdropClick") {
      return;
    }
    setOpen(false);
  };

  const handleScan = (data) => {
    if (data) {
      setDeviceId(data);
    }
  };

  const onDrop = (picture) => {
    setPicture(picture[0]);
  };

  const handleSubmit = () => {
    const bicycle = { name, brand, model, description, picture, deviceId };
    // Send bicycle to backend
    handleClose({}, "");
  };

  return (
    <div className="fixed bottom-20 right-4">
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Bicycle</DialogTitle>
        <DialogContent>
          <input
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            required
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Brand"
          />
          <input
            required
            onChange={(e) => setModel(e.target.value)}
            placeholder="Model"
          />
          <input
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <ImageUploader
            withIcon={true}
            buttonText="Choose images"
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
          <input
            onChange={(e) => setDeviceId(e.target.value)}
            placeholder="Device ID"
          />
          <QrReader
            delay={300}
            onError={(err) => console.log(err)}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleClose(e, "")}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
