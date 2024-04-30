import { useEffect, useState } from "react";
import ShowContent from "../../../../components/common/ShoContent";
import YouTubeDemo from "./YouTubeDemo";
import DemoItem from "./DemoItem";

const SocialDemo = () => {
    const [open, setOpen] = useState(false);
    const [videos, setVideos] = useState([]);
    const [src, setSrc] = useState('');

    useEffect(() => {
        fetch("/src/pages/Home/Home/SocialDemo/yotubeVideo.json")
            .then(res => res.json())
            .then(data => setVideos(data))
    }, [])
    return (
        <div className="bg-[#E0F2F1] py-12">
            <div className="container grid md:grid-cols-2 gap-4">
                {
                    videos?.map(item => <YouTubeDemo
                        key={item.id}
                        data={item}
                        setOpen={setOpen}
                        setSrc={setSrc}
                    ></YouTubeDemo>)
                }
                <div className="overflow-hidden md:col-span-2">
                    <DemoItem />
                </div>
            </div>
            {
                open && <ShowContent setOpen={setOpen} link={src} />
            }
        </div>
    );
};

export default SocialDemo;