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
            {!zIndex &&
                <div>
                    {showScrollButton && <button
                        className="fixed bg-[#8a2424ee] shadow-xl text-[#fdfdfd] w-[30px] flex justify-center items-center rounded text-2xl z-[900] h-[30px] bottom-8 left-8"
                        onClick={scrollToTop}>
                        <FaAngleUp />
                    </button>}
                </div>}

            <div className="fixed right-[24px] bottom-[80px] z-[400]">
                {/* <a href='#' className="bg-[#a82a2a] text-[white] w-[60px] h-[60px] flex items-center justify-center text-3xl cursor-pointer p-2 rounded-full text-white mb-2">
                    <BiSupport />
                </a> */}
                <a href='https://api.whatsapp.com/send?phone=8801894440111' className="bg-[#25D366] shadow-xl text-[white] w-[60px] h-[60px] flex items-center justify-center text-3xl cursor-pointer p-2 rounded-full text-white mb-2">
                    <FaWhatsapp />
                </a>
                <div className="icon-box" style={{ position: 'absolute', bottom: 'calc(50px + 2px)', right: 'calc(50px + 2px)' }}>
                    <MessengerCustomerChat
                        pageId="211962708667265"
                        appId="349287628166347"
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
