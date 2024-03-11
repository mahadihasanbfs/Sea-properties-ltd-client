import { useEffect, useState } from "react";
import useContextApi from "../../../../hooks/useContextApi";
import P from "../../../../components/sharedComponent/P";
import PrimaryBanner from "../../../../components/common/PrimaryBanner";
import { Helmet } from "react-helmet";


const VisionMision = () => {
    const { spilitTextIntoChunks } = useContextApi();
    const [text2, setText2] = useState([]);
    const [text3, setText3] = useState([]);

    const handleSpilitTextIntoChunks = (text, chunkLength) => {
        const chunks = spilitTextIntoChunks(text, chunkLength);
        return chunks;
    }

    useEffect(() => {
        let text2 = 'To offer a global touch, maintaining Bangladeshi culture in living and work places, with utmost uncompromising service to our clients and value for money. To ensure a smooth upward-reasonable trend of return on investment. To give employees a feeling of satisfaction by maximizing their potentials and providing means for their personal well-being and career development.';
        let text3 = 'Our vision & mission are being made into reality through the belief and implementation of 6 core values. Excellence, Innovation, Commitment, Quality, Valuing People & Customer Satisfaction are embedded in our DNA and drives toward our motto of “setting standards”. Excellence in every aspect of each project is how SHL aims to win the hearts of their clients, because at the end of the day – home is where the heart is. Continuous improvement and innovation is key to remaining at the top of the industry. SHL aims to set new standards in each project, so having an innovative mindset is what drives them to go further. Commitment to their customers and landowners in terms of on-time delivery of their dream projects, with the promised quality and specifications. Commitment to their team members, to maximize their potentials and provide means for their well-being and career development. Quality is the core guiding principle at SHL, it’s what sets them apart. They aim to set new benchmarks of quality without compromise, both in terms of their products and their customer service. SHL value the talent, time and intentions of everyone they work with. They take interest in and embrace each other’s individuality, stay true to who they are, stand up for what they believe in, and are always mindful of others. Ensuring utmost uncompromising service to the clients and value for money is the key of their loyal customer base.';
        let chunk2 = handleSpilitTextIntoChunks(text2, 150);
        let chunk3 = handleSpilitTextIntoChunks(text3, 300);
        setText2(chunk2);
        setText3(chunk3);
    }, [])
    return (
        <div>
            <Helmet>
                <title>
                    Vision, Mission and Values | Sea Properties ltd
                </title>
            </Helmet>
            {/* vision mision Section 1  */}
            <PrimaryBanner
                bannerImg="https://i.ibb.co/ydY8vSf/bannerimg.png"
                opacity={20}
                title="Vision Mission & Values"
                subTitle="About us"
            />

            {/* vision mision section 2 */}
            <div className="bg-[#B0BEC5]">
                <div className="max-w-[1366px] mx-auto px-5 xl:px-[200px] pt-[120px] pb-40 md:pb-80 xl:pb-[500px] font-medium text-justify">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-28">
                        <div className="w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] box-border border-4 border-white uppercase text-white text-[40px] pt-[60px] pr-[104px] pb-[196px] pl-[60px] lg:pr-204px lg:pb-296px ">
                            Vision
                        </div>
                        <p className="text-sm lg:text-[16px] basis-[40%]">
                            To set SHL as an icon for both clients and competitors in the fields of innovation, product quality, service standard, profitability and community work.
                        </p>
                    </div>

                    <div className="relative flex flex-col md:flex-row-reverse justify-center items-center gap-28 mt-16">
                        <div>
                            <div className="w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] box-border border-4 border-white uppercase text-white text-[40px] pt-[60px] pr-[104px] pb-[196px] pl-[60px] lg:pr-204px lg:pb-296px">
                                Mission
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            {
                                text2.map((txt, index) => <P key={index} text={txt} size={'text-sm lg:text-[16px]'} lineHeight={'lg:leading-[22px]'}></P>)
                            }
                        </div>

                        <p className="text-[200px] text-[#FFFFFF66] font-roboto absolute left-[18%] -bottom-[80%] lg:left-[25%] lg:-bottom-1/2 hidden md:block">
                            &
                        </p>

                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-28 mt-28">
                        <div>
                            <div className="w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] box-border border-4 border-white uppercase text-white text-[40px] pt-[60px] pr-[104px] pb-[196px] pl-[60px] lg:pr-204px lg:pb-296px">
                                VALUES
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            {
                                text3.map((txt, index) => <P key={index} text={txt} size={'text-sm lg:text-[16px]'} lineHeight={'lg:leading-[22px]'}></P>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisionMision;