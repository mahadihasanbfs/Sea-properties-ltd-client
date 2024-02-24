/* eslint-disable react/prop-types */
const GellaryItem = ({ itm }) => {
    return (
        <div className='w-full h-[220px] flex items-center justify-center hover:bg-red-500 bg-[#EFEFEE] hover:text-white text-black duration-150'>
            {itm?.name}
        </div>
    );
};

export default GellaryItem;