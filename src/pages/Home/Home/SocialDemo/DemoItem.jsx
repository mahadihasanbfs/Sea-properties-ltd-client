import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const DemoItem = () => {


    const { data: sData = [], isLoading } = useQuery({
        queryKey: ["slData"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/api/v1/admin/banner/banners`);
            const data = await res.json();
            return data;
        },
    });

    const sliderData = sData?.data?.filter(itm => itm?.position === 'footer_slider')

    console.log(sliderData, '***');


    return (
        <div className="mt-8 f-slider">
            {

                <Swiper
                    // pagination={{
                    //     type: 'fraction',
                    // }}
                    navigation={true}

                    autoplay={{
                        delay: 2500,
                    }}
                    modules={[Pagination, Navigation, Autoplay]}
                    className="mySwiper"
                >
                    {sliderData?.map(itm => <SwiperSlide className="" key={itm?._id}>
                        <a href={itm?.url} className="px-[5%]">
                            <div
                                style={{ backgroundImage: `url(${itm?.photo})` }}
                                className="bg-[#f5f5f5] object-cover bg-cover md:h-[320px] h-[200px] rounded-lg" />
                        </a>

                    </SwiperSlide>)}

                </Swiper>}
        </div >
    );
};

export default DemoItem;