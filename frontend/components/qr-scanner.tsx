import React from "react";
import { QrReader } from "react-qr-reader";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function QRScanner({ open, onClose, onScan }) {
  const handleScan = (data: string) => {
    if (data) {
      onScan(data);
      onClose();
    }
  };

  const handleError = (err: Error) => {
    // do nothing
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      PaperProps={{
        style: {
          height: "50%",
          width: "80%",
          maxWidth: "none",
          maxHeight: "none",
          margin: "auto",
          borderRadius: "10px",
        },
      }}
    >
      <QrReader
        scanDelay={300}
        onResult={(result, error) => {
          if (!!result) {
            console.log(result.getText());
            handleScan(result.getText());
          }
          if (!!error) {
            // console.info(error);
          }
        }}
        constraints={{ facingMode: "environment" }}
      />
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
