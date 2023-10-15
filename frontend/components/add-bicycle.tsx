import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import ImageUploader from "react-images-upload";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import QRScanner from "./qr-scanner";
import { addUserBicycleWithImage } from "@/app/api/bicycles/route";

export default function AddBicycle({ successCallback }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [deviceId, setDeviceId] = useState("");
  const [preview, setPreview] = useState("");
  const [qrOpen, setQrOpen] = useState(false);

  const [error, setError] = useState({
    name: false,
    brand: false,
    model: false,
    picture: false,
  });

  const user_id = localStorage.getItem("user_id");

  function resetForm() {
    setName("");
    setBrand("");
    setModel("");
    setDescription("");
    setPicture(null);
    setPreview("");
    setDeviceId("");
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: {}, reason: string) => {
    if (reason === "backdropClick") {
      return;
    }
    resetForm();
    setOpen(false);
  };

  const onSelectPicture = (e) => {
    const file = e.target.files[0];
    setPicture(file);
    setPreview(URL.createObjectURL(file));
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

    const formData = new FormData();
    formData.append("user_id", user_id as string);
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("description", description);
    formData.append("device_id", deviceId);

    if (picture) {
      formData.append("image", picture);
      addUserBicycleWithImage(formData)
        .then((res) => {
          successCallback();
        })
        .catch((err) => {
          console.log(err);
        });
    }

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
            <DialogContentText>Bicycle Name</DialogContentText>
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
            <DialogContentText>Bicycle Brand</DialogContentText>
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
            <DialogContentText>Bicycle Model</DialogContentText>
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
            <DialogContentText>Short Description</DialogContentText>
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-[100%]"
            />
          </div>
          <DialogContentText>Upload an Image</DialogContentText>
          <div
            className={
              "w-[100%] mb-1 p-1 border rounded flex items-center flex-col " +
              (error.picture ? "border-red-600" : "border-transparent")
            }
          >
            <label
              htmlFor="file-upload"
              className="py-2 px-3 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Select from library
              <input
                id="file-upload"
                type="file"
                className="sr-only"
                onChange={onSelectPicture}
              />
            </label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-[80%] rounded mt-1"
              />
            )}
          </div>
          <DialogContentText>Add your tracking device</DialogContentText>
          <div className="w-[100%] mb-1 flex flex-row items-center">
            <TextField
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
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
