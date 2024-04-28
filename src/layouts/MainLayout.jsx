import { Outlet } from "react-router-dom";
import Navbar from "../components/sharedComponent/Navbar";
import Footer from "../components/sharedComponent/Footer";
import ShowCase from "../pages/Home/Home/ShowCase/ShowCase";
import { FaAngleUp, FaWhatsapp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { BiSupport } from "react-icons/bi";


const MainLayout = () => {
    const [showScrollButton, setShowScrollButton] = useState(false);

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
            {showScrollButton && <button
                className="fixed bg-[#ff000042] shadow-xl text-[#c93333] w-[30px] flex justify-center items-center rounded text-2xl h-[30px] bottom-8 left-8"
                onClick={scrollToTop}>
                <FaAngleUp />
            </button>}

            <div className="fixed right-[24px] bottom-[80px] z-[400]">
                <a href='#' className="bg-[#a82a2a] text-[white] w-[60px] h-[60px] flex items-center justify-center text-3xl cursor-pointer p-2 rounded-full text-white mb-2">
                    <BiSupport />
                </a>
                <a href='https://wa.link/lfr471' className="bg-[#25D366] text-[white] w-[60px] h-[60px] flex items-center justify-center text-3xl cursor-pointer p-2 rounded-full text-white mb-2">
                    <FaWhatsapp />
                </a>
                <div className="icon-box" style={{ position: 'absolute', bottom: 'calc(50px + 2px)', right: 'calc(50px + 2px)' }}>
                    <MessengerCustomerChat
                        pageId="102604928583566"
                        appId="722571256716996"
                        themeColor={'#22228f'}
                        style={{ width: '50px', height: '50px' }}
                    />
                </div>
                {/* <a href={`#root`} className="bg-[#22228f] w-[50px] h-[50px] flex items-center justify-center text-3xl cursor-pointer p-2 rounded-full text-white mb-2">
                <TfiAngleUp className="text-xl font-bold" />
            </a> */}
            </div>
        </div>
    );
};

export default MainLayout;