import { Outlet } from "react-router-dom";
import Navbar from "../components/sharedComponent/Navbar";
import Footer from "../components/sharedComponent/Footer";
import ShowCase from "../pages/Home/Home/ShowCase/ShowCase";


const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            {/* <ShowCase /> */}
            <Footer />
        </div>
    );
};

export default MainLayout;