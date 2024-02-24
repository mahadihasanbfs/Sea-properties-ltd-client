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
    return (
        <div>
            <div className="slider-container md:px-12 px-6">
                <Slider className="md:px-2 px-1" {...settings}>

                    {
                        data?.map(itm => <div key={itm?.id} className="slider-item mx-auto">
                            <div
                                style={{
                                    backgroundImage: `url(${itm.img})`
                                }}
                                className="py-4 slider-content md:h-[340px] bg-cover object-cover h-[250px] mx-6">
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