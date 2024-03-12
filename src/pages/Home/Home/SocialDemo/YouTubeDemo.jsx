/* eslint-disable react/prop-types */
import { IoLogoYoutube } from "react-icons/io5";

const YouTubeDemo = ({ setOpen, setSrc, data }) => {
    return (
        <div
            onClick={() => {
                setOpen(true)
                setSrc(data?.videoUrl)
            }}
            style={{
                backgroundImage: `url("${data?.thumbnail}")`
            }}
            className="w-full cursor-pointer md:h-[340px] h-[200px] bg-cover flex items-center justify-center object-cover">
            <IoLogoYoutube className="text-5xl" />
        </div>
    );
};

export default YouTubeDemo;