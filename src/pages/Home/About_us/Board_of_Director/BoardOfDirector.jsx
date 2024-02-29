import { useEffect, useState } from "react";
import useContextApi from "../../../../hooks/useContextApi";
import P from "../../../../components/sharedComponent/P";


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
        let text1 = 'A distinguished and perceptive entrepreneur, Mr. Khondoker Monir Uddin, the founder promoter of Shanta, opts to do business by providing world-class products and services in Bangladesh. With his visionary leadership and extensive business knowledge, Shanta drives forward to not only provide superior quality products and services but to demonstrate unparalleled foresight by developing iconic projects which are the epitome of modern architecture, safe, functional and comfortable living. The reputation and success of Shanta are testaments to his strong ethics and relentless focus on quality, innovation and social responsibility. Mr. Monir completed both his Bachelors with honors and Masters degrees from the Department of Accounting, University of Dhaka. Over the past three decades, he has established Shanta as one of the leading corporate houses in Bangladesh, with successful investments in diversified sectors and thus has been continually recognized as a Commercially Important Person (CIP) by the Government of Bangladesh since 2000 till date. Mr. Monir is also a founder and Managing Director of the prestigious STS Group - which revolutionized the healthcare and education sectors of the country by establishing international standard institutions like Evercare Hospital Dhaka (previously Apollo Hospitals Dhaka), Evercare Hospital Chattogram, International School Dhaka (ISD), the DPS STS schools and Glenrich International School. He is also a sponsor Director and former Chairman of Dhaka Bank Limited, and the Managing Director of Shanta Securities Limited.';
        let text2 = 'Mrs. Jasmine Sultana, wife of Mr. Khondoker Monir Uddin, obtained her Bachelor’s degree from the University of Dhaka and has been a key stakeholder behind the success of Shanta Holdings Limited over the past decades. She is an experienced entrepreneur with a long track record and is also ex-Chairperson of Dhaka Bank Limited. She is also recognized as a Commercially Important Person (CIP) by the Government of Bangladesh for her contributions. Under her strong leadership and entrepreneurial spirit, Shanta has become one of the leading real estate developers in the country.';
        let text3 = 'Mr. Saif Khondoker completed his BBA with a specialization in Strategic Management from the University of Toronto, and his MBA from the prestigious Rotman School of Management, University of Toronto. He is also a certified Project Management Professional (PMP)®. Under his leadership, Shanta strives to strengthen its strategic marketing and branding, enhance operational efficiencies, and incorporate state-of-the-art technologies and best practices. Moreover, his focus on quality and driving product innovation by incorporating modern features into Shanta projects continue to truly differentiate it from competitors, ensuring it remains unparalleled in design and quality. Under his leadership, Shanta strives to strengthen its strategic marketing and branding, enhance operational efficiencies, and incorporate state-of-the-art technologies and best practices. Moreover, his focus on quality and driving product innovation by incorporating modern features into Shanta projects continue to truly differentiate it from competitors, ensuring it remains unparalleled in design and quality.';
        let text4 = 'Ms. Mayesha Khondoker is the Founding Director of Shanta Lifestyle and Managing Director of Shanta Multiverse. Ms. Khondoker completed her Bachelor of Commerce (BCom) with Specialized Honors in Marketing from York University, and is currently completing her MBA from University of Warwick’s prestigious Warwick Business School. Prior to joining Shanta, Ms. Khondoker was the Head of Marketing at Evercare Hospitals Dhaka where she led the development of an in-house communications team which drove the robust rebranding and modernization of the hospital in 2014. Under her leadership, the team increased hospital revenue by 120%. During her time at Evercare Hospital, Ms. Khondoker developed the Child Development Centre, Bangladesh’s first private hospital pediatric department that specializes in the treatment and physiotherapy of children with disabilities and mental health issues. Ms. Khondoker also led the redesign of the paediatric ward and established a paediatric ER room, which were more interactive and child-friendly. In 2016, Ms. Khondoker founded Shanta Multiverse Ltd and The White Canary Cafe chain. The firm now operates 5 locations across the capital. In 2020, she founded Shanta Lifestyle Ltd alongside our Managing Director. A division of Shanta that provides complete interior design solutions and does so in direct partnership with renowned architects and international lifestyle brands Natuzzi, Molteni & C, Lixil, Lutron, Cattelan Italia and more.';
        let chunk1 = handleSpilitTextIntoChunks(text1, 900);
        let chunk2 = handleSpilitTextIntoChunks(text2, 600);
        let chunk3 = handleSpilitTextIntoChunks(text3, 500);
        let chunk4 = handleSpilitTextIntoChunks(text4, 500);
        setText1(chunk1);
        setText2(chunk2);
        setText3(chunk3);
        setText4(chunk4);
    }, [])
    return (
        <div className="pb-[70px]">
            {/* board of director Section 1  */}
            <div
                style={{
                    backgroundImage: `linear-gradient(to right, rgb(0 0 0 / 20%), rgb(0 0 0 / 20%)), url(${img1}})`
                }}
                className="h-[400px] md:h-[500px] lg:h-[768px] bg-cover bg-center object-cover uppercase text-white text-center flex flex-col justify-center gap-[20px] font-normal">
                <p className="leading-4 text-[15px]">About us</p>
                <h3 className="text-[24px] md:text-[46px] md:leading-[55px]">Vision Mission & Values</h3>
            </div>

            {/* board of director Section 2  */}
            <div className="max-w-[1366px] mx-auto mt-[80px] lg:mt-[100px] xl:mt-[120px] px-[40px] xl:px-[60px] md:grid grid-cols-2 flex flex-col gap-6 md:gap-0">
                <figure className="flex items-center justify-center md:justify-start">
                    <img className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[505px] xl:h-[505px] object-cover" src={img2} alt="" />
                </figure>
                <div className="flex flex-col justify-center gap-6">
                    <div className="uppercase space-y-2">
                        <h3 className="text-[#000] text-[18px] leading-[22px] font-medium">MR. KHONDOKER MONIR UDDIN</h3>
                        <p className="text-[#7F7B79] text-[14px] leading-4">MANAGING DIRECTOR</p>
                    </div>
                    <div className="flex flex-col gap-10">
                        {
                            text1.map((txt, index) => <P key={index} text={txt} size={'text-sm lg:text-[16px]'} lineHeight={'lg:leading-[22px]'}></P>)

                        }
                    </div>
                </div>
            </div>

            {/* board of director Section 3 */}
            <div className="max-w-[1366px] mx-auto mt-[60px] px-[40px] xl:px-[60px] md:grid grid-cols-2 flex flex-col-reverse md:flex-col gap-6 md:gap-0">
                <div className="flex flex-col justify-center gap-6">
                    <div className="uppercase text-right space-y-2">
                        <h3 className="text-[#000] text-[18px] leading-[22px] font-medium">MRS. JASMINE SULTANA</h3>
                        <p className="text-[#7F7B79] text-[14px] leading-4">Director</p>
                    </div>
                    <div className="flex flex-col gap-10">
                        {
                            text2.map((txt, index) => <P key={index} text={txt} size={'text-sm lg:text-[16px]'} lineHeight={'lg:leading-[22px]'}></P>)

                        }
                    </div>
                </div>
                <figure className="flex items-center justify-center md:justify-end">
                    <img className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[505px] xl:h-[505px] object-cover" src={img3} alt="" />
                </figure>
            </div>

            {/* board of director Section 4 */}
            <div className="max-w-[1366px] mx-auto mt-[60px] px-[40px] xl:px-[60px] md:grid grid-cols-2 flex flex-col gap-6 md:gap-0">
                <figure className="flex justify-center md:justify-start">
                    <img className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[505px] xl:h-[505px] object-cover" src={img4} alt="" />
                </figure>
                <div className="flex flex-col justify-center gap-6">
                    <div className="uppercase space-y-2">
                        <h3 className="text-[#000] text-[18px] leading-[22px] font-medium">MR. SAIF KHONDOKER</h3>
                        <p className="text-[#7F7B79] text-[14px] leading-4">Director</p>
                    </div>
                    <div className="flex flex-col gap-10">
                        {
                            text3.map((txt, index) => <P key={index} text={txt} size={'text-sm lg:text-[16px]'} lineHeight={'lg:leading-[22px]'}></P>)

                        }
                    </div>
                </div>
            </div>

            {/* board of director Section 5 */}
            <div className="max-w-[1366px] mx-auto mt-[60px] px-[40px] xl:px-[60px] md:grid grid-cols-2 flex flex-col-reverse md:flex-col gap-6 md:gap-0">
                <div className="flex flex-col justify-center gap-6">
                    <div className="uppercase text-right space-y-2">
                        <h3 className="text-[#000] text-[18px] leading-[22px] font-medium">MS. MAYESHA KHONDOKER</h3>
                        <p className="text-[#7F7B79] text-[14px] leading-4">Director</p>
                    </div>
                    <div className="flex flex-col gap-10">
                        {
                            text4.map((txt, index) => <P key={index} text={txt} size={'text-sm lg:text-[16px]'} lineHeight={'lg:leading-[22px]'}></P>)

                        }
                    </div>
                </div>
                <figure className="flex items-center justify-center md:justify-end">
                    <img className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[505px] xl:h-[505px] object-cover" src={img5} alt="" />
                </figure>
            </div>
        </div>
    );
};

export default BoardOfDirector;