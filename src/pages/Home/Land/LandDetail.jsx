/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import SecondaryBanner from "../../../components/common/SecondaryBanner";
import SecondaryTitle from "../../../components/common/SecondaryTitle";
import { IoLogoYoutube } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useParams } from "react-router-dom";
import { FaBath, FaBed, FaBuilding, FaLocationDot } from "react-icons/fa6";
import { FaPencilRuler } from "react-icons/fa";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { MdOutlineHomeWork } from "react-icons/md";
import { BiSolidCollection } from "react-icons/bi";
import AlertModal from "../../../hooks/useAlertModal";
// import DetailShet from "./DetailShet";
import Swal from "sweetalert2";
import ReactPlayer from 'react-player'
import vrImg from '../../../assets/vr.jpg'
import VideoPlayer from "../../../components/common/VideoPlayer";
import { CiParking1 } from "react-icons/ci";
import { BsBuilding, BsCollection } from "react-icons/bs";
import { IoIosResize } from "react-icons/io";
import { MdApartment } from "react-icons/md";
import { TiChartAreaOutline } from "react-icons/ti";
import { CiLocationOn } from "react-icons/ci";
import { LiaHandshake } from "react-icons/lia";
import { Helmet } from "react-helmet";
import Slider from "../../../components/common/Slider";

