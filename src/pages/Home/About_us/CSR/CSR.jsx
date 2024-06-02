import { useEffect, useState } from "react";
import PrimaryBanner from "../../../../components/common/PrimaryBanner";
import SecondaryTitle from "../../../../components/common/SecondaryTitle";
import useContextApi from "../../../../hooks/useContextApi";
import P from "../../../../components/sharedComponent/P";
import { Helmet } from "react-helmet";
import Slider from "../../../../components/common/Slider";



const CSR = () => {
    const [csrInfo, setCsrInfo] = useState([]);
    const { AboutUs_CSR, spilitTextIntoChunks } = useContextApi();
    const { bannerImg, csrImages } = AboutUs_CSR;

    const handleSpilitTextIntoChunks = (text, chunkLength) => {
        const chunks = spilitTextIntoChunks(text, chunkLength);
        return chunks;
    }

    useEffect(() => {
        const text = 'As part of its Corporate Social Responsibility (CSR), Shanta Holdings Ltd. is the main founder and primary financier of Ashulia Women and Children Hospital (AWCH). It is a fully philanthropic non-profit hospital located in Beron, Ashulia right on the Tongi -Ashulia-EPZ bypass road. This hospital’s mission is to support the overall development of women and children and the medical needs of the underprivileged segment of society. The Hospital runs and operates under a trust chaired by renowned national pediatrician Prof. Dr. M Q-K Talukder. Mr. Khondoker Monir Uddin, the Managing Director of Shanta, is a member of the Board of Trustees who acts as the chief advisor and counselor to the trust. This hospital has been in operation since 2004, occupying a land area of 3.76 acres with a current built-up area of approximately 250,000 sft. in an 8 storied building. It caters mainly to outpatient services 24 hours x 7 days a week. This 250-bed hospital is equipped with 12 ICUs, 08 HDUs, 12 NICUs, 12 Neonatology and over 100 doctors and physicians of various specialties including a number of senior consultants. The hospital is also equipped ​Dialysis centre, Diagnostic lab, Emergency wing and more, ensuring comprehensive care for our patients. AWCH research programs were initiated to address MDG goals by assisting the government in reducing child mortality and making other improvements. A couple of research findings were submitted to the government of Bangladesh and also published in different international medical journals with appreciation. AWCH has adopted a master plan to construct a Medical College in the near future.'
        const chunk = handleSpilitTextIntoChunks(text, 600);
        setCsrInfo(chunk);
    }, [])

    // this section is used for slider functionality
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const openSlider = (index) => {
        setSelectedImageIndex(index);
    };

    const closeSlider = () => {
        setSelectedImageIndex(null);
    };


    return (
        <div>
            <Helmet>
                <title>
                    CSR | SEA Properties Ltd.
                </title>
            </Helmet>
            {/* AboutUs_CSR_ banner section */}
            <PrimaryBanner
                title={'csr'}
                subTitle={'About us'}
                bannerImg={bannerImg}
                opacity={30}
            ></PrimaryBanner>

            <div className="bg-[#E0F2F2] pt-8 md:pt-16 pb-32 lg:pb-[300px] px-4 md:px-0 space-y-20">
                {/* AboutUs_CSR_ info section  */}
                <div className="max-w-[722px] mx-auto space-y-8 md:space-y-14">
                    <SecondaryTitle
                        text='Corporate Social Responsibility'
                        position="text-left "
                    />
                    <div className="flex flex-col gap-4">
                        {
                            csrInfo.map((txt, index) => <P key={index} text={txt}></P>)
                        }
                        <P text={'Learn More:'}></P>
                        <ul className="text-[#337AB7]">
                            <li><a href="#">www.awchbd.org</a></li>
                            <li><a href="#">https://youtu.be/3-sPE6mI0hE</a></li>
                        </ul>
                    </div>
                </div>

                {/* AboutUs_CSR_ gallery section  */}
                <div className="max-w-[1366px] mx-auto md:px-5 xl:px-20 grid grid-cols-2 md:grid-cols-3">
                    {
                        csrImages.map((img, index) => <img
                            key={index}
                            src={img}
                            onClick={() => openSlider(index)}
                            className="w-full h-[215px] lg:w-[403px] lg:h-[403px] object-cover hover:cursor-pointer hover:contrast-125 transition-all duration-500" />)
                    }
                </div>
            </div>
            {selectedImageIndex !== null && (
                <Slider
                    images={csrImages}
                    selectedIndex={selectedImageIndex}
                    setSelectedImageIndex={setSelectedImageIndex}
                    onClose={closeSlider}
                />
            )}
        </div>
    );
};

export default CSR;