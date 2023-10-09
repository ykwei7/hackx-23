import "@/app/css/style.css";
import PedalBike from "@mui/icons-material/PedalBike";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircularWithValueLabel from "../circular-progress";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

export const HomePage: React.FC = () => {
  return (
    <div className="d-flex flex-col justify-center items-center pt-8 pb-12 pl-4 pr-4 space-y-6">
      <div>
        <div className="circular-progress-container">
          <div className="banner-title ml-2">
            <IconButton>
              <DirectionsRunIcon style={{ fontSize: "2rem" }} />
            </IconButton>
            <span>Activity</span>
          </div>
          <div className="circular-progress">
            <CircularWithValueLabel progress={40} />
          </div>
        </div>
        <div className="banner-box main-banner rounded-md d-flex items-center">
          <div className="banner-title">
            <IconButton>
              <FavoriteIcon style={{ fontSize: "1.5rem" }} />
            </IconButton>
            <span>Bike Status</span>
          </div>
          <div className="all-bikes-container">
            <div className="bike-status-container">
              <div className="icon">
                <PedalBike style={{ fontSize: "2rem" }} />
              </div>
              <div>Bishan</div>
            </div>
            <div className="bike-status-container">
              <div className="icon">
                <PedalBike style={{ fontSize: "2rem" }} />
              </div>
              <div>Bishan</div>
            </div>
            <div className="bike-status-container">
              <div className="icon">
                <PedalBike style={{ fontSize: "2rem" }} />
              </div>
              <div>Woodlands</div>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <div className="banner-box side-banner rounded-md ">
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
      </div> */}
      <div>
        <div className="banner-box side-banner rounded-md ">
          <div className="banner-title">
            <IconButton>
              <FlagIcon />
            </IconButton>
            <span>Report Suspicious Activity</span>
          </div>
          <p className="banner-desc">
            See something suspicious? Report the incident and help us maintain a
            safe community
          </p>
        </div>
      </div>
    </div>
  );
};
