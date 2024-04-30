import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewsEventCard = ({ data }) => {
    console.log(data, 'data');
    // useEffect(() => {
    //     if (title.length > 70) {
    //         let newTtitle = title?.slice(0, 71) + '...';
    //         setTitle(newTtitle);
    //     }

    //     if (info.length > 130) {
    //         let newInfo = info.slice(0, 131) + '...';
    //         setInfo(newInfo);
    //     }

    // }, [])
    const { featureImg, title, _id, description } = data
    const [first100Chars, setFirst100Chars] = useState('');


    useEffect(() => {
        // Create a temporary div element
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = description;

        // Extract text from all <p> elements
        const paragraphs = tempDiv.querySelectorAll('p');
        let concatenatedText = '';
        paragraphs.forEach(paragraph => {
            concatenatedText += paragraph.textContent;
        });

        // Get the first 100 characters
        const first100Chars = concatenatedText.substring(0, 300);

        // Update the state with the plain text
        setFirst100Chars(first100Chars);
    }, [description]);



    return (
        <div className="w-full xl:w-[400px] h-[550px] md:h-[600px] bg-white relative box-border justify-self-center">
            <figure>
                <img className="w-full h-[260px] object-cover" src={featureImg} alt="" />
            </figure>

            <div className="p-7 space-y-4 xl:space-y-8">
                <h2 className="text-[19px] font-medium ">{title}</h2>
                <p className="w-[50px] rounded-[10px] bg-[#777777] text-white text-[12px] text-center capitalize">{'News'}</p>
                <p className="text-[15px] font-roboto">{first100Chars}</p>
            </div>

            <button className="uppercase border-b-[1px] text-[13px] font-roboto border-black absolute bottom-7 left-7">
                <Link to={`/news_events/${_id}`}>Read more</Link>
            </button>
        </div>
    );
};

export default NewsEventCard;