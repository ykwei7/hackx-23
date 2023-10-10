import "@/app/css/style.css";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ReportForm from "@/components/reportform";

export const ReportFormPage: React.FC = ({ views, setView }) => {
  return (
    <div>
      <IconButton className="back-button" onClick={() => setView(views.report)}>
        <ArrowBackIosNewIcon style={{ fontSize: "2rem" }} />
        <p>Back</p>
      </IconButton>
      {/* Report form fields */}
      <ReportForm />
    </div>
  );
};
