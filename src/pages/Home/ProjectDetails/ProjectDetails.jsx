import { useEffect, useState } from "react";
import SecondaryBanner from "../../../components/common/SecondaryBanner";
import SecondaryTitle from "../../../components/common/SecondaryTitle";
import { IoLogoYoutube } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
    const [visible, setVisible] = useState(false);
    const [projectData, setProjectData] = useState({});
    const { id } = useParams();
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/src/pages/Home/ProjectDetails/projectInfo.json');
                const data = await response.json();
                const singleData = data.filter(item => item?._id === id);
                setProjectData(singleData[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])

    const { _id, title, address, bannerImg, projectInfoImg, projectFeatureImg, contactPageImg, projectInfo, projectFeatures, galleryImages, projectVideo, mapLink } = projectData;

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const message = form.message.value;

        const data = {
            _id,
            name,
            email,
            phone,
            message
        }
        console.log(data);
        form.reset()
    }
    return (
        <div className={`${visible && 'overflow-hidden'}`}>
            <SecondaryBanner
                bannerImg={bannerImg}
                opacity={40}
                projectName={title}
                location={address}
            />
            {/*  project info  */}
            <div className="max-w-[1366px] mx-auto py-10 px-4 md:px-8 xl:px-20 grid md:grid-cols-2 gap-6 md:gap-0 bg-white ">
                <figure className="flex items-center">
                    <img className="w-[575px] h-[527px] object-cover" src={projectInfoImg} alt="" />
                </figure>
                <div className="md:pl-20 xl:pl-[164px]">
                    <SecondaryTitle
                        text='At a Glance'
                        position="text-left"
                    />
                    <div className="space-y-5 mt-[60px]">
                        <p>Land Area: {projectInfo?.landArea}</p>
                        <p>Architect : {projectInfo?.architectName}</p>
                        <p>Orientation of the Land: {projectInfo?.orientationOfLand}</p>
                        <p>Number of Floors: {projectInfo?.floorsNumber}</p>
                        <p>Front Road: {projectInfo?.frontRoad}</p>
                        <p>Number of Apartments: {projectInfo?.numberOfApartment}</p>
                        <p>Size of the Units: {projectInfo?.unitsSize}</p>
                        <p>Number of Basements: {projectInfo?.numberOfBasements}</p>
                        <p>Number of Car Parking: {projectInfo?.numberOfCarParking}</p>
                    </div>
                    <button className="py-[9px] px-[32px] text-[#6D6E71] border-[3px] border-[#6D6E71] mt-6">
                        Expand
                    </button>
                </div>
            </div>

            {/* project features */}
            <div className="bg-black">
                <div className="max-w-[1366px] mx-auto py-20 px-4 md:px-8 xl:px-20 grid md:grid-cols-2 gap-6 md:gap-0">
                    <div className="">
                        <SecondaryTitle
                            text='Features & Amenities'
                            position="text-left"
                        />
                        <div className="space-y-5 mt-[60px] text-white">
                            {
                                projectFeatures?.map((feature, index) => <p key={index}>{feature}</p>)
                            }
                        </div>
                        <button className="py-[9px] px-[32px] text-white border-[3px] border-white  mt-6">
                            Explore
                        </button>
                    </div>
                    <figure className="justify-self-end flex items-center">
                        <img className="w-[465px] h-[490px] object-cover" src={projectFeatureImg} alt="" />
                    </figure>
                </div>
            </div>

            {/* gallery section */}
            <div className="max-w-[1366px] mx-auto px-6 lg:px-10 xl:px-20 py-6 md:py-[55px]">
                <SecondaryTitle
                    text='Gallery'
                    position="text-left"
                />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 xl:gap-[60px] mt-7">
                    {
                        galleryImages?.map((image, index) => <img key={index} src={image} className="md:w-[300px] md:h-[310px] lg:w-[365px] lg:h-[375px] object-cover" />)
                    }
                </div>
            </div>

            {/* video section */}
            <div className="bg-black flex justify-center items-center py-12 md:py-20 lg:py-[100px]">
                <div className="space-y-8 w-[80%] md:w-fit">
                    <h3 className="text-[35px] text-white uppercase">Video Tour</h3>
                    <figure
                        style={{
                            backgroundImage: `linear-gradient(to right, rgb(0 0 0 / 30%), rgb(0 0 0 / 30%)), url(${projectVideo?.videoThumbnail}})`
                        }}
                        className="h-[300px] md:w-[650px] md:h-[400px] lg:w-[934px] lg:h-[480px] border-4 border-[#FCF4F4] rounded-[10px] bg-cover flex justify-center items-center hover:cursor-pointer"
                        onClick={() => setVisible(true)}
                    >
                        <IoLogoYoutube className="text-6xl text-red-600" />
                    </figure>
                </div>
            </div>

            {/* video modal */}
            {
                visible &&
                <div className={`fixed top-0 w-screen h-screen bg-black flex justify-center items-center z-[1000]`}>
                    <div className="w-[935px] h-[480px]">
                        <iframe
                            width="100%"
                            height="100%"
                            src={projectVideo?.videoUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        />
                    </div>
                    <button onClick={() => setVisible(false)} className="text-gray-400 absolute top-6 right-8">
                        <IoMdClose className="text-3xl" />
                    </button>
                </div>
            }

            {/* project location */}
            <div className="h-[500px] lg:h-[650px]">
                <iframe
                    width="100%"
                    height='100%'
                    src={mapLink}
                />
            </div>

            {/* Contact form */}
            <div className="bg-[#B0BEC5] py-16 lg:py-[85px]">
                <div className="max-w-[1366px] mx-auto px-6 md:px-10 xl:px-[60px] text-white grid md:grid-cols-2">
                    <div className="space-y-10">
                        <h2 className="text-[27px] md:text-[37px] uppercase">Book Now</h2>
                        <img className="md:w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] object-cover" src={contactPageImg} alt="" />
                    </div>
                    <div className="flex items-center">
                        <form onSubmit={handleSubmit} className="space-y-4 mt-10 w-full">
                            <div>
                                <p>Name*</p>
                                <input
                                    type="text" name="name"
                                    required
                                    autoComplete="off"
                                    className="w-full bg-transparent focus:outline-none pt-3 px-1 border-b-[1px] border-[#FFFFFF40] text-white font-roboto font-light"
                                />
                            </div>
                            <div>
                                <p>Enter your Email</p>
                                <input
                                    type="text" name="email"
                                    autoComplete="off"
                                    className="w-full bg-transparent focus:outline-none pt-3 px-1 border-b-[1px] border-[#FFFFFF40] text-white font-roboto font-light"
                                />
                            </div>
                            <div>
                                <p>Contact Number*</p>
                                <input
                                    type="text" name="phone"
                                    required
                                    autoComplete="off"
                                    className="w-full bg-transparent focus:outline-none pt-3 px-1 border-b-[1px] border-[#FFFFFF40] text-white font-roboto font-light"
                                />
                            </div>
                            <div>
                                <p>Message</p>
                                <input
                                    type="text" name="message"
                                    required
                                    autoComplete="off"
                                    className="w-full bg-transparent focus:outline-none pt-16 px-1 border-b-[1px] border-[#FFFFFF40] text-white font-roboto font-light"
                                />
                            </div>

                            <div className="pt-6">
                                <input type="submit" value="Book Now" className="py-[9px] px-[28px] border-[3px] border-white hover:cursor-pointer" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails; 