import CircleBox from "./CircleBox";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';


const HeroSection = () => {
    const sliderData = [
        {
            id: 1,
            img: 'https://hikmah-holdings-backend.vercel.app/api/v1/image/660cd9ce8ddf1450a6942c94.jpg'
        }, {
            id: 2,
            img: 'https://i.ibb.co/yhfVfwh/e0570631ea539c4c79b4d15df4fb7d82.jpg'
        }, {
            id: 3,
            img: 'https://hikmah-holdings-backend.vercel.app/api/v1/image/660cd9ce8ddf1450a6942c94.jpg'
        },
    ]
    return (
        <div className=" relative">
            <Swiper autoplay={true} navigation={false} modules={[Navigation, Autoplay]} className="mySwiper">
                {
                    sliderData?.map(itm => <SwiperSlide key={itm?.id}>
                        <div
                            style={{ backgroundImage: `url(${itm?.img})` }}
                            className="w-full h-[650px] bg-cover object-cover"></div>
                    </SwiperSlide>)
                }

            </Swiper>
            <div className="absolute top-0 flex items-center justify-center left-0 right-0 bottom-0 m-auto z-[2000]">
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