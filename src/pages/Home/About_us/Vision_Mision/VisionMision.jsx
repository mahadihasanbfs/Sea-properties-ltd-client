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
                <div className="max-w-[1366px] mx-auto px-5 xl:px-[200px] pt-[120px] pb-40   font-medium text-justify">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-28">
                        <div className="w-full md:w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] bg-gradient-to-r from-blue-400 to-purple-500 text-white text-center border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                            <div className="flex items-center justify-center h-full">
                                <h1 className="text-5xl font-bold">Vision</h1>
                            </div>
                        </div>
                        <div className="max-w-[500px] mx-auto p-4">
                            <p className="text-gray-700 mb-6">Our vision is make a trust, quality and integrity which is the prime role of the business. We at SEA properties Ltd. ensure to build space that is a blend of comfort and convenience. We strive to delver sustainable and innovative design with uncompromised quality on time delivery.
                            </p>

                        </div>
                    </div>
                    <div className="flex flex-col py-10 md:flex-row-reverse justify-center items-center gap-16 md:gap-28">
                        <div className="w-full  md:w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] bg-gradient-to-r from-blue-400 to-purple-500 text-white text-center border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                            <div className="flex items-center justify-center h-full">
                                <h1 className="text-5xl font-bold">Mission</h1>
                            </div>
                        </div>
                        <div className="max-w-[500px] mx-auto p-4">
                            <h1 className="text-xl font-bold mb-4">For Our Residents:</h1>
                            <p className="text-gray-700 mb-6">Every element, from the coziness of contemporary amenities to the coziness of classic design, is thoughtfully designed with our residents' comfort and happiness in mind. Here, their investment is in a lifestyle that embraces genuineness and provides unmatched value rather than merely real estate.</p>
                            <h1 className="text-xl font-bold mb-4">For Our Team:</h1>
                            <p className="text-gray-700 mb-6">Our team members are valued members of a caring community at SEA Properties Ltd; not just coworkers. By providing them with opportunities for personal development, mentoring, and training, we enable them to realize their greatest potential.</p>
                            <h1 className="text-xl font-bold mb-4">For Our Partners:</h1>
                            <p className="text-gray-700 mb-6">Purchasing an investment in SEA Properties Ltd is more than simply a financial decision; it's about joining forces with a group of people dedicated to generating steady returns. By utilizing market data and cultivating trust via transparent communication, together with financial gains, partners who work with us...</p>
                        </div>
                    </div>
                    <div className="flex flex-col py-10 md:flex-row justify-center items-center gap-16 md:gap-28">
                        <div className="w-full  md:w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] bg-gradient-to-r from-blue-400 to-purple-500 text-white text-center border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                            <div className="flex items-center justify-center h-full">
                                <h1 className="text-5xl font-bold">Values</h1>
                            </div>
                        </div>
                        <div className="max-w-[500px] mx-auto p-4">
                            <h1 className="text-xl font-bold mb-4">Client Fulfilled:</h1>
                            <p className="text-gray-700 mb-6">Getting our clients happy and fulfilled is our first concern. We're committed to providing outstanding service, going above and beyond, and establishing solid, long-lasting bonds of openness and trust.</p>
                            <h1 className="text-xl font-bold mb-4">People First:</h1>
                            <p className="text-gray-700 mb-6">Every person has worth and potential. We put our team members', clients', and partners' welfare, growth, and empowerment first, creating a welcoming and encouraging atmosphere where everyone can succeed.</p>
                            <h1 className="text-xl font-bold mb-4">Uncompromising Quality:</h1>
                            <p className="text-gray-700 mb-6">The characteristic of our work is quality. Our commitment to quality control, honesty, and meticulousness means that we hold ourselves to the greatest standards, making sure that every good and service we provide either meets or beyond expectations.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisionMision;