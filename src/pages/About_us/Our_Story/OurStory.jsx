import { useEffect, useState } from "react";
import P from "./P";
import useContextApi from "../../../hooks/useContextApi";


const OurStory = () => {
    /** this function is used to make long text into chunk 
     * first parameter take the text and second parameter take the length of each chunk
     * NOTE: every chunk ends with a period '.' , so every chunk will not get same length. But it will be closer to the give length or grater.
    */
    function spilitTextIntoChunks(text, chunkLength) {
        const chunks = [];
        let startIndex = 0;

        while (startIndex < text.length) {
            let chunk = text.substr(startIndex, chunkLength);

            if (!(chunk.endsWith('.'))) {
                let lastIndexOfDot = chunk.lastIndexOf('.');
                if (lastIndexOfDot === -1) {
                    chunk = text.slice(startIndex, text.indexOf('.', startIndex) + 1);
                    chunks.push(chunk);
                    startIndex += (chunk.length + 1);
                } else {
                    chunk = text.substr(startIndex, lastIndexOfDot + 1);
                    chunks.push(chunk);
                    startIndex += (lastIndexOfDot + 1);
                }
            } else {
                chunks.push(chunk);
                startIndex += (chunk.lastIndexOf('.') + 1);
            }
        }

        return chunks;
    }

    const [text1, setText1] = useState([]);
    const [text2, setText2] = useState([]);
    const [text3, setText3] = useState([]);
    const { AboutUs_OurStoryImg } = useContextApi();
    const { img1, img2, img3, img4, img5 } = AboutUs_OurStoryImg;

    useEffect(() => {
        let text1 = `Shanta started its journey in 1988 in the ready-made garment (RMG) sector and became one of the forerunners in RMG export by establishing leading industries such as Shanta Garments Ltd, Shanta Industries Ltd, Shanta Washworks Ltd, GDS Chemicals Ltd and Shanta Denims Ltd. Earning a solid reputation as an important vendor for some of the most renowned apparel brands of USA and Europe. Shanta has a long track record of construction since 1991, having been involved in various projects of its own and of the STS Group. It has built the iconic Safura Tower- the 16 storied commercial landmark at Banani, the 200,000 sft multi-facility centrally air conditioned International School Dhaka (ISD) at Bashundhara, the 125,000 sft Delhi Public School at Uttara, state-of-the-art RMG factories such as its 150,000 sft Shanta Industries Ltd, the 150,000 sft Shanta Denims Ltd and the 35,000 sft Shanta Washworks Ltd at Dhaka EPZ. Furthermore, the team was also involved in the construction of Apollo Hospitals Dhaka - the 550,000 sft first multi-disciplinary super-specialty hospital of the country. Eventually exiting the RMG sector and dissolving it's interests to pursue the passion for construction, Shanta Holdings Limited (SHL) was established in 2005 with a mission to change the lifestyle of city dwellers by providing modern, functional and aesthetic living and working spaces that can only be compared to the most successful developers of the globe. With the belief that construction is not just about building structures - but an Art, SHL goes beyond the traditional scopes of property development and integrates the best the world has to offer. Since then, SHL has emerged as the most reputed and fastest growing real estate developer of the country.`
        let text2 = `A powerful portfolio of the country’s most distinctive and selective developments, with an excellent reputation in the Real Estate market, and enviable relationships that give our clients exclusive access to the ultimate in luxury apartments and exquisite commercial spaces, all in prime locations of Dhaka city. Our promise remains to develop a portfolio of luxury spaces and offer investors as well as buyers an unparalleled quality of service, inimitable by competitors. It is the commitment to both impeccably high standards and attention to detail that drive us to our success. Besides building beyond expectation, SHL moreover sets standards for itself, for you and for others, which is why we proudly declare our driving philosophy to be "Setting Standards".`
        let text3 = `The concept for our logo is derived from the shape of human hands, the shape they make when held with the palms facing each other. Usually, when we hold an object in our palms, it is something we care about, something valuable to us. Like when a blow of air attempts to put off a candle that gives us light, we protect it with our palms. When a tiny bird falls from its nest, we hold it up and protect it in our palms. When a sculptor sculpts a masterpiece, he shapes it using his fingers and palms. Hence, our logo depicts the amount of care and emotion we put into each and every creation. Moreover, it is a symbol that inspires us on a daily basis to be caring towards our clients and protect their interests by providing an uncompromising level of service and superior products.`
        let chunk1 = spilitTextIntoChunks(text1, 400);
        let chunk2 = spilitTextIntoChunks(text2, 385);
        let chunk3 = spilitTextIntoChunks(text3, 300);
        setText1(chunk1);
        setText2(chunk2);
        setText3(chunk3);
    }, [])
    return (
        <div>
            {/* our story Section 1  */}
            <div
                style={{
                    backgroundImage: `linear-gradient(to right, rgb(0 0 0 / 20%), rgb(0 0 0 / 20%)), url(${img1})`
                }}
                className="h-[768px] bg-cover object-cover uppercase text-white text-center flex flex-col justify-center gap-[20px] font-normal">
                <p className="leading-4 text-[15px]">About us</p>
                <h3 className="text-[46px] leading-[55px]">OUR STORY</h3>
            </div>

            {/* our story section 2 */}
            <div className="max-w-[1366px] h-[722px] mx-auto px-[80px] grid grid-cols-2 mt-[60px]">
                <div>
                    <img className="w-[588px] h-[722px] object-cover" src={`${img2}`} alt="" />
                </div>
                <div className="flex flex-col justify-between ml-20 text-justify">
                    <h3 className="text-[#AAB0B2] text-4xl uppercase">Background</h3>
                    {
                        text1.map((txt, index) => <P key={index} text={txt}></P>)

                    }
                </div>
            </div>

            {/* our story section 3 */}
            <div className="bg-[#B0BEC5] h-[681px] mt-[107px]">
                <div className="max-w-[1366px] mx-auto h-full px-[80px] py-[75px] grid grid-cols-2">
                    <div className="flex flex-col justify-start gap-8">
                        <h3 className="text-white text-4xl uppercase">Who We Are</h3>
                        <img className="w-[404px] h-[456px] object-cover" src={`${img3}`} alt="" />
                    </div>
                    <div className="flex flex-col justify-center gap-[47px] text-justify">
                        {
                            text2.map((txt, index) => <P key={index} text={txt}></P>)

                        }
                    </div>
                </div>
            </div>

            {/* our story section 4 */}
            <div style={{ backgroundImage: `linear-gradient(to right, rgb(0 0 0 / 80%), rgb(0 0 0 / 80%)), url(${img4})` }}
                className="h-[740px] bg-cover flex items-center">
                <div className="max-w-[720px] mx-auto text-white flex flex-col gap-6">
                    <h3 className="uppercase text-4xl mb-">Our Approach</h3>
                    <p className="text-[16px] leading-[22px]">
                        Acquiring an apartment, a home or even an office space is a person&apos;s life-long dream. This dream drives him or her to accumulate the required finance slowly and gradually, which is the start of shaping this dream into reality. This relentless pursuit of realizing such a dream can flow from generation to generation. But finally when a space is purchased, has anyone thought to what extent this “dream” is actually fulfilled?
                    </p>
                </div>
            </div>

            {/* our story section 5 */}
            <div className="max-w-[1366px] h-[586px] mx-auto px-[80px] py-[52px] text-[#000] grid grid-cols-2">
                <div className="flex flex-col justify-start gap-6">
                    <h3 className="uppercase text-4xl">Our Logo</h3>
                    <img className="w-[406px] h-[406px] object-cover" src={`${img5}`} alt="" />
                </div>
                <div className="flex flex-col justify-center gap-6 text-justify">
                    {
                        text3.map((txt, index) => <P key={index} text={txt}></P>)

                    }
                </div>

            </div>
        </div>
    );
};

export default OurStory;