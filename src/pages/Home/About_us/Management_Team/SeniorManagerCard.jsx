import { useEffect, useState } from "react";
import useContextApi from "../../../../hooks/useContextApi";
import P from "../../../../components/sharedComponent/P";

const SeniorManagerCard = ({data}) => {
    const { name, designation, img, bioData } = data;
    const [BioData, setBioData] = useState([]);
    const { spilitTextIntoChunks } = useContextApi();

    const handleSpilitTextIntoChunks = (text, chunkLength) => {
        const chunks = spilitTextIntoChunks(text, chunkLength);
        return chunks;
    }
    useEffect(() => {
        let chunk = handleSpilitTextIntoChunks(bioData, 200);
        setBioData(chunk);
    }, [])
    return (
        <div className="md:w-[350px] lg:w-[400px] space-y-8 justify-self-center">
            <figure className="flex items-center justify-center md:justify-start">
                <img className="w-full h-[450px] lg:h-[500px] object-cover" src={img} alt="" />
            </figure>
            <div className="flex flex-col justify-center gap-10">
                {name && designation &&
                    <div className="uppercase space-y-2">
                        <h3 className="text-[#000] text-[18px] leading-[22px] font-medium">{name}</h3>
                        <p className="text-[#7F7B79] text-[14px] leading-4">{designation}</p>
                    </div>
                }
                <div className="flex flex-col gap-6">
                    {
                        BioData.map((txt, index) => <P key={index} text={txt} size={'text-sm lg:text-[16px]'} lineHeight={'lg:leading-[22px]'}></P>)
                    }
                </div>
            </div>
        </div>
    );
};

export default SeniorManagerCard;