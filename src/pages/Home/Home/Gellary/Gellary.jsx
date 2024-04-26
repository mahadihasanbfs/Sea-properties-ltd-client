import { useEffect, useState } from 'react';
import bg from '../../../../assets/gellaryBg.png';
import GellaryItem from './GellaryItem';
const Gellary = () => {

    const data = [
        {
            id: 1,
            name: "Prime Locations",
            info: 'We offer a selection from the most lucrative locations across the city. Our project locations are selected intelligently, keeping in mind the things that matter to you most.'
        },
        {
            id: 2,
            name: "Top Consultants",
            info: 'We engage the leading consultants in their respective fields from both home and abroad, to ensure that every facet of a project is designed to perfection. After all, the best designs can only come from the best minds.'
        },
        {
            id: 3,
            name: "Highest Quality Materials",
            info: 'We continuously explore material sourcing globally to enhance the comfort and lifestyle of our clients. Each material used in our projects is selected with the utmost attention to quality, suitability and durability.'
        },
        {
            id: 4,
            name: "Uncompromising Safety",
            info: 'Our priority to safety is second to none. Structural, electro-mechanical and fire safety stand paramount in our planning and construction methodology, in order to ensure your safety in your sanctuary.'
        },
        {
            id: 5,
            name: "On-time Delivery",
            info: 'Our experienced team of highly qualified engineers and management professionals work relentlessly in perfect synergy. At Shanta, delivering uncompromised quality, on time, has become our mantra.'
        },
        {
            id: 6,
            name: "Professional Management",
            info: 'A safe, clean and comfortable living environment can only be maintained by a team of professionals with an eye for perfection. Our Facility Management team will ensure your desire to live in a beautiful community remains fulfilled.'
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
            className='bg-cover text-light object-cover py-24 flex items-center px-4 md:px-6 lg:px-10 bg-fixed'
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
                        Partner with the best Artisan, to transform your land into a milestone <br /> of aesthetic marvel and superior value.
                    </p>
                    <a href='/our-info' target='_blank' className="mt-6 border-2 duration-150 hover:bg-white hover:text-black px-8 py-2">
                        Explore
                    </a>
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