import "@/app/css/style.css";

type BikeProps = {
  name: string;
  brand: string;
  model: string;
  lat: number;
  long: number;
  image_url: string;
};

export default function Bike({
  name,
  brand,
  model,
  lat,
  long,
  image_url,
}: BikeProps) {
  return (
    <div className="rounded-lg shadow-md bg-gray-200 p-3 m-3">
      <h2 className="text-lg font-bold mb-2">{name}</h2>
      <div className="flex">
        <div className="flex-1">
          <p>Brand: {brand || "-"}</p>
          <p>Model: {model || "-"}</p>
          <p>Location: {lat && long ? `${lat}, ${long}` : "-"}</p>
        </div>
        <div className="w-1/3">
          {image_url && (
            <img
              src={image_url}
              alt="bike"
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
}
