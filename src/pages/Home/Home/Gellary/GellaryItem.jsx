import arrow from '../../../../assets/triangle.png';

/* eslint-disable react/prop-types */
const GellaryItem = ({ itm, showModal, setShowModal, setItem, close }) => {


    return (
        <div
            onClick={() => {
                setShowModal(itm.id)
                setItem(itm)
            }}
            className='relative w-full h-[220px] md:h-[170px] lg:h-[200px] flex items-center justify-center hover:bg-red-500 bg-[#EFEFEE] bg-opacity-85 hover:text-white text-black duration-150 text-center'>
            {itm?.name}

            {
                showModal === itm.id &&
                <img src={arrow} className={`absolute top-1/2 -translate-y-1/2 right-full w-8 h-8 z-[900] fade-in-secondary ${close && 'fade-out-secondary'}`} alt="" />
            }
        </div>
    );
};

export default GellaryItem;