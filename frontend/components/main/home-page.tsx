import "@/app/css/style.css";
import PedalBike from "@mui/icons-material/PedalBike";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";
import FeedIcon from "@mui/icons-material/Feed";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import { get_all_bicycles, get_all_reports } from "@/app/api/main/route";
import { addUserBicycleWithImage } from "@/app/api/bicycles/route";

export const HomePage: React.FC = ({ views, setView }) => {
  const [bikes, setBikes] = useState([]);
  const [reports, setReports] = useState([]);
  const user_id = sessionStorage.getItem("user_id");
  useEffect(() => {
    get_all_reports().then((res) => {
      if (res.length) {
        setReports([res[0]]);
      }
    });
    get_all_bicycles(user_id).then((res) => setBikes(res.bicycles));
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const submitImage = () => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("name", "T-Bike1");
    formData.append("brand", "Brand1");
    formData.append("model", "Model1");
    formData.append("description", "desc1");

    console.log(selectedImage);

    if (selectedImage) {
      formData.append("image", selectedImage);
      addUserBicycleWithImage(formData)
        .then((res) => {
          console.log("success");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please select an image before submitting.");
    }
  };

  return (
    <div className="d-flex flex-col justify-center items-center min-h-screen pb-12 pl-4 pr-4 space-y-6">
      <input type="file" onChange={handleImageChange}></input>
      <button onClick={submitImage}>hi</button>
      <div>
        <div className="circular-progress-container">
          <div className="banner-title ml-2">
            <IconButton>
              <FeedIcon style={{ fontSize: "2rem" }} />
            </IconButton>
            <span>Latest Incident</span>
          </div>
          {reports.map((report) => (
            <div key={report.id}>
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
                <span className="incident-desc">{report.address ?? "-"}</span>
              </p>
              <p className="incident-container">
                <span className="incident-title">Reported At:</span>
                <span className="incident-desc">
                  {report.reported_time ?? "-"}
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
          ))}
        </div>
        <div className="banner-box main-banner rounded-md d-flex items-center">
          <div className="banner-title">
            <IconButton>
              <FavoriteIcon style={{ fontSize: "1.5rem" }} />
            </IconButton>
            <span>Bike Status</span>
          </div>
          <div className="all-bikes-container">
            {bikes.map((bike) => (
              <div key={bike.id} className="bike-status-container">
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
            See something suspicious? Report the incident and help us maintain a
            safe community
          </p>
        </div>
      </div>
    </div>
  );
};
