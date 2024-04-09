import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerCart from "./BannerCart";
import { useEffect, useState } from "react";
import Actions from "../Location/Actions";



const Banner = () => {
    const [data, setData] = useState([]);
    const [projectStatus, setProjectStatus] = useState('');
    const [projectType, setProjectType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://sea-properties-server.vercel.app/api/v1/admin/project/projects')
            .then(res => res.json())
            .then(data => setData(data?.data))
    }, [])

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 1,

                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1,

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,

                }
            }
        ]
    };

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
    // Filter data based on project status and type
    // Filter data based on project status and type
    const filterData = projectStatus === '' || projectType === '' ? data : data.filter(itm =>
        (itm?.project_status && itm.project_status.toLowerCase() === projectStatus.toLowerCase()) ||
        (itm?.project_type && itm.project_type.toLowerCase() === projectType.toLowerCase())
    );

    // Search functionality
    let searchData;
    if (searchTerm === '') {
        searchData = filterData; // If search term is empty, show all filtered data
    } else {
        searchData = filterData.filter(item =>
            Object.values(item).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }

    console.log(data, 'searched data........');


    return (
        <div>
            <div className="max-w-[1366px] mx-auto py-12 mt-4 px-6 xl:px-4">
                <Actions onSearch={setSearchTerm} onStatus={setProjectStatus} onType={setProjectType} />
                <div className="slider-container mt-12 px-6 mr-5 w-[98%] mx-auto">
                    <Slider  {...settings} className="pl-4">
                        {
                            searchData?.map(itm => <BannerCart key={itm?._id} itm={itm} />)
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Banner;