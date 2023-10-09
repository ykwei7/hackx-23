import MenuIcon from "@mui/icons-material/Menu";

export const TopNavBar: React.FC = () => {
  return (
    <div
      className="fixed top-0 bg-white z-10 left-0 right-0 pt-3 pb-3 pr-3 pl-3 d-flex"
      style={{
        boxShadow: "0px 5px 0px rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <img
          src="/assets/htx-bike-logo.png"
          alt="Main Logo"
          style={{ height: "2.5rem" }}
        />
      </div>
      <div>
        <MenuIcon fontSize="large" />
      </div>
    </div>
  );
};
