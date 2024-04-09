import { useEffect, useState } from "react";

const Slider = ({ images, selectedIndex, setSelectedImageIndex, onClose: close }) => {
    const [closed, setClosed] = useState(false);

    const handleClose = () => {
        setClosed(true)
        setTimeout(close, 400)
    }

    useEffect(() => {
        if (selectedIndex !== null) {
            document.body.classList.add('overflow-y-hidden');
        } else {
            document.body.classList.remove('overflow-y-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-y-hidden');
        };
    }, [selectedIndex]);

    return (
        <div className={`fixed top-0 bg-[#0000004e] w-screen h-screen bg-black flex justify-center items-center z-[2000] fade-in ${closed && 'fade-out'}`}>
            <div className="absolute top-0 left-0 py-3 px-4 w-full bg-[#000] bg-opacity-40 z-[1000] flex justify-between items-center">
                <span className="text-white opacity-70">{`${selectedIndex + 1} / ${images.length}`}</span>
                <button
                    className=" text-[white] top-24 right-6 rounded-full p-1 bg-[#6a2618] absolute"
                    onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div>
                <img src={images[selectedIndex]} key={selectedIndex} className={`w-[880px]  object-cover fade-in`} />
            </div>

            {/* right arrow */}
            <button
                disabled={selectedIndex === (images.length - 1)}
                onClick={() => { setSelectedImageIndex(selectedIndex + 1) }}
                className={`absolute top-1/2 -translate-y-1/2 right-8 text-white bg-[#000] bg-opacity-40 p-2 ${selectedIndex === (images.length - 1) && 'opacity-50'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            </button>

            {/* left arrow */}
            <button
                disabled={selectedIndex === 0}
                onClick={() => { setSelectedImageIndex(selectedIndex - 1) }}
                className={`absolute top-1/2 -translate-y-1/2 left-8 text-white bg-[#000] bg-opacity-40 p-2 ${selectedIndex === 0 && 'opacity-50'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            </button>
        </div>
    );
};

export default Slider;