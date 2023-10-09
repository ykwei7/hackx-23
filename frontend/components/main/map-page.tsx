import "@/app/css/style.css";
import Map from "@/components/map";
import PedalBike from "@mui/icons-material/PedalBike";

export const MapPage: React.FC = () => {
  return (
    <div className="pt-4 pb-2 px-4 h-full">
      <div>
        <Map />
      </div>
      <div className="map-bike-container">
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
  );
};
