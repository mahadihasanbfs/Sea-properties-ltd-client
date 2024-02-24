/* eslint-disable react/prop-types */

const ShowCaseItem = ({ itm }) => {
    return (
        <div className="hover:bg-[#9f0931b9] border-4 flex flex-col justify-center items-center duration-150 border-white md:h-[340px] h-[300px] ">
            <h1 className="font-bold text-xl text-white">{itm?.name}</h1>
            <p className="text-white mt-3">{itm?.post}</p>
        </div>
    );
};

export default ShowCaseItem;