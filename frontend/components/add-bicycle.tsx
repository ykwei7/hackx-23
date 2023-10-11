import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import ImageUploader from "react-images-upload";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import QRScanner from "./qr-scanner";

export default function AddBicycle() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [preview, setPreview] = useState(null);
  const [qrOpen, setQrOpen] = useState(false);

  const [error, setError] = useState({
    name: false,
    brand: false,
    model: false,
    picture: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    setOpen(false);
  };

  const onSelectPicture = (files, pictures) => {
    setPicture(pictures[0]);
    setPreview(URL.createObjectURL(files[0]));
    setError((prevError) => ({ ...prevError, picture: false }));
  };

  const handleSubmit = () => {
    if (!name || !brand || !model || !picture) {
      setError({
        name: !name,
        brand: !brand,
        model: !model,
        picture: !picture,
      });
      return;
    }

    const bicycle = { name, brand, model, description, picture, deviceId };
    // Send bicycle to backend
    handleClose({}, "");
  };

  const handleScanQR = () => {
    setQrOpen(true);
  };

  const handleScan = (data: string) => {
    setDeviceId(data);
  };

  return (
    <div className="fixed bottom-20 right-4">
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        PaperProps={{
          style: {
            height: "90%",
            width: "90%",
            maxWidth: "none",
            maxHeight: "none",
            margin: "auto",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle>Add Bicycle</DialogTitle>
        <DialogContent className="overflow-hidden w-[100%]">
          <div className="w-[100%] mb-1">
            <TextField
              required
              error={error.name}
              helperText={error.name && "Name is required"}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-[100%]"
            />
          </div>
          <div className="w-[100%] mb-1">
            <TextField
              required
              error={error.brand}
              helperText={error.brand && "Brand is required"}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Brand"
              className="w-[100%]"
            />
          </div>
          <div className="w-[100%] mb-1">
            <TextField
              required
              error={error.model}
              helperText={error.model && "Model is required"}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Model"
              className="w-[100%]"
            />
          </div>
          <div className="w-[100%] mb-1">
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-[100%]"
            />
          </div>
          <div
            className={
              "w-[100%] mb-1 border rounded flex items-center flex-col " +
              (error.picture ? "border-red-600" : "border-transparent")
            }
          >
            <ImageUploader
              withIcon={false}
              withLabel={false}
              singleImage={true}
              buttonText="Choose image"
              onChange={onSelectPicture}
              imgExtension={[".jpg", ".jpeg", ".png"]}
              maxFileSize={5242880}
              fileContainerStyle={{ boxShadow: "none", margin: 0, padding: 0 }}
            />
            {preview && (
              <img src={preview} alt="Preview" className="w-[80%] rounded" />
            )}
          </div>
          <div className="w-[100%] mb-1 flex flex-row items-center">
            <TextField
              value={deviceId}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Device ID"
              className="w-[80%]"
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={handleScanQR}
              className="w-[20%] items-center"
            >
              <PhotoCamera />
            </IconButton>
          </div>
          <QRScanner
            open={qrOpen}
            onClose={() => setQrOpen(false)}
            onScan={handleScan}
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
