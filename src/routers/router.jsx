import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import commonPath from "./commonPath";
import ScrollToTop from "../components/common/ScrollToTop";
import AdminLayout from "../layouts/AdminLayout";
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import userPath from "./userPath";
import adminPath from "./adminPath";
import IsAdmin from "./IsAdmin";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <MainLayout />
      </>
    ),
    children: commonPath,
  },
  {
    path: "/admin",
    element: (
      <div>
        <ScrollToTop />
       <IsAdmin>
       <AdminLayout />
       </IsAdmin>
      </div>
    ),
    // <IsAdmin>

    // </IsAdmin>,
    children: adminPath,
  },
  {
    path: "/user",
    element: (
      <PrivateRoute>
        <ScrollToTop />
        <UserDashboardLayout />
      </PrivateRoute>
    ),
    children: userPath,
  },
]);

export default router;
