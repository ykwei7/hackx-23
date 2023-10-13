import React, { useEffect } from "react";
import { Alert } from "@mui/material";

type SuccessDialogProps = {
  isSuccess: boolean;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

function SuccessDialog({ isSuccess, setIsSuccess }: SuccessDialogProps) {
  useEffect(() => {
    if (!isSuccess) return;
    setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
  }, [isSuccess]);

  return (
    <div className={`success-msg ${isSuccess ? "show" : ""}`}>
      <Alert severity="success">
        <strong>Submission success!</strong>
      </Alert>
    </div>
  );
}

export default SuccessDialog;
