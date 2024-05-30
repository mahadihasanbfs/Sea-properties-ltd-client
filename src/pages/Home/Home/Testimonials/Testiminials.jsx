import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialItem from "./TestimonialItem";
import { useEffect } from "react";
import Title from "../../../../components/sharedComponent/Title";
import { useQuery } from "@tanstack/react-query";



const Testimonials = () => {
    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const { data: data = [], refetch } = useQuery({
        queryKey: ["testimonialData"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/api/v1/admin/testimonial`);
            const data = await res.json();
            return data;
        },
    });


    useEffect(() => {
        const next = document.getElementById('sld').childNodes[0].childNodes[2];
        next.style.cssText += "left: 20px !important; ";

    }, []);

    return (
        <div className="max-w-[1366px] mx-auto py-12 mt-4 px-6 xl:px-4">
            <div className="container py-12 mt-4 ">
                <Title text="Testimonials " position="start" />
                <div id="sld" className="slider-container  mt-20   w-full">
                    <Slider {...settings}>
                        {
                            data?.map(itm => <TestimonialItem key={itm?.id} itm={itm} />)
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;