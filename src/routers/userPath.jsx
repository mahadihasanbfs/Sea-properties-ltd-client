import FlatInstallMentPage from "../userDashboard/Pages/FlatInstallMentPage";
import PrivateRoute from "./PrivateRoute";

const userPath = [
  {
    path: "/user/flat-installment",
    element: (
      <PrivateRoute>
        <FlatInstallMentPage />
      </PrivateRoute>
    ),
  },
];

export default userPath;
