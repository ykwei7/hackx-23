import { useEffect, useState } from "react";
import "@/app/css/style.css";
import { getUserBicycles } from "@/app/api/bicycles/route";
import CircularProgress from "@mui/material/CircularProgress";
import Bike from "@/components/bike";
import AddBicycle from "@/components/add-bicycle";

type Bicycle = {
  brand: string;
  description: string;
  id: string;
  image_url: string;
  is_stolen: boolean;
  last_seen_lat: number;
  last_seen_lon: number;
  model: string;
  name: string;
  user_id: string;
};

export function BicyclesPage() {
  const userId = localStorage.getItem("user_id") || "";
  const [bicycles, setBicycles] = useState<Bicycle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserBicycles(userId)
      .then((res) => {
        setBicycles(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [userId, loading]);

  function refreshBikes() {
    setLoading(true);
  }

  return (
    <div>
      <div className="bicycles-list">
        {loading ? (
          <div className="flex justify-center items-start pt-4">
            <CircularProgress sx={{ color: "grey" }} />
          </div>
        ) : (
          <div className="pb-8">
            {bicycles.map((bike) => (
              <Bike
                key={bike.id}
                name={bike.name}
                brand={bike.brand}
                model={bike.model}
                lat={bike.last_seen_lat}
                long={bike.last_seen_lon}
                image_url={bike.image_url}
              />
            ))}
          </div>
        )}
      </div>
      <AddBicycle successCallback={refreshBikes} />
    </div>
  );
}
