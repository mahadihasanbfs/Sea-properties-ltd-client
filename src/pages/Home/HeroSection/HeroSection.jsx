import CircleBox from "./CircleBox";

const HeroSection = () => {
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(to right, rgb(0 0 0 / 40%), rgb(0 0 0 / 49%)), url(https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`
            }}
            className=" h-[650px] bg-cover object-cover flex flex-col items-center justify-center  overflow-hidden">
            <CircleBox />


        </div>
    );
};

export default HeroSection;