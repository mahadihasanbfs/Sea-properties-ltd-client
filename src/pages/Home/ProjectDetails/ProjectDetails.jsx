import { useEffect, useState } from "react";
import SecondaryBanner from "../../../components/common/SecondaryBanner";
import SecondaryTitle from "../../../components/common/SecondaryTitle";
import { IoLogoYoutube } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useParams } from "react-router-dom";
import Slider from "../../../components/common/Slider";
import { FaBath, FaBed, FaBuilding, FaLocationDot } from "react-icons/fa6";
import { FaPencilRuler } from "react-icons/fa";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { BiSolidCollection } from "react-icons/bi";
import AlertModal from "../../../hooks/useAlertModal";
import DetailShet from "./DetailShet";
import Swal from "sweetalert2";

const ProjectDetails = () => {
    const [visible, setVisible] = useState(false);
    const [projectData, setProjectData] = useState({});
    const { id } = useParams();
    const [vr, setVr] = useState(false);
    const [on, setOn] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://sea-properties-server.vercel.app/api/v1/admin/project/get-project?project_id=${id}`);
                const data = await response.json();
                // const singleData = data.filter(item => item?._id === id);
                setProjectData(data?.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [id])

    console.log(projectData, id, '------>')

    // this section is used for slider functionality
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [loading, setLoading] = useState(null);

    const openSlider = (index) => {
        setSelectedImageIndex(index);
    };

    const closeSlider = () => {
        setSelectedImageIndex(null);
    };

    const { _id, title, address, banner_img, videoThumbnailImgUpload, video_url, contactPageImg, projectInfo, projectFeatures, gallery_img, projectVideo, mapLink, featureInfo, details } = projectData;

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
            message
        }


        fetch('https://sea-properties-server.vercel.app/api/v1/admin/booking/add', {
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
    return (
        <div className={`${visible && 'overflow-hidden'}`}>
            <SecondaryBanner
                bannerImg={banner_img}
                opacity={40}
                projectName={title}
                location={address}
            />
            {/*  project info  */}
            <div className="max-w-[1366px] mx-auto py-10 px-4 md:px-8 xl:px-20 grid md:grid-cols-2 gap-6 md:gap-0 bg-white ">
                <figure className="flex items-center">
                    <img className="w-[575px] h-[527px] object-cover" src={details?.detail_img} alt="" />
                </figure>
                <>
                    {/* component */}
                    <section className="container mx-auto p-6 font-mono">
                        <div className="w-full mb-8 border border-[#c9c9c9] overflow-hidden  shadow-lg">
                            <div className="w-full overflow-x-auto">
                                <table className="w-full   ">
                                    {/* <thead>
                                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100  uppercase  border-gray-600">
                                                    <th className="px-4 border-r py-3">Address</th>
                                                     <th className="px-4 py-3">Date</th>
                                                </tr>
                                            </thead> */}
                                    <tbody className="bg-white">
                                        <tr className="text-gray-700">
                                            <td className="px-4 flex gap-2 items-center py-3 text-ms font-semibold "><FaLocationDot className="text-xl" /> Address</td>
                                            <td className="px-4 py-3 text-sm  border-l">{details?.info?.address ? details?.info?.address : 'No Address'}</td>
                                        </tr>
                                        <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                            <td className="px-4 py-3 flex items-center gap-2 text-ms font-semibold "><FaPencilRuler className="text-lg" /> Land Area</td>
                                            <td className="px-4 py-3 text-sm  border-l">{details?.info?.land_area ? details?.info?.land_area : 'No land area'}</td>
                                        </tr>
                                        <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                            <td className="px-4 py-3 flex items-center gap-2 text-ms font-semibold "><FaBuilding className="text-lg" />  No of Floors</td>
                                            <td className="px-4 py-3 text-sm  border-l">
                                                {details?.info?.address?.no_of_floors ? details?.info?.address?.no_of_floors : '0'}
                                            </td>
                                        </tr>
                                        <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                            <td className="px-4 py-3 flex items-center gap-2 text-ms font-semibold "><BsGrid3X3GapFill className="text-lg" /> Apartment/Floors</td>
                                            <td className="px-4 py-3 text-sm  border-l">
                                                {projectInfo?.apartmentFloor ? projectInfo?.apartmentFloor : '0'}
                                            </td>
                                        </tr>

                                        <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                            <td className="px-4 py-3 flex items-center gap-2 text-ms font-semibold "><BsGrid3X3GapFill className="text-lg" /> Apartment Size</td>
                                            <td className="px-4 py-3 text-sm  border-l">
                                                {details?.info?.apartment_size ? details?.info?.apartment_size : '0'}
                                            </td>
                                        </tr>
                                        <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                            <td className="px-4 py-3 flex items-center gap-2 text-ms font-semibold "><FaBed className="text-lg" /> Bedroom</td>
                                            <td className="px-4 py-3 text-sm  border-l">{details?.info?.bedroom ? details?.info?.bedroom : '0'}</td>
                                        </tr>
                                        <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                            <td className="px-4 py-3 flex items-center gap-2 text-ms font-semibold "><FaBath className="text-lg" /> Bathroom</td>
                                            <td className="px-4 py-3 text-sm  border-l">
                                                {details?.info?.bedroom ? new Date().toString(details?.info?.bedroom) : '0'}
                                            </td>
                                        </tr>
                                        <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                            <td className="px-4 py-3 flex items-center gap-2 text-ms font-semibold "><MdDateRange className="text-lg" /> Launch Date</td>
                                            <td className="px-4 py-3 text-sm  border-l">{details?.info?.launch_date ? new Date().toString(details?.info?.launch_date) : 'N/A'}</td>
                                        </tr>
                                        <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                            <td className="px-4 py-3 flex items-center gap-2 text-ms font-semibold "><BiSolidCollection className="text-lg" /> Collection</td>
                                            <td className="px-4 py-3 text-sm  border-l">{details?.info?.collections ? details?.info?.collections : 'No Collections'}</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>

                        <button onClick={() => setOn(!on)} className="px-3 py-2 border ">Emplane</button>
                        <AlertModal title='Contraction Status' on={on} setOn={setOn}>
                            <DetailShet />
                        </AlertModal>
                    </section>
                </>
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
                                featureInfo?.features && featureInfo?.features?.map((feature, index) => <p key={index}>{feature?.label}</p>)
                            }
                        </div>
                        <button className="py-[9px] px-[32px] text-white border-[3px] border-white  mt-6">
                            Explore
                        </button>
                    </div>
                    <figure className="justify-self-end flex items-center">
                        <img className="w-[465px] h-[490px] object-cover" src={featureInfo?.features_img} alt="" />
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
                        gallery_img?.map((image, index) => <img
                            key={index}
                            src={image}
                            onClick={() => openSlider(index)}
                            className="md:w-[300px] md:h-[310px] lg:w-[365px] lg:h-[375px] object-cover hover:cursor-pointer hover:contrast-125 transition-all duration-500" />)
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

            {/* video section */}
            <div className="bg-black flex justify-center items-center py-12 md:py-20 lg:py-[100px]">
                <div className="space-y-8 w-[80%] md:w-fit">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[35px] text-white uppercase">Video Tour</h3>

                        <div className="flex items-center gap-2">
                            <a href="" ></a>
                        </div>
                    </div>
                    <figure
                        style={{
                            backgroundImage: `linear-gradient(to right, rgb(0 0 0 / 30%), rgb(0 0 0 / 30%)), url(${videoThumbnailImgUpload}})`
                        }}
                        className="h-[300px] md:w-[650px] md:h-[400px] lg:w-[934px] lg:h-[480px] border-4 border-[#FCF4F4] rounded-[10px] bg-cover flex justify-center items-center hover:cursor-pointer "
                        onClick={() => setVisible(true)}
                    >
                        <IoLogoYoutube className="text-6xl text-red-600" />
                    </figure>
                </div>
            </div>

            {/* video modal */}
            {
                visible &&
                <div className={`fixed top-0 w-screen bg-[#00000055] h-screen bg-black flex justify-center items-center z-[8000]`}>
                    <div className="w-[935px] h-[480px] bg-[#000000]">
                        <video className="w-full h-full" controls>
                            <source src={video_url} type="video/mp4" />
                            <source src={video_url} type="video/ogg" />
                            Your browser does not support HTML video.
                        </video>
                        {/* <video className="w-full h-[300px]" src={video_url}></video> */}
                        <button onClick={() => setVisible(false)} className="text-gray-400 absolute top-[70px] right-8">
                            <IoMdClose className="text-3xl" />
                        </button>
                    </div>
                    <button onClick={() => setVisible(false)} className="text-gray-400 absolute top-[70px] right-8">
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