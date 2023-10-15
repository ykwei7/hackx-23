import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { getUserBicycles } from "@/app/api/bicycles/route";
import { addReport } from "@/app/api/main/route";
import SuccessDialog from "@/components/ui/success-dialog";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Bicycle = {
  id: string;
  name: string;
  brand: string;
  model: string;
  description: string;
  last_seen_lat: number;
  last_seen_lon: number;
  // is_stolen: boolean;
  user_id: string;
};

interface ReportFormProps {
  open: boolean;
  handleClose: (reason: string) => void;
  isReportSubmitSuccess: boolean;
  setIsReportSubmitSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReportForm({
  open,
  handleClose,
  isReportSubmitSuccess,
  setIsReportSubmitSuccess,
}: ReportFormProps) {
  const [bicycles, setBicycles] = useState<Bicycle[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [bicycleName, setBicycleName] = useState<string>("");
  const [bicycleBrand, setBicycleBrand] = useState<string>("");
  const [bicycleModel, setBicycleModel] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [bicycleId, setBicycleId] = useState<string>("");
  const [bicycleLat, setBicycleLat] = useState<number>(0);
  const [bicycleLon, setBicycleLon] = useState<number>(0);
  const [error, setError] = useState({
    bicycleName: false,
    description: false,
  });

  useEffect(() => {
    let user_id = localStorage.getItem("user_id") || "";
    setUserId(user_id);
    getUserBicycles(user_id)
      .then((res) => {
        setBicycles(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!bicycleName) return;
    let selectedBicycle = bicycles.filter(
      (bicycle) => bicycle.name === bicycleName
    );
    // console.log(selectedBicycle[0].brand);
    setBicycleId(selectedBicycle[0].id);
    setBicycleBrand(
      selectedBicycle[0].brand === null
        ? "Information not available"
        : selectedBicycle[0].brand
    );
    setBicycleModel(
      selectedBicycle[0].model === null
        ? "Information not available"
        : selectedBicycle[0].model
    );
    setBicycleLat(
      selectedBicycle[0].last_seen_lat === null
        ? 0
        : selectedBicycle[0].last_seen_lat
    );
    setBicycleLon(
      selectedBicycle[0].last_seen_lon === null
        ? 0
        : selectedBicycle[0].last_seen_lon
    );
  }, [bicycleName]);

  const handleSubmit = () => {
    let user_id = userId;
    let bike_id = bicycleId;
    let lat = bicycleLat;
    let long = bicycleLon;

    if (!bicycleName || description.length < 1) {
      setError({
        bicycleName: !bicycleName,
        description: !description,
      });
      return;
    }

    const report = { user_id, bike_id, description, lat, long };

    // Send report to backend
    try {
      addReport(report);
      setIsReportSubmitSuccess(true);
    } catch (err) {
      console.error("Error adding report:", err);
    }

    // Success dialog appears for 2 seconds then close form + reset form
    setTimeout(() => {
      handleClose("");
      resetForm();
    }, 2000);
  };

  const resetForm = () => {
    setBicycleName("");
    setBicycleBrand("");
    setBicycleModel("");
    setDescription("");
    setBicycleLat(0);
    setBicycleLon(0);
  };

  return (
    <div>
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
        <DialogTitle sx={{ marginBottom: "0.5rem" }}>Report Form</DialogTitle>
        <DialogContent className="overflow-hidden">
          <FormControl
            fullWidth
            required
            className="report-field"
            sx={{ marginTop: "0.5rem" }}
          >
            <InputLabel id="bicycle-name-select-label">Bicycle Name</InputLabel>
            <Select
              labelId="bicycle-name-select-label"
              id="bicycle-name-select"
              value={bicycleName}
              label="Bicycle Name"
              onChange={(e) => setBicycleName(e.target.value)}
            >
              {bicycles.map((bicycle) => (
                <MenuItem key={bicycle.id} value={bicycle.name}>
                  {bicycle.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="bicycleBrand"
            className="report-field"
            sx={{ marginTop: "0.25rem" }}
            label="Bicycle Brand"
            variant="outlined"
            value={bicycleBrand}
            disabled
          />
          <TextField
            id="bicycleModel"
            className="report-field"
            sx={{ marginTop: "0.25rem" }}
            label="Bicycle Model"
            variant="outlined"
            value={bicycleModel}
            disabled
          />
          <TextField
            id="bicycleLat"
            className="report-field"
            sx={{ marginTop: "0.25rem" }}
            label="Bicycle Latitude"
            variant="outlined"
            value={bicycleLat}
            disabled
          />
          <TextField
            id="bicycleLon"
            className="report-field"
            sx={{ marginTop: "0.25rem" }}
            label="Bicycle Longitude"
            variant="outlined"
            value={bicycleLon}
            disabled
          />
          <TextField
            id="description"
            className="report-field"
            label="Description"
            variant="outlined"
            value={description}
            error={error.description}
            helperText={error.description && "Description should not be empty"}
            required
            multiline
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              handleClose("");
              setError({
                bicycleName: false,
                description: false,
              });
            }}
          >
            Close
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
        <SuccessDialog
          isSuccess={isReportSubmitSuccess}
          setIsSuccess={setIsReportSubmitSuccess}
        />
      </Dialog>
    </div>
  );
}
