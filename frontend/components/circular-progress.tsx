import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          textAlign={"center"}
        >
          <span style={{ fontSize: "0.8rem", fontWeight: 400 }}>
            Daily Goal <br />
          </span>
          <span style={{ fontSize: "1.5rem", fontWeight: 500 }}>{`${Math.round(
            props.value / 10
          )}km`}</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 400 }}>
            <br />
            Completed
          </span>
        </Typography>
      </Box>
    </Box>
  );
}

export default function CircularWithValueLabel({ progress, color }) {
  return (
    <CircularProgressWithLabel value={100} color={"success"} size={"8rem"} />
  );
}
