import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";

const DemoItem = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const data = [
        {
            id: 0,
            name: 'Aura',

            post: "Residential",
            message: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita architecto itaque minima cumque temporibus totam et! Corporis suscipit, natus blanditiis aliquid provident, impedit rerum autem laudantium obcaecati, mollitia saepe ratione.",
            img: "https://i.ibb.co/Hdd3VJc/5a62306062088bf15bc1d2b903c35a99.jpg"
        },
        {
            id: 1,
            name: 'Aura',

            post: "Residential",
            message: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita architecto itaque minima cumque temporibus totam et! Corporis suscipit, natus blanditiis aliquid provident, impedit rerum autem laudantium obcaecati, mollitia saepe ratione.",
            img: "https://i.ibb.co/Hdd3VJc/5a62306062088bf15bc1d2b903c35a99.jpg"
        },
        {
            id: 2,
            name: 'Aura',

            post: "Residential",
            message: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita architecto itaque minima cumque temporibus totam et! Corporis suscipit, natus blanditiis aliquid provident, impedit rerum autem laudantium obcaecati, mollitia saepe ratione.",
            img: "https://i.ibb.co/Hdd3VJc/5a62306062088bf15bc1d2b903c35a99.jpg"
        },
        {
            id: 3,
            name: 'Aura',

            post: "Residential",
            message: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita architecto itaque minima cumque temporibus totam et! Corporis suscipit, natus blanditiis aliquid provident, impedit rerum autem laudantium obcaecati, mollitia saepe ratione.",
            img: "https://i.ibb.co/Hdd3VJc/5a62306062088bf15bc1d2b903c35a99.jpg"
        },
        {
            id: 4,
            name: 'Aura',

            post: "Residential",
            message: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita architecto itaque minima cumque temporibus totam et! Corporis suscipit, natus blanditiis aliquid provident, impedit rerum autem laudantium obcaecati, mollitia saepe ratione.",
            img: "https://i.ibb.co/Hdd3VJc/5a62306062088bf15bc1d2b903c35a99.jpg"
        },
        {
            id: 5,
            name: 'Aura',

            post: "Residential",
            message: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita architecto itaque minima cumque temporibus totam et! Corporis suscipit, natus blanditiis aliquid provident, impedit rerum autem laudantium obcaecati, mollitia saepe ratione.",
            img: "https://i.ibb.co/Hdd3VJc/5a62306062088bf15bc1d2b903c35a99.jpg"
        },
        {
            id: 6,
            name: 'Aura',

            post: "Residential",
            message: "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita architecto itaque minima cumque temporibus totam et! Corporis suscipit, natus blanditiis aliquid provident, impedit rerum autem laudantium obcaecati, mollitia saepe ratione.",
            img: "https://i.ibb.co/Hdd3VJc/5a62306062088bf15bc1d2b903c35a99.jpg"
        },
    ]

    const { data: sData = [], refetch } = useQuery({
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
        <div>
            <div className="slider-container bg-[green] flex justify-center md:px-12 px-6">
                <Slider className="md:px-2 px-1" {...settings}>

                    {
                        sliderData?.map(itm => <div key={itm?._id} className="slider-item mx-auto">
                            <div
                                style={{
                                    backgroundImage: `url(${itm.photo})`
                                }}
                                className="py-4 slider-content md:h-[100px] h-[90px]  bg-cover bg-center object-cover   mx-6">
                                <h3>1</h3>
                            </div>
                        </div>)
                    }
                </Slider>
            </div>
        </div>
    );
};

export default DemoItem;