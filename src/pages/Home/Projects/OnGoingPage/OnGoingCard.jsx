
const OnGoingCard = ({item}) => {
    const { img, title, address } = item;
    return (
        <div className="relative w-[423px] h-[423px] justify-self-center">
            <img className="w-full h-full object-cover" src={img} alt="" />
            <div className="w-full h-[70px] px-6 bg-[#00000080] absolute bottom-20">
                <h3 className="text-[18px] text-white">{title}</h3>
                <p className="text-[#C7C3C3]">{ address }</p>
            </div>
        </div>
    );
};

export default OnGoingCard;