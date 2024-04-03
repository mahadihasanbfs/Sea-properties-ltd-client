/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const BannerCart = ({ itm }) => {
    return (
        <div>
            <div className="px-2 xl:mx-[40px]">
                <img src={itm?.project_photo}
                    className="object-cover md:h-[400px] h-[300px] w-full" alt="" />

                <h1 className="font-bold text-xl mt-3">{itm?.name}</h1>
                <p className="text-gray-600">{itm?.details?.info?.address}</p>
                <Link to={`/project-details/${itm?._id}`}>
                    <button className="bg-[#525252] text-white px-6 py-2 rounded mt-3">{itm?.type}</button>
                </Link>
            </div>
        </div>
    );
};

export default BannerCart;