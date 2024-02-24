/* eslint-disable react/prop-types */
import { IoLogoYoutube } from "react-icons/io5";

const YouTubeDemo = ({setOpen}) => {
    return (
        <div
            onClick={() => setOpen(true)}
            style={{
                backgroundImage: `url("https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load")`
            }}
            className="w-full cursor-pointer md:h-[340px] h-[200px] bg-cover flex items-center justify-center object-cover">
            <IoLogoYoutube className="text-5xl" />
        </div>
    );
};

export default YouTubeDemo;