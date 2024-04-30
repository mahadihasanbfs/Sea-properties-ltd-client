import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const DemoItem = () => {


    const { data: sData = [], isLoading } = useQuery({
        queryKey: ["slData"],
        queryFn: async () => {
            const res = await fetch(`https://sea-properties-server.vercel.app/api/v1/admin/banner/banners`);
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
                    pagination={{
                        type: 'fraction',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {sliderData?.map(itm => <SwiperSlide key={itm?._id}>
                        <div className="px-[5%]">
                            <div
                                style={{ backgroundImage: `url(${itm?.photo})` }}
                                className="bg-[#f5f5f5] h-[320px] rounded-lg" />
                        </div>

                    </SwiperSlide>)}

                </Swiper>}
        </div>
    );
};

export default DemoItem;