
import { useLoaderData, useParams } from "react-router-dom";
import PrimaryBanner from "../../../components/common/PrimaryBanner";
import { useEffect, useState } from "react";

import Slider from "../../../components/common/Slider";


const NewsEventReadMore = () => {


    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const news_events = useLoaderData()
    console.log(news_events);
    const { galleryImg, featureImg, title, description } = news_events


    const openSlider = (index) => {
        setSelectedImageIndex(index);
    };

    const closeSlider = () => {
        setSelectedImageIndex(null);
    };

    return (
        <div>
            {/* News and events read more banner section */}
            <PrimaryBanner
                title={title}
                subTitle={'News & Events'}
                bannerImg={featureImg}
                opacity={30}
            ></PrimaryBanner>

            <div className=" pb-16 md:pb-[120px] px-4 md:px-0 max-w-[1366px] mx-auto">
                <div dangerouslySetInnerHTML={{ __html: description }} className=" mx-auto py-[60px] space-y-6"></div>


            </div>

            {/* news and event gallery section  */}
            <div className="max-w-[1366px] gap-4 mx-auto md:px-5 xl:px-[60px] grid grid-cols-2 md:grid-cols-3">
                {
                    galleryImg?.map((img, index) => <img
                        key={index}
                        src={img}
                        onClick={() => openSlider(index)}
                        className="w-full h-[170px] md:h-[215px] lg:w-[415px] mt-4 border rounded lg:h-[415px] object-cover hover:cursor-pointer hover:contrast-125 transition-all duration-500" />)
                }
            </div>

            {/* gallery images slider view */}
            {selectedImageIndex !== null && (
                <Slider
                    images={galleryImg}
                    selectedIndex={selectedImageIndex}
                    setSelectedImageIndex={setSelectedImageIndex}
                    onClose={closeSlider}
                />
            )}
        </div>

    );
};

export default NewsEventReadMore;
