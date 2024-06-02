import { useEffect, useState } from 'react';
import bg from '../../../../assets/background.jpg';
import GellaryItem from './GellaryItem';
import { Link } from 'react-router-dom';
const Gellary = () => {

    const data = [

        {
            id: 1,
            name: "40% Less Cost",
            info: 'Through purchasing land shares at 40% lower cost,build your own flat.'
        }, {
            id: 2,
            name: "Prime Locations",
            info: 'We provide a range of prime locations throughout the city, carefully chosen with your needs in mind.'
        },
        {
            id: 3,
            name: "Top Consultants",
            info: 'We work with top consultants from various fields, both domestically and internationally, to ensure every aspect of a project is meticulously designed. Quality designs require expertise from the best professionals.'
        },
        {
            id: 4,
            name: "Highest Quality Materials",
            info: 'We carefully select materials from around the world to improve the comfort and lifestyle of our clients. Quality, suitability, and durability are key factors in our material choices for projects.'
        },

        {
            id: 5,
            name: "On-time Delivery",
            info: 'At SEA, our team of engineers and management professionals work together to deliver quality products on time.'
        },
        {
            id: 6,
            name: "Professional Management",
            info: 'Our Facility Management team is dedicated to maintaining a safe, clean, and comfortable living environment for our community.'
        }
    ]

    const [showModal, setShowModal] = useState(null);
    const [close, setClose] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const handleModalClose = () => {
        setClose(true)
        setTimeout(() => {
            setIsHovered(false)
            setShowModal(null)
            setClose(false)
        }, 120);
    }

    const [divHeight, setDivHeight] = useState(0);
    const [divWidth, setDivWidth] = useState(0);

    const updateDivHeight = () => {
        const cardDiv = document.getElementById('cardDiv')
        if (cardDiv) {
            const height = cardDiv.clientHeight;
            const width = cardDiv.clientWidth;
            setDivHeight(height);
            setDivWidth(width);
        }
    };

    useEffect(() => {
        updateDivHeight();
        window.addEventListener('resize', updateDivHeight);

        return () => {
            window.removeEventListener('resize', updateDivHeight);
        };
    }, []);

    return (
        <div
            className='bg-cover bg-start text-light object-cover py-24 flex items-center px-4 md:px-6 lg:px-10 bg-fixed'
            style={{
                backgroundImage: `linear-gradient(#0000001a, #0000001c), url(${bg})`
            }}
        >
            <div className="max-w-[1366px] mx-auto grid md:grid-cols-2 grid-cols-1 text-white gap-12">
                <div className=' h-full flex flex-col justify-center items-start'>
                    <h1 className="text-[35px] text-light font-bold">
                        WHY SEA PROPERTIES LIMITED?
                    </h1>
                    <p className="mt-6">
                        SEA Properties aims to create an unparalleled experience of luxurious living enveloped in comfort just for you. Our commitment to prestige and sophisticated architecture distinguishes us from the rest.
                    </p>
                    <Link to={'/why-sea-properties'} className="mt-6 border-2 duration-150 hover:bg-white hover:text-black hover:bg-[#b20a0a] px-8 py-2">
                        Explore
                    </Link>
                </div>
                <div id='cardDiv' className="relative text-dark  z-30 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        data?.map(itm => <GellaryItem
                            key={itm?.id}
                            itm={itm}
                            showModal={showModal}
                            setShowModal={setShowModal}
                            close={close}
                            handleModalClose={handleModalClose}
                            divHeight={divHeight}
                            divWidth={divWidth}
                            isHovered={isHovered}
                            setIsHovered={setIsHovered}
                        />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Gellary;