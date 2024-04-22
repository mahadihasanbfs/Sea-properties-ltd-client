

const PrimaryBanner = ({ bannerImg, opacity, title, subTitle }) => {
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(to right, rgb(0 0 0 / ${opacity}%), rgb(0 0 0 / ${opacity}%)), url(${bannerImg}})`
            }}
            className="h-[400px] text-[#ffffff] md:h-[500px] lg:h-[600px] bg-cover bg-center uppercase text-white text-center flex flex-col justify-center gap-[20px] font-normal">
            <p className="leading-4 text-[15px]">{subTitle}</p>
            <h3 className="text-[24px] md:text-[46px] md:leading-[55px] w-[90%] mx-auto">{title}</h3>
        </div>
    );
};

export default PrimaryBanner;