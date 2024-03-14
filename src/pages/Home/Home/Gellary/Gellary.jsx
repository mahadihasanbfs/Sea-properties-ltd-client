import { useState } from 'react';
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
    const [item, setItem] = useState(null);
    const [close, setClose] = useState(false);
    const handleModalClose = () => {
        setClose(true)
        setTimeout(() => {
            setShowModal(null)
            setClose(false)
        }, 120);
    }
    return (
        <div
            className='bg-cover object-cover py-24 flex items-center px-4 bg-fixed'
            style={{
                backgroundImage: `linear-gradient(#0000001a, #0000001c), url(${bg})`
            }}
        >
            <div className="container grid md:grid-cols-2 grid-cols-1 text-white gap-12">
                <div className=' h-full flex flex-col justify-center items-start'>
                    <h1 className="text-[40px] font-bold">
                        Project Gallery
                    </h1>
                    <p className="mt-6">
                        Partner with the best Artisan, to transform your land into a milestone <br /> of aesthetic marvel and superior value.
                    </p>
                    <button className="mt-6 border-2 duration-150 hover:bg-white hover:text-black px-8 py-2">
                        Explore
                    </button>
                </div>
                <div className="relative grid md:grid-cols-3 gap-3 lg:gap-6">
                    {
                        data?.map(itm => <GellaryItem
                            key={itm?.id}
                            itm={itm}
                            setShowModal={setShowModal}
                            showModal={showModal}
                            setItem={setItem}
                            close={close}
                        />)
                    }

                    {/* card modal */}
                    {
                        showModal === item?.id &&
                        <div key={item?.id} className={`absolute top-0 bg-white w-[500px] h-full z-[1000] fade-in-secondary ${close && 'fade-out-secondary'} py-10 px-[30px]
                        ${(item?.id === 1 || item?.id === 4) && 'right-[103%]'} 
                        ${(item?.id === 2 || item?.id === 5) && 'right-[69%]'} 
                        ${(item?.id === 3 || item?.id === 6) && 'right-[34%]'}
                    `}>
                            <h3 className='text-[18px] text-[#231f204d] font-bold capitalize'>{item?.name}</h3>
                            <p className='text-black mt-5'>{item?.info}</p>

                            <div onClick={handleModalClose} className='text-gray-200 absolute top-4 right-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Gellary;