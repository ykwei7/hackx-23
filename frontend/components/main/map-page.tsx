import Map from "@/components/map";

export const MapPage: React.FC = () => {
  return (
    <div>
      <div className="py-8 px-4 text-center">
        <h1 className="text-3xl font-semibold">Your Location Map</h1>
        <p className="text-gray-500 mt-4">
          This map shows your current location.
        </p>
      </div>
      <Map />
    </div>
  );
};
