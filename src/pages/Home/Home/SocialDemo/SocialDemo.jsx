import { useState } from "react";
 import ShowContent from "../../../../components/common/ShoContent";
import YouTubeDemo from "./YouTubeDemo";
import DemoItem from "./DemoItem";

const SocialDemo = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className="bg-[#E0F2F1] py-12">
            <div className="container grid md:grid-cols-2 gap-4">
               <YouTubeDemo setOpen={setOpen}/>
            <div className="overflow-hidden">
                <DemoItem />
            </div>
            </div>
            {
                open && <ShowContent setOpen={setOpen} data=""/>
            }
        </div>
    );
};

export default SocialDemo;