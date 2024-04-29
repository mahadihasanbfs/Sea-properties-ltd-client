import FlatInstallMentPage from "../userDashboard/Pages/FlatInstallMentPage";
import UserEditLandArea from "../userDashboard/Pages/EditLandArea";
import UserLandReportManagement from "../userDashboard/Pages/UserLandReport";
import PrivateRoute from "./PrivateRoute";

const userPath = [
  {
    path: "/user/flat-installment",
    element: (
      <FlatInstallMentPage />
    ),
  },
  {
    path: "/user/land-report",
    element: (
      <UserLandReportManagement />
    ),
  },


];

export default userPath;
