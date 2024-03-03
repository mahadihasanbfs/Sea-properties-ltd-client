import PrimaryBanner from "../../../../components/common/PrimaryBanner";
import SecondaryTitle from "../../../../components/common/SecondaryTitle";
import useContextApi from "../../../../hooks/useContextApi";

const OurClient = () => {
    const { AboutUs_OurClientImg } = useContextApi();
    const { bannerImg, clientComapnyLogo } = AboutUs_OurClientImg;
    return (
        <div>
            {/* AboutUs_Our_Client banner section */}
            <PrimaryBanner
                title={'Our Client'}
                subTitle={'About us'}
                bannerImg={bannerImg}
                opacity={30}
            ></PrimaryBanner>

            <div className="max-w-[690px] mx-auto px-3 md:px-0 py-[60px] flex flex-col gap-6">
                <SecondaryTitle
                    text="A Footprint of Renowned Names"
                    position="text-center"
                />
                <p className="leading-6 text-center md:text-left">
                    We pride ourselves in creating spaces where leading corporates choose to establish their place of business. At Shanta, you become part of an elite community of renowned local and global names.
                </p>
            </div>

            <div className="bg-[#DCDCDC]">
                <div className="max-w-[1366px] mx-auto px-3 md:px-6 lg:px-[60px] py-[50px] lg:py-[90px] grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        clientComapnyLogo.map((imgPath, index) =>
                            <div key={index} className="flex justify-center">
                                <figure className="w-[345px] h-[240px] md:w-[336px] md:h-[256px] lg:w-[294px] lg:h-[240px] xl:h-[294px] bg-white flex justify-center items-center">
                                    <img src={imgPath} className="" />
                                </figure>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default OurClient;