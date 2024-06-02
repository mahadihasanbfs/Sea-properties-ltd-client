import { useEffect, useState } from "react";
import PrimaryBanner from "../../../components/common/PrimaryBanner";
import useContextApi from "../../../hooks/useContextApi";
import NewsEventCard from "./NewsEventCard";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

const NewsEvent = () => {
    // const [events, setEvents] = useState([]);
    const { newsEventsImg } = useContextApi();
    const { bannerImg } = newsEventsImg;


    const { data: events = [], refetch } = useQuery({
        queryKey: ["news-events"],
        queryFn: async () => {
            const res = await fetch(`https://backend.seapropertiesltd.com.bd/api/v1/admin/news-events`);
            const data = await res.json();
            return data.data;
        },
    });

    console.log(events, 'events');

    return (
        <div>
            <Helmet>
                <title>
                    News and Events | SEA Properties Ltd.
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
                        events?.map(item => <NewsEventCard
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