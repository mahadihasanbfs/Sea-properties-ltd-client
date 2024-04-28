import { useEffect, useState } from "react";
import ShowContent from "../../../../components/common/ShoContent";
import YouTubeDemo from "./YouTubeDemo";
import DemoItem from "./DemoItem";
import VideoPlayer from "../../../../components/common/VideoPlayer";

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
                    videos?.map(item =>
                        <div className="md:h-[380px] h-[300px]" key={item?._id}>
                            <VideoPlayer thum={item?.thumbnail} url={item?.videoUrl} />
                        </div>)
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