import { useQuery } from "@tanstack/react-query";
import Title from "../../../../components/sharedComponent/Title";
import TestimonialItem from "./TestimonialItem";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // Import navigation styles
import { FreeMode, Pagination, Navigation } from 'swiper/modules';

const Testimonials = () => {
    const { data: data = [], refetch } = useQuery({
        queryKey: ["testimonialData"],
        queryFn: async () => {
            const res = await fetch(`https://backend.seapropertiesltd.com.bd/api/v1/admin/testimonial`);
            const data = await res.json();
            return data;
        },
    });

    return (
        <div className="max-w-[1366px] mx-auto py-12 mt-4 px-2 xl:px-4">
            <div className="container py-12 mt-4 ">
                <Title text="Testimonials " position="start" />
                <div id="sld" className="slider-container mt-4 w-full relative">
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={20}
                        freeMode={true}
                     
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        breakpoints={{
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            600: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            480: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            300: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                        }}
                        modules={[FreeMode, Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {data?.map(itm => (
                            <SwiperSlide key={itm.id}>
                                <TestimonialItem itm={itm} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                   
                 <div className="relative mt-10">
                 <div className="swiper-button-next absolute left-10"></div>
                 <div className="swiper-button-prev"></div>
                 </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
