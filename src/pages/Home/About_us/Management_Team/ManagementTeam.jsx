import { useEffect, useState } from "react";
import P from "../../../../components/sharedComponent/P";
import useContextApi from "../../../../hooks/useContextApi";
import SeniorManagerCard from "./SeniorManagerCard";
import SecondaryTitle from "../../../../components/common/SecondaryTitle";
import PrimaryBanner from "../../../../components/common/PrimaryBanner";
import { Helmet } from "react-helmet";


const ManagementTeam = () => {
    const [ceoBioData, setCeoBioData] = useState([]);
    const [teamBioData, setTeamBioData] = useState([]);
    const { AboutUs_ManagementTeamImg, spilitTextIntoChunks } = useContextApi();
    const { bannerImg, CeoImg, SeniorManagerImg, teamImg } = AboutUs_ManagementTeamImg;
    const { img1, img2, img3 } = SeniorManagerImg;

    const handleSpilitTextIntoChunks = (text, chunkLength) => {
        const chunks = spilitTextIntoChunks(text, chunkLength);
        return chunks;
    }

    const managementTeamInfo = {
        ceoInfo: {
            img: CeoImg,
            name: 'MR. M HABIBUL BASIT',
            designation: 'CHIEF EXECUTIVE OFFICER',
            bioData: 'Mr. M Habibul Basit, a well seasoned professional with an illustrious track record, joined Shanta in October 2015 taking up the role of Chief Executive Officer. Prior to joining, Mr. Basit held the position of Managing Director at Archroma Bangladesh Limited for two years, and Chief Operating Officer of Rahimafrooz Accumulators Limited from November 2008 till January 2013. Before Rahimafrooz Mr. Basit worked in Toronto, Canada for Strip Tech, a company specializing in metal stripping and sand blasting. Mr. Basit worked for Rekitt Benckiser in Bangladesh as a Sales Director from January 1998 to July 2001, before which he worked as a National Sales Manager for New Zealand Milk Products, Bangladesh for a span of 4 years. The start of Mr. Basit’s illustrious career was at British American Tobacco, Bangladesh, where he started as a Trainee District Sales Officer in 1985 and went on to become Area Sales & Marketing Manager by 1991. Mr. Basit completed his Masters of Commerce in Marketing from the University of Dhaka, following which he acquired a Post Graduate Diploma in “Marketing Management and Physical Distribution” from Netherlands International Institute for Executive Development, Holland.'
        },
        seniorManagementInfo: [
            {
                img: img1,
                name: 'MR. MD. MUJIBUR RAHMAN',
                designation: 'EXECUTIVE DIRECTOR',
                bioData: 'Mr. Md. Mujibur Rahman is a seasoned management professional with over 35+ years of extensive experience in managing renowned local and multinational organizations. He has been a part of SHL since inception and is currently the Executive Director of Procurement and Legal.'
            },
            {
                img: img2,
                name: 'MR. MD. MUJIBUR RAHMAN',
                designation: 'EXECUTIVE DIRECTOR',
                bioData: 'Mr. Md. Mujibur Rahman is a seasoned management professional with over 35+ years of extensive experience in managing renowned local and multinational organizations. He has been a part of SHL since inception and is currently the Executive Director of Procurement and Legal.'
            },
            {
                img: img3,
                name: 'MR. MD. MUJIBUR RAHMAN',
                designation: 'EXECUTIVE DIRECTOR',
                bioData: 'Mr. Md. Mujibur Rahman is a seasoned management professional with over 35+ years of extensive experience in managing renowned local and multinational organizations. He has been a part of SHL since inception and is currently the Executive Director of Procurement and Legal. '
            }
        ],
        teamInfo: {
            img: teamImg,
            bioData: 'The hidden sutra for successfully turning dreams into reality is our regular practice. One segment of our human force is deployed to bridge the extreme aspirations of our consumers, while the other segment actually builds the dreams. To achieve the ultimate mission of maximizing lifestyle and potential, Shanta Holdings gathers widely experienced professionals, trained both at home and abroad. We have more than 200 full-time employees, who represent a vast spectrum of development, management and construction disciplines. Well-balanced personnel from both business and technical backgrounds are continuously thriving to fulfil the mission of Shanta.'
        }

    }

    const { ceoInfo, seniorManagementInfo, teamInfo } = managementTeamInfo;

    useEffect(() => {
        let chunk1 = handleSpilitTextIntoChunks(ceoInfo?.bioData, 600);
        let chunk2 = handleSpilitTextIntoChunks(teamInfo?.bioData, 400);
        setCeoBioData(chunk1);
        setTeamBioData(chunk2);
    }, [])
    return (
        <div className="pb-28">
            <Helmet>
                <title>
                    Management Team | Sea Properties ltd
                </title>
            </Helmet>
            {/* management team Section 1 */}
            <PrimaryBanner
                bannerImg={bannerImg}
                opacity={30}
                title="Manegement Team"
                subTitle="About us"
            />

            <div className="max-w-[1366px] mx-auto mt-[35px] lg:mt-[100px] xl:mt-[120px] px-6 lg:px-[40px] xl:px-[60px]">
                {/* management team Section 2 */}
                <div className="space-y-5 md:space-y-0 lg:space-y-10">
                    <SecondaryTitle text={'Ceo'}></SecondaryTitle>
                    <div className="md:grid grid-cols-2 flex flex-col gap-6 md:gap-0">
                        <figure className="flex items-center justify-center md:justify-start">
                            <img className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[505px] xl:h-[505px] object-cover" src={ceoInfo?.img} alt="" />
                        </figure>
                        <div className="flex flex-col justify-center gap-6">
                            <div className="uppercase space-y-2">
                                <h3 className="text-[#000] text-[18px] leading-[22px] font-medium">{ceoInfo?.name}</h3>
                                <p className="text-[#7F7B79] text-[15px] leading-4">{ceoInfo?.designation}</p>
                            </div>
                            <div className="flex flex-col gap-10">
                                {
                                    ceoBioData.map((txt, index) => <P key={index} text={txt} size={'text-sm lg:text-[16px]'} lineHeight={'lg:leading-[22px]'}></P>)
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* management team section 3 'senior management team' */}
                <div className="mt-[40px] lg:mt-[60px] space-y-10">
                    <SecondaryTitle text={`Senior Management`}></SecondaryTitle>
                    <div className="grid md:grid-cols-2 lg:flex justify-between gap-x-5 gap-y-10 lg:gap-10">
                        {
                            seniorManagementInfo.map((data, index) => <SeniorManagerCard key={index} data={data}></SeniorManagerCard>)
                        }
                    </div>
                </div>

                {/* management team section 4 'our team' */}
                <div className="mt-[60px] space-y-10">
                    <SecondaryTitle text={`Our Team`}></SecondaryTitle>
                    <div className="space-y-8">
                        <figure>
                            <img className="w-full object-cover" src={teamInfo?.img} alt="" />
                        </figure>
                        <div className="space-y-6">
                            {
                                teamBioData.map((txt, index) => <P key={index} text={txt} size={'text-sm lg:text-[16px]'} lineHeight={'lg:leading-[22px]'}></P>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagementTeam;