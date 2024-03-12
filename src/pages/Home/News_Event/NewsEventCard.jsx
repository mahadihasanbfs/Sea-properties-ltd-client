import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewsEventCard = ({ data }) => {
    console.log(data);
    const { _id, type, eventTitle, eventThumbmail, eventInfo } = data;
    const[title, setTitle] = useState(eventTitle);
    const [info, setInfo] = useState(eventInfo);

    useEffect(() => {
        if (title.length > 70 ) {
            let newTtitle = title.slice(0, 71) + '...';
            setTitle(newTtitle);
        }

        if (info.length > 130) {
            let newInfo = info.slice(0, 131) + '...';
            setInfo(newInfo);
        }

      },[])

    return (
        <div className="w-full xl:w-[400px] h-[550px] md:h-[600px] bg-white relative box-border justify-self-center">
            <figure>
                <img className="w-full h-[260px] object-cover" src={eventThumbmail} alt="" />
            </figure>
            
            <div className="p-7 space-y-4 xl:space-y-8">
                <h2 className="text-[19px] font-medium ">{ title }</h2>
                <p className="w-[50px] rounded-[10px] bg-[#777777] text-white text-[12px] text-center capitalize">{type}</p>
                <p className="text-[15px] font-roboto">{ info }</p>
            </div>

            <button className="uppercase border-b-[1px] text-[13px] font-roboto border-black absolute bottom-7 left-7">
                <Link to={`/news_events/${_id}`}>Read more</Link>
            </button>
        </div>
    );
};

export default NewsEventCard;