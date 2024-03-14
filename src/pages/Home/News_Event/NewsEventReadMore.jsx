import { useParams } from "react-router-dom";
import PrimaryBanner from "../../../components/common/PrimaryBanner";
import { useEffect, useState } from "react";
import useContextApi from "../../../hooks/useContextApi";
import P from "../../../components/sharedComponent/P";
import Slider from "../../../components/common/Slider";


const NewsEventReadMore = () => {
    const { id } = useParams();
    const [event, setEvents] = useState('');
    const [eventData, setEventData] = useState([]);
    const { spilitTextIntoChunks } = useContextApi();
    const { eventTitle, eventThumbmail, eventInfo, eventImages } = event;

    const handleSpilitTextIntoChunks = (text, chunkLength) => {
        const chunks = spilitTextIntoChunks(text, chunkLength);
        return chunks;
    }
    // console.log(eventImages);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/src/pages/Home/News_Event/event.json');
                const data = await response.json();
                const singleData = data.filter(item => item._id === id);
                setEvents(singleData[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])


    useEffect(() => {
        console.log(eventInfo)
        const chunk = handleSpilitTextIntoChunks(eventInfo, 600);
        setEventData(chunk);
    }, [eventInfo])

    // this section is used for slider functionality
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const openSlider = (index) => {
        setSelectedImageIndex(index);
    };

    const closeSlider = () => {
        setSelectedImageIndex(null);
    };

    return (
        <div>
            {/* News and events read more banner section */}
            <PrimaryBanner
                title={eventTitle}
                // subTitle={'News & Events'}
                bannerImg={eventThumbmail}
                opacity={30}
            ></PrimaryBanner>

            <div className="bg-[#E0F2F2] pb-16 md:pb-[120px] px-4 md:px-0">
                <div className="max-w-[730px] mx-auto py-[60px] space-y-6">
                    {
                        eventData?.map((txt, index) => <P key={index} text={txt}></P>)
                    }
                </div>

                {/* news and event gallery section  */}
                <div className="max-w-[1366px] mx-auto md:px-5 xl:px-[60px] grid grid-cols-2 md:grid-cols-3">
                    {
                        eventImages?.map((img, index) => <img
                            key={index}
                            src={img}
                            onClick={() => openSlider(index)}
                            className="w-full h-[170px] md:h-[215px] lg:w-[415px] lg:h-[415px] object-cover hover:cursor-pointer hover:contrast-125 transition-all duration-500" />)
                    }
                </div>

                {/* gallery images slider view */}
                {selectedImageIndex !== null && (
                    <Slider
                        images={eventImages}
                        selectedIndex={selectedImageIndex}
                        setSelectedImageIndex={setSelectedImageIndex}
                        onClose={closeSlider}
                    />
                )}
            </div>
        </div>
    );
};

export default NewsEventReadMore;