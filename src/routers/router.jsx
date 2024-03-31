import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import commonPath from "./commonPath";
import ScrollToTop from "../components/common/ScrollToTop";
import AdminLayout from "../layouts/AdminLayout";
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import userPath from "./userPath";
import adminPath from "./adminPath";

const router = createBrowserRouter([
    {
        path: '/',
        element:
            <>
                <ScrollToTop />
                <MainLayout />
            </>,
        children: commonPath
    },
      {
        path: '/admin',
        element:
            <>
                <ScrollToTop />
                <AdminLayout />
            </>,
        children: adminPath
    },
      {
        path: '/user',
        element:
            <>
                <ScrollToTop />
                <UserDashboardLayout />
            </>,
        children: userPath
    },

    
]);

export default router;