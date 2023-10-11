import "@/app/css/style.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type BikeProps = {
  name: string;
  brand: string;
  model: string;
  lat: number;
  long: number;
};

export default function Bike({ name, brand, model, lat, long }: BikeProps) {
  return (
    <div className="d-flex flex-col justify-center items-center pt-0 pb-4 pl-4 pr-4 space-y-6">
      <Card className="bike-card">
        <CardContent>
          <div className="d-flex justify-between items-center">
            <Typography variant="h5" component="div">
              {name}
            </Typography>
          </div>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {brand}
          </Typography>
          <Typography variant="body2">Model: {model}</Typography>
          <Typography variant="body2">
            Location: {lat && long ? `${lat}, ${long}` : "-"}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
