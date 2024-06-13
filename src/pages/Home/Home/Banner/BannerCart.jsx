/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const BannerCart = ({ itm }) => {
    return (
        <Link to={`project-details/${itm?.sku}`}>
            <div className="  duration-200  rounded">
                <div
                    // style={{
                    //     backgroundImage: `url(${itm?.banner_img})`,
                    //     backgroundSize: '100% 100%',
                    //     objectFit : 'unset'
                    // }}
                    className={`${itm?.status ? ' border-[3px] border-[#f34444]' : 'border-[green]'} relative xl:w-[423px] rounded-lg duration-200 hover:shadow-lg   xl:h-[423px] justify-self-center overflow-hidden hover:cursor-pointer`}>
                    {itm?.status && <span className="bg-[red] absolute text-xs text-[white] w-[100px] h-[30px] flex items-center justify-center rounded-br-2xl z-[100]">Out of Sold</span>}
                    <img src={itm?.banner_img} alt="" className="w-full h-full absolute top-0 left-0 right-0" />
                </div>
                {/* <img
                    src={itm?.banner_img}
                    className=" h-[400px] object-cover rounded " alt="" /> */}

                <h1 className="font-bold text-xl mt-3 capitalize">{itm?.name?.slice(0, 60)}</h1>
                <p className="text-gray-600">{itm?.details?.info?.address}</p>
                <button className="bg-[#a5a5a5] capitalize text-white px-6 py-2 rounded mt-3">{itm?.project_type}</button>
            </div>
        </Link>
    );
};

export default BannerCart;