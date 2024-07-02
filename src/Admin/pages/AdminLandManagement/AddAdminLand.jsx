/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import AdminTitle from "../../Component/AdminTitle";
import useImageUpload from "../../../hooks/useUploadImg";
import CreatableSelect from 'react-select/creatable';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddAdminLand = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const [toggle, setToggle] = useState(false);
    const [youtube, setYoutube] = useState(false);
    // banner img show and upload
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleDeleteImage = () => {
        setImage(null);
        fileInputRef.current.value = '';
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        if (file && file.type.startsWith('image/')) {
            setImage(URL.createObjectURL(file));
        } else {
            alert('Please select a valid image file.');
        }
    };

    // multiple selector
    const [selectedOption, setSelectedOption] = useState(null);

    // upload image 
    const { uploadImage } = useImageUpload();

    // dynamic inputs
    const [inputFields, setInputFields] = useState([{ name: '', progress: '' }]);

    const [vrOn, setVrOn] = useState(true);

    const [selectedOptions, setSelectedOptions] = useState([]);
    const navigate = useNavigate();
    const handleChange = (newValue, actionMeta) => {
        setSelectedOptions(newValue);
    };

    // form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;

        // Get values from the form fields
        const name = form.project_name?.value;
        const project_type = form.project_type?.value;
        const project_status = form.project_status?.value;
        const address = form.address?.value;
        const land_area = form.land_area?.value;
        const youtube_url = form.youtube_url?.value;
        const map_link = form.map_link?.value;
        // const no_of_floors = form.no_of_floors?.value;
        // const apartment_floors = form.apartment_floors?.value;
        // const apartment_size = form.apartment_size?.value;
        // const bedroom = form.bedroom?.value;
        // const bathroom = form.bathroom?.value;
        // const launch_date = new Date().getTime();
        // const collections = form.collections?.value;
        // const handover = form.handover?.value;
        // const vr_status = vrOn;
        // const vr_url = vrOn ? form.vr_url?.value : null;

        // Get files from file inputs
        const banner_img = form?.banner_img?.files[0];
        const gallery_img = form?.gallery_img?.files;
        const features_img = form?.features_img?.files[0];
        // const detail_img = form?.detail_img?.files[0];
        // const video_thumbnail = form?.video_thumbnail?.files[0];

        const galleryImageUrls = [];
        for (let i = 0; i < gallery_img?.length; i++) {
            const imageUrl = await uploadImage(gallery_img[i]);
            galleryImageUrls.push(imageUrl);
        }

        // Asynchronously upload images
        const project_photo = imageFile ? await uploadImage(imageFile) : null;
        const uploadedBannerImg = banner_img ? await uploadImage(banner_img) : null;
        const featureImgUpload = features_img ? await uploadImage(features_img) : null;

        // Construct data object
        const data = {
            project_photo,
            banner_img: uploadedBannerImg,
            name,
            status: toggle,
            date: new Date(),
            project_type,
            project_status,
            Project_location: land_area,
            details: {
                info: {
                    address,
                }
            },
            gallery_img: galleryImageUrls,
            featureInfo: {
                features: selectedOptions,
                features_img: featureImgUpload
            },
            map_link,
            youtube,
            youtube_url,
        };

        fetch('https://backend.seapropertiesltd.com.bd/api/v1/admin/land/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => res.json()).then((data) => {
            setLoading(false)
            Swal.fire('Land Successfully Added', '', 'success');
            navigate('/admin/manage-land');
        });

        console.log(data, 'testing......', data);
        setLoading(false);
    };

    console.log('===>', toggle);
    // form submit
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     const form = e.target;

    //     // Get values from the form fields
    //     const name = form.project_name?.value;
    //     const project_type = form.project_type?.value;
    //     const project_status = form.project_status?.value;
    //     const address = form.address?.value;
    //     const land_area = form.land_area?.value;
    //     const no_of_floors = form.no_of_floors?.value;
    //     const apartment_floors = form.apartment_floors?.value;
    //     const apartment_size = form.apartment_size?.value;
    //     const bedroom = form.bedroom?.value;
    //     const bathroom = form.bathroom?.value;
    //     const launch_date = new Date().getTime();
    //     const collections = form.collections?.value;
    //     const handover = form.handover?.value;
    //     const youtube_url = form.youtube_url?.value;
    //     const vr_status = vrOn;
    //     const vr_url = vrOn ? form.vr_url?.value : null;
    //     const map_link = form.map_link?.value;

    //     // Get files from file inputs
    //     const detail_img = form?.detail_img?.files[0];
    //     const banner_img = form?.banner_img?.files[0];
    //     const video_thumbnail = form?.video_thumbnail?.files[0];
    //     const gallery_img = form?.gallery_img?.files;
    //     const features_img = form?.features_img?.files[0];

    //     const galleryImageUrls = [];
    //     for (let i = 0; i < gallery_img?.length; i++) {
    //         const imageUrl = await uploadImage(gallery_img[i]);
    //         galleryImageUrls.push(imageUrl);
    //     }

    //     // Asynchronously upload images
    //     const project_photo = imageFile ? await uploadImage(imageFile) : null;
    //     const uploadedBannerImg = banner_img ? await uploadImage(banner_img) : null;
    //     const detailImgUpload = detail_img ? await uploadImage(detail_img) : null;
    //     const videoThumbnailImgUpload = video_thumbnail ? await uploadImage(video_thumbnail) : null;
    //     const featureImgUpload = features_img ? await uploadImage(features_img) : null;

    //     // Construct data object
    //     const data = {
    //         project_photo,
    //         banner_img: uploadedBannerImg,
    //         name,
    //         project_type,
    //         project_status,
    //         details: {
    //             detail_img: detailImgUpload,
    //             info: {
    //                 address,
    //                 land_area,
    //             }
    //         },
    //         gallery_img: galleryImageUrls,
    //         featureInfo: {
    //             features: selectedOptions,
    //             features_img: featureImgUpload
    //         },
    //         map_link
    //     };

    //     // Log all form values
    //     console.log("Form Values:", {
    //         name,
    //         project_type,
    //         project_status,
    //         address,
    //         land_area,
    //         no_of_floors,
    //         apartment_floors,
    //         apartment_size,
    //         bedroom,
    //         bathroom,
    //         launch_date,
    //         collections,
    //         handover,
    //         youtube_url,
    //         vr_status,
    //         vr_url,
    //         map_link,
    //         detail_img,
    //         banner_img,
    //         video_thumbnail,
    //         gallery_img,
    //         features_img
    //     });

    //     console.log(data, 'testing22......', data);
    //     setLoading(false);
    // };

    return (
        <div>
            <div className="flex justify-between items-center">
                <AdminTitle title='Add Land' />

                <div className="flex items-center gap-2">
                    <span className="text-sm">Out Of Sold</span>
                    <div className="flex gap-5">
                        <button onClick={() => setToggle((prev) => !prev)} className={`flex h-6 w-12 items-center rounded-full border border-[#1d4428] ${toggle ? 'bg-[#2c8a5262]' : null}`}>
                            <div className={`size-6 rounded-full bg-[#279044] duration-200 ${toggle ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                    </div>
                </div>
            </div>
            <br />
            <div className='flex flex-col gap-2 border-gray-500 p-4 border rounded'>
                <div>
                    <input
                        type="file"
                        accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/heic"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        name='project_photo'
                        className='hidden'
                    />
                    <div className='border-[1px] border-gray-400 border-dashed rounded-xl w-full h-[250px]'>
                        {!image &&
                            <div onClick={handleButtonClick} className='flex flex-col justify-center items-center gap-2 w-full h-full text-gray-700 hover:cursor-pointer'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                    </svg>
                                </div>
                                <h3 className='font-medium text-xl'>Upload Banner Picture</h3>
                                <p>Upload only image type file</p>
                            </div>
                        }
                        {image &&
                            <div className='relative mx-auto px-10 py-5 w-full h-[250px]'>
                                <img src={image} alt="Uploaded" className='rounded-xl w-full h-full object-cover' />
                                <div onClick={handleDeleteImage} className='top-2 right-2 z-50 absolute flex justify-center items-center bg-gray-900 hover:bg-gray-500 rounded-full w-10 h-10 text-gray-100 -translate-x-1/2 hover:cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="block lg:flex items-center gap-6">
                    <div className="mt-3 w-full">
                        <label>Land Name</label><br />
                        <input
                            required
                            name="project_name"
                            className="bg-[#f4f3f3] mt-2 p-2 border rounded w-full"
                            type="text"
                            placeholder="Enter Land name" />
                    </div>
                    <div className="mt-3 w-full">
                        <label>Cart Image</label><br />
                        <input
                            name="banner_img"
                            className="bg-[#f4f3f3] mt-2 p-2 border rounded w-full"
                            type="file"
                            placeholder="Enter Land name" />
                    </div>
                </div>
                <div className="md:flex items-center gap-6">
                    <div className="mt-3 w-full">
                        <label>Land Type</label><br />
                        <select
                            name="project_type"
                            className="bg-[#f4f3f3] mt-2 p-2 border rounded w-full"
                            type="text"
                            placeholder="Enter Land name">
                            <option value="projectType">Land Type</option>
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                        </select>
                    </div>
                    <div className="mt-3 w-full">
                        <label>Land Status</label><br />
                        <select
                            name="project_status"
                            className="bg-[#f4f3f3] mt-2 p-2 border rounded w-full"
                            type="text"
                            placeholder="Enter Land name">
                            <option selected value="Land status">Land Status</option>
                            <option value="onGoing">ON Going</option>
                            <option value="upComing">Up Coming</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                <br />

                {/* details */}
                <div className="border-[#dbdbdb] mt-6 p-6 border">
                    <h2 className="border-[gray] pb-3 border-b font-bold">Land Locations</h2>
                    <br />

                    <div className="gap-4 grid grid-cols-2">
                        <div className="mt-3 w-full">
                            <label>Address</label><br />
                            <input
                                name="address"
                                className="bg-[#f4f3f3] mt-2 p-2 border rounded w-full"
                                type="text"
                                placeholder="Enter Land address" />
                        </div>
                        <div className="mt-3 w-full">
                            <label>Land Area</label><br />
                            <input
                                name="land_area"
                                className="bg-[#f4f3f3] mt-2 p-2 border rounded w-full"
                                type="text"
                                placeholder="Enter land area" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <label>Map Link</label><br />
                        <input
                            type="text"
                            name="map_link"
                            className="bg-[#f4f3f3] mt-2 p-2 border rounded w-full"
                            placeholder="Enter map link" />
                    </div>
                </div>
                <br />

                {/*gallery  */}
                <div className="border-[#dbdbdb] mt-6 p-6 border">
                    <h2 className="border-[gray] pb-3 border-b font-bold">Land Gallery</h2>
                    <br />
                    <div className="">
                        <label>Gallery Image</label><br />
                        <input
                            type="file"
                            multiple
                            name="gallery_img"
                            className="bg-[#f4f3f3] mt-2 p-2 border rounded w-full"
                            placeholder="Enter Land name" />
                    </div>
                    <br />
                    <label htmlFor="vr" className="flex gap-2 font-semibold text-md">
                        <input
                            type="checkbox"
                            id="vr"
                            checked={youtube} // Bind the checked state to conditionOn
                            onChange={() => setYoutube(!youtube)} // Handle the change event
                        />
                        Add Youtube Url
                    </label>

                    {youtube && <div className="">
                        <label   >Youtube URL</label><br />
                        <input
                            type="url"
                            multiple
                            name="youtube_url"
                            className="bg-[#f4f3f3] mt-2 p-2 border rounded w-full"
                            placeholder="Enter youtube url" />
                    </div>}
                </div>

                {/* features  */}
                <div className="space-y-3 border-[#dbdbdb] mt-6 p-6 border">
                    <h2 className="border-[gray] pb-3 border-b font-bold">Features</h2>
                    <br />

                    <div className="container">
                        <label>Features Info</label><br />
                        <CreatableSelect
                            isMulti
                            isClearable
                            onChange={handleChange}
                        // Replace 'options' with your actual options array
                        />
                    </div>

                    <div className="">
                        <label>Features Img</label><br />
                        <input
                            type="file"
                            name="features_img"
                            className="bg-[#f4f3f3] mt-2 p-2 border rounded w-full"
                            placeholder="Enter feature img url" />
                    </div>
                </div>

                {/* Video Tour  */}

                <br /><br />
                {loading ? (
                    <button
                        disabled
                        type="submit"
                        className="flex items-center gap-2 bg-[#631f31] px-8 py-2 rounded text-[white]"
                    >
                        <div className="border-[4px] border-gray-300 border-t-[#c40424] rounded-full w-[20px] h-[20px] animate-spin" />
                        Adding...
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="bg-[#b02449] px-8 py-2 rounded text-[white]"
                    >
                        +Add
                    </button>
                )}

                {/* <button type="submit">add</button> */}
            </form>
        </div>
    );
};

export default AddAdminLand;
