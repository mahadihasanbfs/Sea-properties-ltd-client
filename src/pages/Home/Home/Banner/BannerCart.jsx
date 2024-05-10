/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const BannerCart = ({ itm }) => {
    return (
        <Link to={`project-details/${itm?.sku}`}>
            <div className="px-2 xl:mx-[10px]  p-2 duration-200  rounded">
                <img
                    src={itm?.banner_img}
                    className="object-cover md:h-[400px] h-[300px] rounded w-full" alt="" />

                <h1 className="font-bold text-xl mt-3 capitalize">{itm?.name.slice(0, 60)}</h1>
                <p className="text-gray-600">{itm?.details?.info?.address}</p>
                <button className="bg-[#a5a5a5] capitalize text-white px-6 py-2 rounded mt-3">{itm?.project_type}</button>
            </div>
        </Link>
    );
};

export default BannerCart;