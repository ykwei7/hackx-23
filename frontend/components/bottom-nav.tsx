import HomeIcon from "@mui/icons-material/Home";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MapIcon from "@mui/icons-material/Map";
import ReportIcon from "@mui/icons-material/Report";

export const BottomNavBar = ({ views, setView }): JSX.Element => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300"
      style={{ boxShadow: "0px -5px 5px rgba(0, 0, 0, 0.2)" }}>
      {/* Add your navigation items here */}
      <ul className="flex justify-center py-2">
        <li
          className="mx-4 flex flex-col items-center hover:text-black text-gray-500"
          onClick={() => setView(views.bicycles)}>
          <div className="self-center">
            <PedalBikeIcon />
          </div>
          <div>Bikes</div>
        </li>
        <li
          className="mx-4 flex flex-col items-center hover:text-black text-gray-500"
          onClick={() => setView(views.map)}>
          <div className="self-center">
            <MapIcon />
          </div>
          <div>Map</div>
        </li>
        <li
          className="mx-4 flex flex-col items-center hover:text-black text-gray-500"
          onClick={() => setView(views.home)}>
          <div className="self-center">
            <HomeIcon />
          </div>
          <div>Home</div>
        </li>
        <li
          className="mx-4 flex flex-col items-center hover:text-black text-gray-500"
          onClick={() => setView(views.report)}>
          <div className="self-center">
            <ReportIcon />
          </div>
          <div>Report</div>
        </li>
        <li
          className="mx-4 flex flex-col items-center hover:text-black text-gray-500"
          onClick={() => setView(views.profile)}>
          <div className="self-center">
            <AccountCircleIcon />
          </div>
          <div>Profile</div>
        </li>
      </ul>
    </nav>
  );
};
