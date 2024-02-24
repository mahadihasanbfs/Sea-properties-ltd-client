/* eslint-disable react/prop-types */

const BannerCart = ({ itm }) => {
    return (
        <div>
            <div className="px-2 md:mx-[40px]">
                <img src={itm?.img}
                    className="object-cover md:h-[400px] h-[300px] w-full" alt="" />

                <h1 className="font-bold text-xl mt-3">{itm?.name}</h1>
                <p className="text-gray-600">{itm?.address}</p>
                <button className="bg-gray-800 text-white px-6 py-2 rounded mt-3">Residential</button>
            </div>
        </div>
    );
};

export default BannerCart;