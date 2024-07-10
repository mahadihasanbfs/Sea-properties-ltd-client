/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const BannerCart = ({ itm }) => {
    return (
        <Link to={`project-details/${itm?.sku}`}>

            <div className=" mx-auto overflow-hidden  rounded-lg ">
                <div className="relative">
                    <img className=" hover:scale-110 transition-transform duration-1000 ease-in-out object-cover" src={itm?.banner_img} alt="" />

                    {itm?.status && <div className="absolute top-0 right-0">
                        <div className="w-32 h-8 absolute top-4 -right-8">
                            <div
                                className="h-full w-full bg-[#A20E27] text-[white] text-xs text-center leading-8 font-semibold transform rotate-45">
                                SOLD OUT</div>
                        </div>
                    </div>}
                </div>
            </div>
            <h1 className="font-bold text-xl mt-3 capitalize">{itm?.name?.slice(0, 60)}</h1>
            <p className="text-gray-600">{itm?.details?.info?.address}</p>
            <button className="bg-[#a5a5a5] capitalize text-white px-6 py-2 rounded mt-3">{itm?.project_type}</button>



        </Link>
    );
};

export default BannerCart;
