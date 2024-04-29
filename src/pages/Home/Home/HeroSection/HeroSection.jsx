import CircleBox from "./CircleBox";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import { useQuery } from "@tanstack/react-query";


const HeroSection = () => {
    const { data: data = [], refetch } = useQuery({
        queryKey: ["slData"],
        queryFn: async () => {
            const res = await fetch(`https://sea-properties-server.vercel.app/api/v1/admin/banner/banners`);
            const data = await res.json();
            return data;
        },
    });

    const sliderData = data?.data?.filter(itm => itm?.position === 'hero_slider')

    console.log(sliderData, 'metch..');

    return (
        <div className=" relative">
            <Swiper autoplay={true} navigation={false} modules={[Navigation, Autoplay]} className="mySwiper">
                {
                    sliderData?.map(itm => <SwiperSlide key={itm?.id}>
                        <div
                            style={{ backgroundImage: `url(${itm?.photo})` }}
                            className="w-full h-screen bg-cover object-cover"></div>
                    </SwiperSlide>)
                }

            </Swiper>
            <div className="absolute top-0 flex items-center justify-center left-0 right-0 bottom-0 m-auto z-30">
                <CircleBox />
            </div>

            {/* <div
                style={{
                    backgroundImage: `linear-gradient(to right, rgb(0 0 0 / 40%), rgb(0 0 0 / 49%)), url(https://i.ibb.co/yhfVfwh/e0570631ea539c4c79b4d15df4fb7d82.jpg)`
                }}
                className="relative h-[650px] bg-cover bg-center object-cover flex flex-col items-center justify-center  overflow-hidden">
                <CircleBox />
            </div> */}
        </div>

    );
};

export default HeroSection;