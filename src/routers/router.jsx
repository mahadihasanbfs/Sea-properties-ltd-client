import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import commonPath from "./commonPath";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: commonPath
    }
]);

export default router;