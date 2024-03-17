import CircleBox from "./CircleBox";

const HeroSection = () => {
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(to right, rgb(0 0 0 / 40%), rgb(0 0 0 / 49%)), url(https://i.ibb.co/yhfVfwh/e0570631ea539c4c79b4d15df4fb7d82.jpg)`
            }}
            className="relative h-[650px] bg-cover bg-center object-cover flex flex-col items-center justify-center  overflow-hidden">
                <CircleBox />
        </div>
    );
};

export default HeroSection;