const LandDetails = () => {
    // const [visible, setVisible] = useState(false);
    const [projectData, setProjectData] = useState({});
    const { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const [vr, setVr] = useState(false);
    const [on, setOn] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://backend.seapropertiesltd.com.bd/api/v1/admin/land/get-land?land_id=${id}`);
                const data = await response.json();
                // const singleData = data.filter(item => item?._id === id);
                setProjectData(data?.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [id])


    // this section is used for slider functionality
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [loading, setLoading] = useState(null);

    const openSlider = (index) => {
        setSelectedImageIndex(index);
    };

    const closeSlider = () => {
        setSelectedImageIndex(null);
    };

    const { _id, conditionStatus,
        vr_status, vr_url, name, banner_img, videoThumbnailImgUpload,
        youtube_url, contactPageImg, project_status, projectInfo, projectFeatures, gallery_img, project_photo, projectVideo, map_link, featureInfo, details } = projectData;



    const handleSubmit = (event) => {
        setLoading(true)
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
            message,
            date: new Date()
        }


        fetch('https://backend.seapropertiesltd.com.bd/api/v1/admin/booking/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => res.json()).then((data) => {
            setLoading(false)
            Swal.fire('Booking successfully added', '', 'success');
            // navigate('/admin/project-management');
            form.reset()
        })
    }
    function extractSrcFromIframe(iframeTag) {
        var startIdx = iframeTag.indexOf('src="') + 'src="'.length;
        var endIdx = iframeTag.indexOf('"', startIdx);
        var srcValue = iframeTag.substring(startIdx, endIdx);
        return srcValue;
    }


    return (
        <div className={`overflow-hidden`}>
            <Helmet>
                <title>
                    {name ?? ''} | SEA Properties Ltd.
                </title>
            </Helmet>
            <SecondaryBanner
                bannerImg={
                    project_photo}
                opacity={40}

                projectName={name}
                location={details?.info?.address}
                status={project_status}
            />
            {/* <MetaHelmet title={name} description={details?.info?.address} ogTitle={name} ogDescription={projectInfo} ogImage={banner_img} /> */}
            {/*  projec  t info  */}

            {/* project features */}
            <div className="bg-black">
                <div className="gap-6 md:gap-0 grid md:grid-cols-2 mx-auto px-4 md:px-8 xl:px-20 py-12 max-w-[1366px]">
                    <div className="">
                        <SecondaryTitle
                            text='Land Features'
                            position="text-left"
                        />
                        <figure className="flex justify-self-end items-center md:hidden mt-4 md:mt-0">
                            <img className="w-[465px] h-[490px] object-cover" src={featureInfo?.features_img} alt="" />
                        </figure>

                        <div className="space-y-5 mt-4 md:mt-[60px] text-white">
                            {
                                featureInfo?.features && featureInfo?.features?.map((feature, index) => <p key={index}>{feature?.label}</p>)
                            }
                        </div>
                        {/* <button className="border-[3px] border-white mt-6 px-[32px] py-[9px] text-white">
                            Explore
                        </button> */}
                    </div>
                    <figure className="md:flex justify-self-end items-center hidden">
                        <img className="w-[465px] h-[490px] object-cover" src={featureInfo?.features_img} alt="" />
                    </figure>
                </div>
            </div>

            {/* gallery section */}
            <div className="mx-auto px-6 lg:px-10 xl:px-20 py-6 md:py-[55px] max-w-[1366px]">
                <SecondaryTitle
                    text='Gallery'
                    position="text-left"
                />
                <div className="gap-4 lg:gap-8 xl:gap-[60px] grid grid-cols-2 md:grid-cols-3 mt-7">
                    {
                        gallery_img?.map((image, index) => <img
                            key={index}
                            src={image}
                            onClick={() => openSlider(index)}
                            className="md:w-[300px] lg:w-[365px] md:h-[310px] lg:h-[375px] transition-all duration-500 hover:cursor-pointer object-cover hover:contrast-125" />)
                    }
                </div>
            </div>


            {/* gallery slider view*/}
            {selectedImageIndex !== null && (
                <Slider
                    images={gallery_img}
                    selectedIndex={selectedImageIndex}
                    setSelectedImageIndex={setSelectedImageIndex}
                    onClose={closeSlider}
                />
            )}


            {/* Contact form */}
            <div className="bg-[#B0BEC5] py-16 lg:py-[85px]">
                <div className="gap-10 grid md:grid-cols-2 mx-auto px-6 md:px-10 xl:px-[60px] max-w-[1366px] text-white">
                    <div className="md:block relative space-y-10 hidden">
                        <img className="shadow-dark shadow-lg rounded w-full h-full object-cover" src={projectData?.banner_img} alt="" />
                    </div>
                    <div className="flex items-center">
                        <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4 w-full">
                            <h2 className="text-[20px] md:text-[37px] uppercase">Book Now</h2>
                            <div className="block space-y-16 md:hidden py-4">
                                <img className="shadow-dark shadow-lg rounded object-fill" src={projectData?.banner_img} alt="" />

                            </div>
                            <div>
                                <p>Name*</p>
                                <input
                                    type="text" name="name"
                                    required
                                    // autoComplete="off"
                                    className="border-[#FFFFFF40] bg-transparent mt-1 px-2 py-2 border-b-[1px] w-full focus:outline-none p-1 rounded font-light font-roboto text-white"
                                />
                            </div>
                            <div>
                                <p>Enter your Email</p>
                                <input
                                    type="text" name="email"
                                    autoComplete="off"
                                    className="border-[#FFFFFF40] bg-transparent mt-1 px-2 py-2 border-b-[1px] w-full focus:outline-none p-1 rounded font-light font-roboto text-white"
                                />
                            </div>
                            <div>
                                <p>Contact Number*</p>
                                <input
                                    type="text" name="phone"
                                    required
                                    autoComplete="off"
                                    className="border-[#FFFFFF40] bg-transparent mt-1 px-2 py-2 border-b-[1px] w-full focus:outline-none p-1 rounded font-light font-roboto text-white"
                                />
                            </div>
                            <div>
                                <p>Message</p>
                                <textarea
                                    rows="5"
                                    type="text" name="message"
                                    required
                                    // autoComplete="off"
                                    className="border-[#FFFFFF40] bg-transparent mt-1 px-2 py-2 border-b-[1px] w-full focus:outline-none p-1 rounded font-light font-roboto text-white"
                                />
                            </div>

                            <div className="pt-3">
                                <input type="submit" value="Book Now" className="border-[3px] border-white hover:bg-[#a20e0e] px-[28px] py-[9px] rounded hover:text-light hover:cursor-pointer" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="md:gap-0 bg-white mx-auto px-4 md:px-8 xl:px-20 py-10 max-w-[1366px]">
                <div className="flex justify-between items-center">
                    <h3 className="text-white text-xl md:text-[35px] uppercase">Video Tour</h3>
                </div> <br />
                <div className="w-full h-[200px] md:h-[600px]">
                    <VideoPlayer thum={videoThumbnailImgUpload} url={youtube_url} />
                </div>
            </div>

            <br /><br />
            <SecondaryTitle
                text='Our Location'
                position="text-center"
            />
            {map_link && (
                <iframe
                    className="mt-6 rounded-lg h-[200px] md:h-[240px] lg:h-[400px]"
                    src={extractSrcFromIframe(map_link)}
                    width="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
            )}


        </div >
    );
};

export default LandDetails; 