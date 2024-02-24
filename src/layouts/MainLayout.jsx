import { Outlet } from "react-router-dom";
import Navbar from "../components/sharedComponent/Navbar";
import Footer from "../components/sharedComponent/Footer";


const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;