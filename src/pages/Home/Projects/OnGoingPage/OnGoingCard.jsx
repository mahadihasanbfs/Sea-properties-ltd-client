import { Link } from "react-router-dom";

const OnGoingCard = ({ item }) => {
    const { _id, img, title, address } = item;
    return (
        <Link to={`/project-details/${_id}`}>
            <div className="relative xl:w-[423px] xl:h-[423px] justify-self-center overflow-hidden hover:cursor-pointer">
                <img className="w-full h-full hover:scale-110 transition-transform duration-1000 ease-in-out object-cover" src={img} alt="" />
                <div className="w-full h-[70px] px-6 bg-[#00000080] absolute bottom-20">
                    <h3 className="text-[18px] text-white">{title}</h3>
                    <p className="text-[#C7C3C3]">{address}</p>
                </div>
            </div>
        </Link>
    );
};

export default OnGoingCard;