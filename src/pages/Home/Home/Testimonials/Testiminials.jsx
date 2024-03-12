import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialItem from "./TestimonialItem";
import { useEffect } from "react";
import Title from "../../../../components/sharedComponent/Title";



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
    const data = [
        {
            id: 0,
            name: 'Aura',

            post: "Residential",
            message: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita architecto itaque minima cumque temporibus totam et! Corporis suscipit, natus blanditiis aliquid provident, impedit rerum autem laudantium obcaecati, mollitia saepe ratione.",
            img: "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },
        {
            id: 1,
            name: 'Aura',

            post: "Residential",
            message: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita architecto itaque minima cumque temporibus totam et! Corporis suscipit, natus blanditiis aliquid provident, impedit rerum autem laudantium obcaecati, mollitia saepe ratione.",
            img: "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },
        {
            id: 2,
            name: 'Aura',

            post: "Residential",
            message: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita architecto itaque minima cumque temporibus totam et! Corporis suscipit, natus blanditiis aliquid provident, impedit rerum autem laudantium obcaecati, mollitia saepe ratione.",
            img: "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },
        {
            id: 3,
            name: 'Aura',

            post: "Residential",
            message: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita architecto itaque minima cumque temporibus totam et! Corporis suscipit, natus blanditiis aliquid provident, impedit rerum autem laudantium obcaecati, mollitia saepe ratione.",
            img: "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },
        {
            id: 4,
            name: 'Aura',

            post: "Residential",
            message: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita architecto itaque minima cumque temporibus totam et! Corporis suscipit, natus blanditiis aliquid provident, impedit rerum autem laudantium obcaecati, mollitia saepe ratione.",
            img: "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },
        {
            id: 5,
            name: 'Aura',

            post: "Residential",
            message: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita architecto itaque minima cumque temporibus totam et! Corporis suscipit, natus blanditiis aliquid provident, impedit rerum autem laudantium obcaecati, mollitia saepe ratione.",
            img: "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },
        {
            id: 6,
            name: 'Aura',

            post: "Residential",
            message: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita architecto itaque minima cumque temporibus totam et! Corporis suscipit, natus blanditiis aliquid provident, impedit rerum autem laudantium obcaecati, mollitia saepe ratione.",
            img: "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },
    ]

    useEffect(() => {
        const next = document.getElementById('sld').childNodes[0].childNodes[2];
        next.style.cssText += "left: 20px !important;";
        console.log('Testimonials', next);
    }, []);

    return (
        <div className="">
            <div className="container py-12 mt-4 ">
                <Title text="Client Testimonials " position="start" />
                <div id="sld" className="slider-container  mt-12  w-full">
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