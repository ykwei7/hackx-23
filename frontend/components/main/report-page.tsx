import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import FeedIcon from "@mui/icons-material/Feed";
import ReportIcon from "@mui/icons-material/Report";
import { get_all_reports } from "@/app/api/main/route";
import ReportForm from "@/components/report-form";
import { Report } from "@/components/main/types";

function ReportPage(): React.FC {
  const [open, setOpen] = useState<Boolean>(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get_all_reports().then((res) => {
      if (res.length) {
        console.log(res.slice(0, 3));
        setReports(res.length >= 3 ? res.slice(0, 3) : [res[0]]);
      } else {
        let report = {
          id: "testing1234354abcd",
          user_id: "user12345abcd",
          bike_id: "bike123454abcd",
          reported_time: "-",
          description: "Lost at Macritchie Reservoir",
          lat: 1.341488,
          long: 103.833959,
          address: "Lornie Road, Reservoir Rd",
          status: "ongoing",
          bike_brand: "Ibis",
          bike_model: "Ripmo V2 XT",
          username: "9123 4567",
        };
        setReports([...reports, report]);
      }
      setLoading(false);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (
    e: React.ChangeEvent<HTMLInputElement>,
    reason: string
  ) => {
    if (reason === "backdropClick") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="d-flex flex-col justify-center items-center pt-8 pb-12 pl-4 pr-4 space-y-6">
      {loading ? (
        <div className="flex justify-center items-start pt-4">
          <CircularProgress sx={{ color: "grey" }} />
        </div>
      ) : (
        <>
          <div className="circular-progress-container">
            <div className="banner-title ml-2">
              <IconButton>
                <FeedIcon style={{ fontSize: "2rem" }} />
              </IconButton>
              <span>Live incidents</span>
            </div>
            {reports.map((report) => {
              let date = new Date(report.reported_time);
              let localeTimeStr = date.toLocaleTimeString("en-US");
              let dateStr = date.toDateString();

              return (
                <div
                  key={report.id}
                  className="banner-box side-banner rounded-md gap-1 mt-4 mx-1"
                >
                  <p className="incident-container">
                    <span className="incident-title">Bike:</span>
                    <span className="incident-desc">
                      {report.bike_brand && report.bike_model
                        ? `${report.bike_brand}, ${report.bike_model}`
                        : "-"}
                    </span>
                  </p>
                  <p className="incident-container">
                    <span className="incident-title">Last Seen At:</span>
                    <span className="incident-desc">
                      {report.address ?? "-"}
                    </span>
                  </p>
                  <p className="incident-container">
                    <span className="incident-title">Reported At:</span>
                    <span className="incident-desc">
                      {dateStr.concat(" ", localeTimeStr) ?? "-"}
                    </span>
                  </p>
                  <p className="incident-container">
                    <span className="incident-title">Description:</span>
                    <span className="incident-desc">
                      {report.description ?? "-"}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
      <div>
        <IconButton className="report-button" onClick={handleClickOpen}>
          <ReportIcon style={{ fontSize: "3rem", color: "red" }} />
          <p>Report</p>
        </IconButton>
        <ReportForm open={open} handleClose={handleClose} />
      </div>
    </div>
  );
}

export default ReportPage;
