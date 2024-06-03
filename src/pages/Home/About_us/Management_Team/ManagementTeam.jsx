import { useEffect, useState } from "react";
import useContextApi from "../../../../hooks/useContextApi";
import SeniorManagerCard from "./SeniorManagerCard";
import SecondaryTitle from "../../../../components/common/SecondaryTitle";
import PrimaryBanner from "../../../../components/common/PrimaryBanner";
import { Helmet } from "react-helmet";
import md_kamruzzaman from './1.jpg';
import harunor_rashid from './2.jpg';
import hedayet_khan from './3.jpg';
import md_fiaz_ahmed_rifath from './4.png';
import wasif_ahmed from './5.jpg';
import imran_sarkar_jony from './6.jpg';
import ruma_akter from './7.jpg';
import fardaus_rahman from './8.jpg';
import md_rahat_hasan from './9.jpg';
import saif_bin_nabi from './10.jpg';
import md_tarequr_rahman from './11.jpg';
import ss from '../Management_Team/team.jpg';



const ManagementTeam = () => {
    const team = [
        {
            "name": "Md. Kamruzzaman",
            "image": md_kamruzzaman,
            "designation": "IT & Branding",
            "position": "Senior Manager"
        },
        {
            "name": "Harunor Rashid",
            "image": harunor_rashid,
            "designation": "Digital marketing",
            "position": "Manager"
        },
        {
            "name": "Hedayet Khan",
            "image": hedayet_khan,
            "designation": "Accounts",
            "position": "Manager"
        },
        {
            "name": "Md. Fiaz Ahmed Rifath",
            "image": md_fiaz_ahmed_rifath,
            "designation": "Sales & marketing",
            "position": "Deputy Manager"
        },
        {
            "name": "Wasif Ahmed",
            "image": wasif_ahmed,
            "designation": "Sales & marketing",
            "position": "Assistant Manager"
        },
        // {
        //     "name": "Imran Sarkar Jony",
        //     "image": imran_sarkar_jony,
        //     "designation": "Sales & marketing",
        //     "position": "Assistant Manager"
        // },
        {
            "name": "Ruma Akter",
            "image": ruma_akter,
            "designation": "Sales & marketing",
            "position": "Senior Executive"
        },
        {
            "name": "Fardaus Rahman",
            "image": fardaus_rahman,
            "designation": "Sales & marketing",
            "position": "Senior Executive"
        },
        {
            "name": "Md. Rahat Hasan",
            "image": md_rahat_hasan,
            "designation": "Sales & marketing",
            "position": "Executive"
        },
        {
            "name": "Saif Bin Nabi",
            "image": saif_bin_nabi,
            "designation": "Sales & marketing",
            "position": "Executive"
        },
        {
            "name": "Md. Tarequr Rahman",
            "image": md_tarequr_rahman,
            "designation": "Legal Affairs",
            "position": "Legal Advisor"
        }
    ]

    const li1 = [];
    const li2 = [];
    const li3 = [];


    team.forEach((testimonial, index) => {
        if ((index % 3) === 0) {
            li1.push(testimonial);
        } else if ((index % 3) === 1) {
            li2.push(testimonial);
        } else {
            li3.push(testimonial);
        }
    });

    return (
        <div className="pb-28">
            <Helmet>
                <title>
                    Management Team | SEA Properties Ltd.
                </title>
            </Helmet>
            {/* management team Section 1 */}
            <PrimaryBanner
                bannerImg={ss}
                opacity={30}
                title="Management Team"
                subTitle="About us"
            />
            <div class=" bg-gray-100">
                <div class="container px-6 py-10 mx-auto">
                    <h1 class="text-2xl font-semibold text-center text-[gray] capitalize lg:text-3xl dark:text-white">Meet Our Management Team</h1>

                    <div class="flex justify-center mx-auto mt-6">
                        <span class="inline-block w-40 h-1 bg-[#C91835] rounded-full"></span>
                        <span class="inline-block w-3 h-1 mx-1 bg-[#C91835] rounded-full"></span>
                        <span class="inline-block w-1 h-1 bg-[#C91835] rounded-full"></span>
                    </div>

                    <p class="max-w-5xl mx-auto mt-6 text-center text-gray-500 dark:text-gray-300">
                        Our team is dedicated to excellence and innovation. With a wealth of experience and a passion for success, they lead our organization with integrity and vision. Each member brings unique skills and perspectives, ensuring we remain at the forefront of our industry.
                    </p>
                </div>
            </div>


            <div className="max-w-[1366px] mx-auto  px-6 lg:px-[40px] xl:px-[60px]">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {team.map((item) => <ProfileCard {...item} />)}
                </div>
            </div>
        </div>
    );
};



const ProfileCard = ({ href, image, alt, name, position, designation }) => (
    <div className="h-[32rem]  ">
        <div class="flex flex-col items-center p-4  sm:p-6 rounded-xl bg-[#B0BEC5]  ">
            <img class="object-cover w-full shadow-2xl  rounded-xl aspect-square" src={image} alt="" />

            <h1 class="mt-4 text-2xl font-semibold text-[#C91835] capitalize ">{name}</h1>

            <p class="mt-2 text-gray-500  text-xl capitalize dark:text-gray-300">{position}</p>

            <p className="text-[17px] capitalize">{designation}</p>
        </div>

    </div>
);

const ProfileList = ({ profiles }) => (
    <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {profiles.map((profile, index) => (
            <ProfileCard key={index}  {...profile} />
        ))}
    </ul>
);

export default ManagementTeam;