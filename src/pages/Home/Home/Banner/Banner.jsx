import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerCart from "./BannerCart";
import { useEffect, useState } from "react";
import Actions from "../Location/Actions";



const Banner = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('/src/pages/Home/ProjectDetails/projectInfo.json')
            .then(res => res.json())
            .then(data => setData(data))
    }, [])

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
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
    // const data = [
    //     {
    //         id: 0,
    //         name: 'Aura',
    //         address: "Road 83, Gulshan",
    //         type: "Residential",
    //         img: "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    //     },
    //     {
    //         id: 1,
    //         name: 'Aura',
    //         address: "Road 83, Gulshan",
    //         type: "Residential",
    //         img: "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    //     },
    //     {
    //         id: 2,
    //         name: 'Aura',
    //         address: "Road 83, Gulshan",
    //         type: "Residential",
    //         img: "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    //     },
    //     {
    //         id: 3,
    //         name: 'Aura',
    //         address: "Road 83, Gulshan",
    //         type: "Residential",
    //         img: "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    //     },
    //     {
    //         id: 4,
    //         name: 'Aura',
    //         address: "Road 83, Gulshan",
    //         type: "Residential",
    //         img: "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    //     },
    //     {
    //         id: 5,
    //         name: 'Aura',
    //         address: "Road 83, Gulshan",
    //         type: "Residential",
    //         img: "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    //     },
    //     {
    //         id: 6,
    //         name: 'Aura',
    //         address: "Road 83, Gulshan",
    //         type: "Residential",
    //         img: "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    //     },
    // ]
    return (
        <div>
            <div className="container py-12 mt-4 ">
                <Actions />
                <div className="slider-container mt-12 md:px-6 px-6  w-full">
                    <Slider  {...settings}>
                        {
                            data?.map(itm => <BannerCart key={itm?._id} itm={itm} />)
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Banner;