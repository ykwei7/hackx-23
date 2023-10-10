import "@/app/css/style.css";
// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FeedIcon from "@mui/icons-material/Feed";
import ReportIcon from "@mui/icons-material/Report";

const report_list = [
  {
    id: "asdjfasjdpfapds",
    user_id: "321409dfasdnj9034",
    bike_id: "dfadafdasdf",
    reported_time: "25/09/2020",
    description: "lorem ipsup",
    lat: "1.1231",
    long: "101.12312",
    address: "Choa Chu Kang",
    status: "Closed",
  },
  {
    id: "123456",
    user_id: "djsfalks123123",
    bike_id: "123dsajldfgasd",
    reported_time: "30/10/2020",
    description: "testing 123 dasjkfhh1243  uy3 894 hisdh fhasd 1983489",
    lat: "1.3466436",
    long: "100.453912",
    address: "Paya Lebar",
    status: "ongoing",
  },
  {
    id: "testing12335",
    user_id: "equrioppueurnads",
    bike_id: "testing12412415",
    reported_time: "30/10/2022",
    description: "testing testing 123 hdsfashdflasldkfklsad",
    lat: "2.4580423",
    long: "102.34132",
    address: "Tanjong Pagar",
    status: "ongoing",
  },
];

export const ReportPage: React.FC = ({ views, setView }) => {
  return (
    <div className="d-flex flex-col justify-center items-center pt-8 pb-12 pl-4 pr-4 space-y-6">
      <div className="circular-progress-container">
        <div className="banner-title ml-2">
          <IconButton>
            <FeedIcon style={{ fontSize: "2rem" }} />
          </IconButton>
          <span>Live incidents</span>
        </div>
        <div className="flex flex-col gap-6 mx-4">
          {report_list.map((report) => (
            <div
              key={report.id}
              className="banner-box side-banner rounded-md gap-1"
            >
              <h2 className="banner-subtitle">Lost bike alert!!</h2>
              <p className="banner-desc">{report.description}</p>
              <p className="banner-desc">{report.address}</p>
            </div>
          ))}
        </div>
      </div>
      <IconButton
        className="report-button"
        onClick={() => setView(views.reportForm)}
      >
        <ReportIcon style={{ fontSize: "3rem", color: "red" }} />
        <p>Report</p>
      </IconButton>
    </div>
  );
};
