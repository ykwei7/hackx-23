import "@/app/css/style.css";
import Map from "@/components/map";
import PedalBike from "@mui/icons-material/PedalBike";
import { useState, useEffect } from "react";
import { get_all_bicycles } from "@/app/api/main/route";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "next/navigation";

export const MapPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [bikes, setBikes] = useState([]);
  const [currBike, setCurrBike] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    get_all_bicycles(user_id).then((res) => {
      setBikes(res.bicycles);
      const bike_id = searchParams.get("bike_id");

      if (bike_id) {
        const bike = res.bicycles.find((bike) => bike.id === bike_id);
        if (bike) {
          setCurrBike(bike);
        }
      }
      setIsLoaded(true);
    });
  }, []);

  return (
    <div className="pt-4 pb-10 px-4 h-full">
      <div>
        <Map bikes={bikes} currBike={currBike} />
      </div>
      {isLoaded ? (
        <div className="map-bike-container">
          {bikes.map((bike) => (
            <div
              key={bike.id}
              className={`bike-status-container ${
                bike.is_stolen ? "is_stolen" : "is_safe"
              }`}
              onClick={() => setCurrBike(bike)}
            >
              <div className="icon">
                <PedalBike style={{ fontSize: "2rem" }} />
              </div>
              <div>{bike.name}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-start pt-4">
          <CircularProgress sx={{ color: "grey" }} />
        </div>
      )}
    </div>
  );
};
