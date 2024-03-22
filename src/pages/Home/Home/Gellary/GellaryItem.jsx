import { useEffect, useState } from 'react';
import arrow from '../../../../assets/triangle.png';

/* eslint-disable react/prop-types */
const GellaryItem = ({ itm, showModal, setShowModal, close, handleModalClose, divHeight, divWidth, isHovered, setIsHovered }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleHover = () => {
        setIsHovered(!isHovered);
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        const handleClickOutside = (event) => {
            if (event.target.id !== 'modal') {
                handleModalClose()
            }
        }

        window.addEventListener('resize', handleResize);
        document.body.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('resize', handleResize);
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div
            id='modal'
            onClick={() => {
                setShowModal(itm.id)
            }}
            className={`relative w-full h-[200px] md:h-[170px] xl:h-[200px] flex items-center justify-center ${!isHovered && 'hover:bg-red-500 hover:text-white'} bg-[#EFEFEE] bg-opacity-85 text-black transition-colors duration-300 text-center px-2 hover:cursor-pointer`}>
            {itm?.name}

            {/* arrow icon */}
            {
                showModal === itm.id &&
                <img src={arrow} className={`absolute top-full -rotate-90 lg:rotate-0 lg:top-1/2 lg:-translate-y-1/2 lg:right-full w-8 h-8 z-10 fade-in-secondary ${close && 'fade-out-fast'} pointer-events-none`} alt="" />
            }

            {/* modal div */}
            {
                showModal === itm?.id && divHeight &&
                <div
                    id='modal'
                    key={itm?.id || divHeight}
                    onMouseEnter={handleHover} onMouseLeave={handleHover}
                    className={`absolute text-left bg-white z-20 fade-in-secondary ${close && 'fade-out-secondary'} py-10 px-[30px] hover:cursor-default shadow-lg
                        ${(itm?.id === 1 || itm?.id === 2 || itm?.id === 3) && windowWidth >= 1024 && 'lg:top-0 lg:right-[calc(100%+24px)]'} 
                        ${(itm?.id === 4 || itm?.id === 5 || itm?.id === 6) && windowWidth >= 1024 && 'lg:bottom-0 lg:right-[calc(100%+24px)]'} 
                        
                        ${(itm?.id === 1 || itm?.id === 3 || itm?.id === 5) && ((windowWidth < 640) || (windowWidth >= 768 && windowWidth < 1024)) && 'top-[calc(100%+24px)] left-0'}                        
                        ${(itm?.id === 2 || itm?.id === 4 || itm?.id === 6) && ((windowWidth < 640) || (windowWidth >= 768 && windowWidth < 1024)) && 'top-[calc(100%+24px)] right-0'}

                        ${(itm?.id === 1 || itm?.id === 4) && (windowWidth >= 640 && windowWidth < 768) && 'top-[calc(100%+24px)] left-0'}
                        ${(itm?.id === 3 || itm?.id === 6) && (windowWidth >= 640 && windowWidth < 768) && 'top-[calc(100%+24px)] right-0'} 
                        ${(itm?.id === 2 || itm?.id === 5) && (windowWidth >= 640 && windowWidth < 768) && 'top-[calc(100%+24px)]'}                       
                    `}
                    style={{
                        height: windowWidth >= 1024 ? `${divHeight}px` : '320px',
                        width: windowWidth < 1024 ? `${divWidth}px` : '500px'
                    }}
                >
                    <h3 className='text-[18px] text-[#231f204d] font-bold capitalize fade-in'>{itm?.name}</h3>
                    <p className='text-black mt-5 fade-in'>{itm?.info}</p>

                    <div onClick={handleModalClose} className='text-gray-200 absolute top-4 right-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            }
        </div>
    );
};

export default GellaryItem;