import "@/app/css/style.css";
import PedalBike from "@mui/icons-material/PedalBike";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";
import FeedIcon from "@mui/icons-material/Feed";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import { get_all_bicycles, get_all_reports } from "@/app/api/main/main";
import { Report } from "@/components/main/types";
import CircularProgress from "@mui/material/CircularProgress";

export const HomePage = ({ views, setView }): JSX.Element => {
  const [bikes, setBikes] = useState([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [isBikesLoaded, setBikesLoaded] = useState(false);
  const [isReportsLoaded, setReportsLoaded] = useState(false);
  var user_id = "";
  if (typeof window != "undefined") {
    user_id = localStorage.getItem("user_id") || "";
  }
  useEffect(() => {
    get_all_reports(1).then((res) => {
      if (res.length) {
        setReports(res);
      }
      setReportsLoaded(true);
    });
    get_all_bicycles(user_id).then((res) => {
      setBikes(res.bicycles);
      setBikesLoaded(true);
    });
  }, []);

  return isBikesLoaded && isReportsLoaded ? (
    <>
      <div className="d-flex flex-col justify-center items-center min-h-screen pb-12 pl-4 pr-4 space-y-6">
        <div>
          <div className="circular-progress-container">
            <div className="banner-title ml-2">
              <IconButton>
                <FeedIcon style={{ fontSize: "2rem" }} />
              </IconButton>
              <span>Latest Incident</span>
            </div>
            {reports.map((report) => {
              let date = new Date(report.reported_time);
              let localeTimeStr = date.toLocaleTimeString("en-US");
              let dateStr = date.toDateString();
              return (
                <div key={report.id}>
                  <div className="d-flex items-center mb-4">
                    {report.image_url && (
                      <img
                        src={report.image_url}
                        alt="bike"
                        className="w-4/5 object-cover rounded-lg mx-auto"
                      />
                    )}
                  </div>
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
                  <div className="incident-container leading-4 mt-2">
                    <span className="text-gray-500">
                      If found, please contact 9123 4567 to reach the owner.
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            onClick={() => setView(views.bicycles)}
            className="banner-box main-banner rounded-md d-flex items-center">
            <div className="banner-title">
              <IconButton>
                <FavoriteIcon style={{ fontSize: "1.5rem" }} />
              </IconButton>
              <span>Bike Status</span>
            </div>
            <div className="all-bikes-container">
              {bikes.map((bike) => (
                <div
                  key={bike.id}
                  className={`bike-status-container ${
                    bike.is_stolen ? "is_stolen" : "is_safe"
                  }`}>
                  <div className="icon">
                    <PedalBike style={{ fontSize: "2rem" }} />
                  </div>
                  <div>{bike.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div onClick={() => setView(views.bicycles)}>
          <div className="banner-box side-banner rounded-md">
            <div className="banner-title">
              <IconButton>
                <SettingsIcon />
              </IconButton>
              <span>Manage Bikes</span>
            </div>
            <p className="banner-desc">
              Track your bicycle with in-built tagging systems and monitor their
              locations here
            </p>
          </div>
        </div>
        <div onClick={() => setView(views.report)}>
          <div className="banner-box side-banner rounded-md ">
            <div className="banner-title">
              <IconButton>
                <FlagIcon />
              </IconButton>
              <span>Report Suspicious Activity</span>
            </div>
            <p className="banner-desc">
              See something suspicious? Report the incident and help us maintain
              a safe community
            </p>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex justify-center items-start pt-4">
        <CircularProgress sx={{ color: "grey" }} />
      </div>
    </>
  );
};
