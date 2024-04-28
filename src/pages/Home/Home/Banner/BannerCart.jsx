/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const BannerCart = ({ itm }) => {

    return (
        <Link to={`project-details/${itm?._id}`}>
            <div className="px-2 xl:mx-[10px]">
                <img src={itm?.banner_img
                }
                    className="object-cover md:h-[400px] h-[300px] w-full" alt="" />

                <h1 className="font-bold text-xl mt-3">{itm?.name}</h1>
                <p className="text-gray-600">{itm?.details?.info?.address}</p>
                <Link to={`/project-details/${itm?._id}`}>
                    <button className="bg-[#a5a5a5] text-white px-6 py-2 rounded mt-3">{itm?.project_type}</button>
                </Link>
            </div>
        </Link>
    );
};

export default BannerCart;