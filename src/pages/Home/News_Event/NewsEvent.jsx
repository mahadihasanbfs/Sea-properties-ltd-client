import { useEffect, useState } from "react";
import PrimaryBanner from "../../../components/common/PrimaryBanner";
import useContextApi from "../../../hooks/useContextApi";
import NewsEventCard from "./NewsEventCard";
import { Helmet } from "react-helmet";

const NewsEvent = () => {
    const [events, setEvents] = useState([]);
    const { newsEventsImg } = useContextApi();
    const { bannerImg } = newsEventsImg;

    useEffect(() => {
        fetch('/src/pages/Home/News_Event/event.json')
            .then(res => res.json())
            .then(data => setEvents(data))
    }, [])

    return (
        <div>
            <Helmet>
                <title>
                    News and Events | Sea Properties ltd
                </title>
            </Helmet>
            {/* News and events banner section */}
            <PrimaryBanner
                title={'Stay updated with us'}
                subTitle={'News & Events'}
                bannerImg={bannerImg}
                opacity={30}
            ></PrimaryBanner>

            {/* events section */}
            <div className="bg-[#E0F2F2] py-[60px]">
                <div className="max-w-[1366px] mx-auto px-4 md:px-[40px] grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        events.map(item => <NewsEventCard
                            key={item._id}
                            data={item}
                        ></NewsEventCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default NewsEvent;