
const SecondaryBanner = ({ bannerImg, opacity, projectName, location }) => {
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(to right, rgb(0 0 0 / ${opacity}%), rgb(0 0 0 / ${opacity}%)), url(${bannerImg}})`
            }}
            className="h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center uppercase text-white text-left flex flex-col justify-center gap-[20px] font-normal md:pl-20 xl:pl-[180px]">
            <div className="w-[90%] mx-auto space-y-6">
                <h3 className="text-[24px] md:text-[46px] md:leading-[55px]">{projectName}</h3>
                <p className="leading-4 text-[15px]">{location}</p>
            </div>
        </div>
    );
};

export default SecondaryBanner;