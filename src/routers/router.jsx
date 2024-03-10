import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import commonPath from "./commonPath";
import ScrollToTop from "../components/common/ScrollToTop";

const router = createBrowserRouter([
    {
        path: '/',
        element:
            <>
                <ScrollToTop />
                <MainLayout />
            </>,
        children: commonPath
    }
]);

export default router;