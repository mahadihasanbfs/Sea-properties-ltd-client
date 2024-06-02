import { useEffect, useState } from "react";
import P from "../../../../components/sharedComponent/P";
import useContextApi from "../../../../hooks/useContextApi";
import PrimaryBanner from "../../../../components/common/PrimaryBanner";
import { Helmet } from "react-helmet";

import bg from '../../../../assets/background.jpg';
import apr from '../../../../assets/our-approch.jpg';

const OurStory = () => {

    const { spilitTextIntoChunks } = useContextApi();
    const [text1, setText1] = useState([]);
    const [text2, setText2] = useState([]);
    const [text3, setText3] = useState([]);
    const { AboutUs_OurStoryImg } = useContextApi();
    const { img1, img2, img3, img4, img5 } = AboutUs_OurStoryImg;

    const handleSpilitTextIntoChunks = (text, chunkLength) => {
        const chunks = spilitTextIntoChunks(text, chunkLength);
        return chunks;
    }

    useEffect(() => {
        let text1 = `Imagine the bustling streets of Dhaka, where buildings rise high and each corner reveals a different tale. Driven by enthusiasm and a common vision, a group of dreamers gathered around a table in the middle of this urban symphony. SEA Properties Ltd. was established as a result, serving as a platform for communities to flourish and as much more than just a real estate company.

When we thought about opening  SEA Properties Ltd., we were just a tiny team with huge goals, driven by the idea that buildings might be more than just places to live; they could also serve as hubs for creativity and connection. Creating environments that make people feel completely at home has always been our goal, from the initial blueprint to the last coat of paint.

Our path has been filled with highs and lows, but no matter what, our spirit has been unwavering. We've danced on the brink of possibility, broken down walls, and withstood storms. And we've come out stronger, more resilient, and more inspired than ever after conquering every obstacle.

Every project we work on is a labor of love, from famous sites that line the skyline to obscure treasures scattered throughout the terrain. However, it's not simply the structures we design that make us unique; it's also the tales we tell and the lives we change in the process.

Our tale is far from done as we look to the future. Every sunrise serves as a reminder of the limitless possibilities that lay ahead, including new experiences to have, goals to pursue, and places to discover.

Welcome to our story, which is one of ardor, tenacity, and the promise of opportunity. The trip is just as significant as the destination at SEA Properties Ltd. And we're co-writing this once-in-a-lifetime story's next chapter.
`
        let text2 = `When we thought about opening  SEA Properties Ltd., we were just a tiny team with huge goals, driven by the idea that buildings might be more than just places to live; they could also serve as hubs for creativity and connection. Creating environments that make people feel completely at home has always been our goal, from the initial blueprint to the last coat of paint.
`

        let text3 = `Our path has been filled with highs and lows, but no matter what, our spirit has been unwavering. We've danced on the brink of possibility, broken down walls, and withstood storms. And we've come out stronger, more resilient, and more inspired than ever after conquering every obstacle.

`
        let text4 = `Every project we work on is a labor of love, from famous sites that line the skyline to obscure treasures scattered throughout the terrain. However, it's not simply the structures we design that make us unique; it's also the tales we tell and the lives we change in the process.
`
        let text5 = `Our tale is far from done as we look to the future. Every sunrise serves as a reminder of the limitless possibilities that lay ahead, including new experiences to have, goals to pursue, and places to discover.

`
        let text6 = `Welcome to our story, which is one of ardor, tenacity, and the promise of opportunity. The trip is just as significant as the destination at SEA Properties Ltd. And we're co-writing this once-in-a-lifetime story's next chapter.
`
        let chunk1 = handleSpilitTextIntoChunks(text1, 400);
        let chunk2 = handleSpilitTextIntoChunks(text2, 385);
        let chunk3 = handleSpilitTextIntoChunks(text3, 300);
        let chunk4 = handleSpilitTextIntoChunks(text4, 300);
        let chunk5 = handleSpilitTextIntoChunks(text5, 300);
        let chunk6 = handleSpilitTextIntoChunks(text6, 300);
        setText1(chunk1);
        setText2(chunk2);
        setText3(chunk3);
    }, [])
    return (
        <div>
            <Helmet>
                <title>
                    Our Story | SEA Properties Ltd.
                </title>
            </Helmet>
            {/* our story Section 1  */}
            <PrimaryBanner
                bannerImg={img1}
                opacity={60}
                title="OUR STORY"
                subTitle="About us"
            />

            {/* our story section 2 */}
            <div className="max-w-[1366px] md:h-[722px] mx-auto px-[20px] xl:px-[80px] xl:grid grid-cols-2 flex flex-col  md:flex-row items-center gap-6 md:gap-0  mt-8 md:mt-[60px]">
                <div className="basis-[40%]">
                    <img className="w-[588px] md:h-[722px] object-cover" src={`${bg}`} alt="" />
                </div>
                <div className={`flex flex-col justify-between md:ml-10 xl:ml-20 text-justify basis-[60%] h-full`}>
                    <h3 className="text-[#AAB0B2] text-3xl lg:text-4xl uppercase mb-6 md:mb-0">Background</h3>
                    {
                        text1.map((txt, index) => <P key={index} text={txt} size={'text-sm lg:text-[16px]'} lineHeight={'lg:leading-[22px]'}></P>)

                    }
                </div>
            </div>

            {/* our story section 3 */}
            <div className="bg-[#B0BEC5] lg:h-[681px] mt-[107px]">
                <div className="max-w-[1366px] mx-auto h-full px-6 xl:px-[80px] py-10 lg:py-[75px] lg:grid grid-cols-2 flex flex-col  md:flex-row items-center gap-6 lg:gap-0">
                    <div className="flex flex-col justify-start gap-8 basis-[40%]">
                        <h3 className="text-white text-3xl lg:text-4xl uppercase">Who We Are</h3>
                        <img className="w-[404px] md:h-[456px] object-cover" src={`${img3}`} alt="" />
                    </div>
                    <div className="flex flex-col justify-center  gap-[47px] text-justify basis-[60%]">
                        Our company offers a portfolio of high-end developments in Dhaka city, with a strong reputation in the Real Estate market and access to luxury apartments and commercial spaces in prime locations.
                        <br />
                        <br />
                        Our focus is on developing luxury properties and providing investors and buyers with high-quality service that sets us apart from competitors. Our commitment to excellence and attention to detail has been key to our success.
                        <br />
                        <br />
                        SEA Properties strives to exceed expectations and sets high standards for itself and others. Our driving philosophy is to "Setting Standards".

                    </div>
                </div>
            </div>

            {/* our story section 4 */}

            <div style={{
                backgroundImage: `linear-gradient(rgb(0 0 0 / 66%), #04040c) ,url("${apr}")`
            }}
                className="md:h-[740px] text-[#ffffff] bg-cover flex items-center py-20 md:py-0">
                <div className="max-w-[720px] mx-auto text-white flex flex-col gap-6 text-center lg:text-left">
                    <h3 className="uppercase text-center text-3xl text-white lg:text-4xl mb-">Our Approach</h3>
                    <p className="text-sm lg:text-[16px] text-justify text-white leading-[22px] px-4 md:px-0">
                        Buying a property like an apartment, home, or office is a significant life goal for many people. It requires saving money over time to make this dream come true. This pursuit of buying property can be passed down through generations. However, once the purchase is made, one may question whether the dream has truly been fulfilled.
                        <br />
                        <br />
                        At SEA Properties, we understand the importance of this moment for you. Our properties, including apartments, condominiums, and commercial complexes, offer top-notch amenities such as temperature-controlled swimming pools, rooftop gardens, gymnasiums, walkways, and children's play areas. We strive to provide stylish urban living solutions for our customers.

                    </p>
                </div>
            </div>

            {/* our story section 5 */}
            {/* <div className="max-w-[1366px] md:h-[586px] mx-auto px-6 lg:px-[80px] py-[52px] text-[#000] lg:grid grid-cols-2 flex flex-col  md:flex-row items-center gap-8 lg:gap-0">
                <div className="flex flex-col justify-start gap-6 basis-[40%] h-full">
                    <h3 className="uppercase text-3xl lg:text-4xl">Our Logo</h3>
                    <img className="w-[344px] lg:w-[406px] h-[304px] lg:h-[406px] object-cover" src={`${img5}`} alt="" />
                </div>
                <div className="flex flex-col justify-center md:gap-12 lg:gap-6 text-justify basis-[60%] h-full">
                    {
                        text3.map((txt, index) => <P key={index} text={txt} size={'text-sm lg:text-[16px]'} lineHeight={'lg:leading-[22px]'}></P>)

                    }
                </div>
            </div> */}
        </div>
    );
};

export default OurStory;