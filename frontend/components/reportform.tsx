import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function ReportForm() {
  const [coordinates, setCoordinates] = useState();
  const [location, setLocation] = useState();
  const [bicycleName, setBicycleName] = useState<String>();
  const [bicycleModel, setBicycleModel] = useState<String>();
  const [description, setDescription] = useState<String>();

  return (
    <div className="flex flex-col gap-6 mx-4 mt-6">
      <h1 className="banner-title">Reporting Form</h1>
      <TextField
        id="location"
        label="Location"
        variant="outlined"
        value={location}
      />
      <TextField
        id="bicycle-name"
        label="Bicycle Name"
        variant="outlined"
        value={bicycleName}
      />
      <TextField
        id="Bicycle Model"
        label="Bicycle Model"
        variant="outlined"
        value={bicycleModel}
      />
      <TextField
        id="description"
        label="Description"
        multiline
        rows={6}
        variant="outlined"
        value={description}
      />
      <div className="flex justify-center">
        <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-2/6">
          Submit
        </Button>
      </div>
    </div>
  );
}
