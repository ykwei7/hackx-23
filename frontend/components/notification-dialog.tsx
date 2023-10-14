import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function askPermission() {
  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  });
}

const NotificationDialog = ({ openModal, setOpenModal, setNotifEnabled }) => {
  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <DialogTitle>Allow Notifications</DialogTitle>
      <DialogContent>
        <DialogContentText>
          In order to keep your bicycles safe, we require you to enable
          notifications to receive updates on bike thefts.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpenModal(false);
            localStorage.setItem("notif_allowed", "no");
          }}
        >
          No, thanks
        </Button>
        <Button
          onClick={() => {
            setOpenModal(false);
            askPermission()
              .then((perm) => {
                setNotifEnabled(perm === "granted");
              })
              .catch(() => {
                localStorage.setItem("notif_allowed", "no");
              });
          }}
        >
          Allow
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationDialog;
