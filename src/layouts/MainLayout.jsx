import { Outlet } from "react-router-dom";
import Navbar from "../components/sharedComponent/Navbar";
import Footer from "../components/sharedComponent/Footer";
import ShowCase from "../pages/Home/Home/ShowCase/ShowCase";
import { FaAngleUp, FaWhatsapp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { BiSupport } from "react-icons/bi";
import { useContext } from "react";
import { ContextApi } from "../Provider/ContextProvider";


const MainLayout = () => {
    const [showScrollButton, setShowScrollButton] = useState(false);
    const { zIndex, setZIndex } = useContext(ContextApi)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) { // Adjust the scroll threshold as needed
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    const data = [
        {
            id: 1,
            name: 'Whatsapp',
            link: 'https://wa.link/lfr471',
            icon: <FaWhatsapp />
        },

    ];

    return (
        <div>
            <Navbar />
            <Outlet />
            {/* <ShowCase /> */}
            <Footer />


            <div className="fixed right-[24px] bottom-[80px] z-[400]">
                {/* <a href='#' className="bg-[#a82a2a] text-[white] w-[60px] h-[60px] flex items-center justify-center text-3xl cursor-pointer p-2 rounded-full text-white mb-2">
                    <BiSupport />
                </a> */}
                <a href='https://api.whatsapp.com/send?phone=8801894440111' className="bg-[#25D366] shadow-xl text-[white] w-[60px] h-[60px] flex items-center justify-center text-3xl cursor-pointer p-2 rounded-full text-white mb-2">
                    <FaWhatsapp />
                </a>
                {!zIndex &&
                    <div>
                        {showScrollButton && <button
                            className="bg-[#a82a2a] shadow-xl text-[white] w-[60px] h-[60px] flex items-center justify-center text-3xl cursor-pointer p-2 rounded-full text-white mb-2" onClick={scrollToTop}>
                            <FaAngleUp />
                        </button>}
                    </div>}
                {/* <a href={`#root`}>
                <TfiAngleUp className="text-xl font-bold" />
            </a> */}
            </div>
        </div >
    );
};

export default MainLayout;
