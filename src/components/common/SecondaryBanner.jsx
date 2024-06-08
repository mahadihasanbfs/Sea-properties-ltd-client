
const SecondaryBanner = ({ bannerImg, opacity, projectName, location, status }) => {
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(to right, rgb(0 0 0 / ${opacity}%), rgb(0 0 0 / ${opacity}%)), url(${bannerImg}})`
            }}
            className="h-[400px] md:h-screen lg:h-screen bg-cover bg-center uppercase text-white text-left flex flex-col justify-center gap-[20px] font-normal md:pl-20 xl:pl-[180px] relative">
            <div className="w-[90%] mx-auto space-y-6">
                <h3 className="text-light text-[24px] md:text-[46px] md:leading-[55px]">{projectName}</h3>
                <div className="flex flex-col gap-2">
                    <p className="text-light leading-4 text-[15px]">{status}</p>
                    <p className="text-light leading-4 text-[15px]">{location}</p>
                </div>
            </div>
        </div>
    );
};

export default SecondaryBanner;