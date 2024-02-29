import ShowCaseItem from "./ShowCaseItem";

const ShowCase = () => {
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
        }
    ]
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(#00000078, #0000008f),url("https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load")`
            }}
            className="md:h-[600px] h-auto py-8 bg-cover object-cover flex items-center">
            <div className="container grid md:grid-cols-3 grid-cols-1  gap-6 md:gap-20">
                {
                    data?.map(itm => <ShowCaseItem key={itm?.id} itm={itm} />)
                }
            </div>
        </div>
    );
};

export default ShowCase;