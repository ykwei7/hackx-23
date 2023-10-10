import "@/app/css/style.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";

export default function ReportForm() {
  const [coordinates, setCoordinates] = useState();
  const [location, setLocation] = useState();
  const [bicycleName, setBicycleName] = useState<String>();
  const [bicycleModel, setBicycleModel] = useState<String>();
  const [description, setDescription] = useState<String>();

  return (
    <div className="flex flex-col gap-4 mx-4 mt-8">
      <h1 className="banner-title">Reporting Form</h1>
      <TextField
        id="location"
        label="Location"
        variant="outlined"
        value={location}
        margin="dense"
      />
      <TextField
        id="bicycle-name"
        label="Bicycle Name"
        variant="outlined"
        value={bicycleName}
        margin="dense"
      />
      <TextField
        id="Bicycle Model"
        label="Bicycle Model"
        variant="outlined"
        value={bicycleModel}
        margin="dense"
      />
      <TextField
        id="description"
        label="Description"
        multiline
        rows={6}
        variant="outlined"
        value={description}
        margin="dense"
      />
    </div>
  );
}
