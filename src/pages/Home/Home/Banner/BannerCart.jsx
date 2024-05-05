/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const BannerCart = ({ itm }) => {
    const t = 'hello world this inaksnflasdhp jnkfasjkdfhjkasd jdsahkjfsadh jkdshafasjkj  jnkl kj jhjkhjkh jhjhhjhjkh kljhjk hjkhklj jk hjhjknkl jkh  hfdgdfsdfgfd ;jdfksjg fdslkjdsf kljmfdgsd lkjdfs '
    return (
        <Link to={`project-details/${itm?._id}`}>
            <div className="px-2 xl:mx-[10px] border border-[#8080802f] p-2 duration-200 hover:shadow-xl rounded">
                <img
                    src={itm?.banner_img}
                    className="object-cover md:h-[400px] h-[300px] rounded w-full" alt="" />

                <h1 className="font-bold text-xl mt-3 capitalize">{itm?.name.slice(0, 60)}</h1>
                <p className="text-gray-600">{itm?.details?.info?.address}</p>
                <Link to={`/project-details/${itm?._id}`}>
                    <button className="bg-[#a5a5a5] capitalize text-white px-6 py-2 rounded mt-3">{itm?.project_type}</button>
                </Link>
            </div>
        </Link>
    );
};

export default BannerCart;