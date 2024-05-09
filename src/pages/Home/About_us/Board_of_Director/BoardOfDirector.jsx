import { useEffect, useState } from "react";
import useContextApi from "../../../../hooks/useContextApi";
import P from "../../../../components/sharedComponent/P";
import PrimaryBanner from "../../../../components/common/PrimaryBanner";
import { Helmet } from "react-helmet";

const BoardOfDirector = () => {
    const { AboutUs_BoardOfDirectorImg, spilitTextIntoChunks } = useContextApi();
    const { img1, img2, img3, img4, img5 } = AboutUs_BoardOfDirectorImg;
    const [text1, setText1] = useState([]);
    const [text2, setText2] = useState([]);
    const [text3, setText3] = useState([]);
    const [text4, setText4] = useState([]);

    const handleSpilitTextIntoChunks = (text, chunkLength) => {
        const chunks = spilitTextIntoChunks(text, chunkLength);
        return chunks;
    }

    useEffect(() => {
        let text2 = `Welcome to SEA Properties Limited! As the Managing Director, I am thrilled to extend to you a warm invitation to explore our realm of innovative real estate solutions.At SEA Properties Limited, we believe in empowering individuals to achieve their dreams of owning a stable home, despite any challenges they may face.While the housing industry plays a pivotal role in modern development, we acknowledge that challenges such as inefficiency and unethical practices exist.  
        However, we at SEA Properties Limited have embraced a distinctive approach to foster investor confidence and integrity within the industry.We recognize the importance of transparency and fairness in every transaction.Therefore, instead of leaving individuals vulnerable to deceitful practices, we offer a comprehensive solution.From land acquisition to construction, SEA Properties Limited manages every aspect of the process.Our installment payment system for land registration and construction costs ensures that our clients are protected from any potential fraud.We firmly believe that success is not merely reaching a destination but also embracing the journey.It is our privilege to accompany you on this journey, transforming aspirations into reality while setting new standards within the industry.Thank you for your steadfast support and trust in SEA Properties Limited.`;

        let text1 = 'Housing is one of the fundamental needs in Bangladesh. In This country, every single person desire is to build a sweet home in Dhaka. To make digital Bangladesh, we are the only ones who can buy the best land at affordable prices, so that your dream becomes a reality. Stay with SEA Properties Limited to build your dream home in the best residential area of the country at a reasonable price. We go beyond building structures to meet your needs.We recognize the importance of your home, office, or commercial space.These places are where your stories and dreams come to life.We take pride in creating environments that support your success and happiness.We appreciate your trust and faith in us, which have been key factors in our success.We are committed to maintaining our high standards and surpassing your expectations. SEA Properties Limited is dedicated to delivering excellence, value, and sustainability in order to enhance the quality of life and contribute to a more harmonious world.Thank you for being a part of our journey.Together, we will build the future.';
        let text3 = 'Mamataz Begam is the Founding Director of SEA Properties Limited. She is responsible for analyzing growth potential in various markets and making recommendations for further evaluation based on her observations. As a part of the leadership team, she also helps to shape the organizational culture, and design motivational initiatives for all employees.';

        let chunk1 = handleSpilitTextIntoChunks(text1, 280);
        let chunk2 = handleSpilitTextIntoChunks(text2, 500);
        let chunk3 = handleSpilitTextIntoChunks(text3, 300);
        setText1(chunk1);
        setText2(chunk2);
        setText3(chunk3);
    }, [])
    return (
        <div className="pb-[70px]">
            <Helmet>
                <title>
                    Board of Directors | Sea Properties ltd
                </title>
            </Helmet>
            {/* board of director Section 1  */}
            <PrimaryBanner
                bannerImg={img1}
                opacity={20}
                title="Board of Directors"
                subTitle="About us"
            />

            {/* board of director Section 2  */}
            <div className="max-w-[1366px] mx-auto mt-[80px] lg:mt-[100px] xl:mt-[120px] px-[40px] xl:px-[60px] md:grid grid-cols-2 flex flex-col gap-6 md:gap-0">
                <figure className="flex items-center justify-center md:justify-start">
                    <img className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[505px] xl:h-[505px] object-cover" src={img2} alt="" />
                </figure>
                <div className="flex flex-col justify-center gap-6">
                    <div className="uppercase space-y-2">
                        <h3 className="text-[#000] text-[18px] leading-[22px] font-medium">A. S. M. Anisuzzaman</h3>
                        <p className="text-[#7F7B79] text-[14px] leading-4">Chairman</p>
                    </div>
                    <div className={`flex flex-col justify-between  gap-4  text-justify basis-[60%] h-full`}>
                        {
                            text1.map((txt, index) => <P key={index} text={txt} size={'text-sm  lg:text-[16px] '} lineHeight={'lg:leading-[22px]'}></P>)

                        }
                    </div>
                </div>
            </div>

            {/* board of director Section 3 */}
            <div className="max-w-[1366px] mx-auto mt-[60px] px-[40px] xl:px-[60px] md:grid grid-cols-2 flex flex-col-reverse md:flex-col gap-6 md:gap-0">
                <div className="flex flex-col justify-center gap-6">
                    <div className="uppercase text-right space-y-2">
                        <h3 className="text-[#000] text-[18px] leading-[22px] font-medium">Mohammad Solaiman islam</h3>
                        <p className="text-[#7F7B79] text-[14px] leading-4">MANAGING DIRECTOR</p>
                    </div>
                    <div className={`flex flex-col justify-between  gap-4  text-justify basis-[60%] h-full`}>
                        {
                            text2.map((txt, index) => <P key={index} text={txt} size={'text-sm  lg:text-[16px] '} lineHeight={'lg:leading-[22px]'}></P>)

                        }
                    </div>
                    {/* <div className={`flex flex-col justify-between md:ml-10 xl:ml-20 text-justify basis-[60%] h-full`}>

                        {
                            text1.map((txt, index) => <P key={index} text={txt} size={'text-sm lg:text-[16px]'} lineHeight={'lg:leading-[22px]'}></P>)

                        }
                    </div> */}
                </div>
                <figure className="flex items-center justify-center md:justify-end">
                    <img className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[505px] xl:h-[505px] object-cover " src={img3} alt="" />
                </figure>
            </div>

            {/* board of director Section 4 */}
            <div className="max-w-[1366px] mx-auto mt-[60px] px-[40px] xl:px-[60px] md:grid grid-cols-2 flex flex-col gap-6 md:gap-0">
                <figure className="flex justify-center md:justify-start">
                    <img className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[505px] xl:h-[505px] object-cover" src={img4} alt="" />
                </figure>
                <div className="flex flex-col justify-center gap-6">
                    <div className="uppercase space-y-2">
                        <h3 className="text-[#000] text-[18px] leading-[22px] font-medium"> Mamataz Begam</h3>
                        <p className="text-[#7F7B79] text-[14px] leading-4">Director</p>
                    </div>
                    <div className={`flex flex-col justify-between  gap-4  text-justify `}>
                        {
                            text3.map((txt, index) => <P key={index} text={txt} size={'text-sm  lg:text-[16px] '} lineHeight={'lg:leading-[22px]'}></P>)

                        }
                    </div>
                </div>
            </div>


        </div>
    );
};

export default BoardOfDirector;