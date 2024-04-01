/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import AdminTitle from "../../Component/AdminTitle";
import useImageUpload from "../../../hooks/useUploadImg";
import Select from 'react-select';
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const EditProject = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const id = useParams().id
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
        setImageFile(file)
        if (file && file.type.startsWith('image/')) {
            setImage(URL.createObjectURL(file));
        } else {
            alert('Please select a valid image file.');
        }
    };
    // end banner img 

    // multiple selector
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    // upload image 
    const { uploadImage } = useImageUpload();

    // form submit


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;

        // Get values from the form fields
        const name = form.name.value;
        const address = form.address.value;
        const land_area = form.land_area.value;
        const no_of_floors = form.no_of_floors.value;
        const apartment_floors = form.apartment_floors.value;
        const apartment_size = form.apartment_size.value;
        const bedroom = form.bedroom.value;
        const bathroom = form.bathroom.value;
        const launch_date = form.launch_date.value;
        const collections = form.collections.value;
        const name_of_works = form.name_of_works.value;
        const project_progress = form.project_progress.value;
        const video_url = form.video_url.value;
        const vr_status = form.vr_status.value;
        const vr_url = form.vr_url.value;
        const map_link = form.map_link.value;

        // Get files from file inputs
        const detail_img = form?.detail_img.files[0];
        const banner_img = e.target.banner_img.files[0];
        const video_thumbnail = e.target.video_thumbnail.files[0];
        const gallery_img = e.target.gallery_img.files;
        const features_img = e.target.features_img.files[0];

        const galleryImageUrls = [];
        for (let i = 0; i < gallery_img.length; i++) {
            const imageUrl = await uploadImage(gallery_img[i]);

            galleryImageUrls.push(imageUrl);
        }

        // Asynchronously upload images
        const project_photo = await uploadImage(imageFile);
        const uploadedBannerImg = await uploadImage(banner_img);
        const detailImgUpload = await uploadImage(detail_img);
        const videoThumbnailImgUpload = await uploadImage(video_thumbnail);
        const featureImgUpload = await uploadImage(features_img);

        // Construct data object
        const data = {
            project_photo,
            banner_img: uploadedBannerImg,
            name,
            details: {
                detail_img: detailImgUpload,
                info: {
                    address,
                    land_area,
                    no_of_floors,
                    apartment_floors,
                    apartment_size,
                    bathroom,
                    bedroom,
                    launch_date,
                    collections,
                    name_of_works,
                    project_progress
                }
            },
            gallery_img: galleryImageUrls,
            featureInfo: {
                features: selectedOption,
                features_img: featureImgUpload
            },
            vr_url,
            vr_status,
            videoThumbnailImgUpload: videoThumbnailImgUpload,
            video_url,
            map_link
        };


        fetch('https://sea-properties-server.vercel.app/api/v1/project/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => res.json()).then((data) => {
            setLoading(false)
            Swal.fire('Project successfully added', '', 'success');
            // navigate('/admin/project-management');
        })

        fetch(`https://sea-properties-server.vercel.app/api/v1?project_id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => res.json()).then((data) => {
            Swal.fire('Project Update successful', '', 'success')
        })

    };




    return (
        <div>
            <AdminTitle title='Edit project' />
            <br />
            <div className='border border-gray-500 p-4 rounded flex flex-col gap-2'>
                <div>
                    <input
                        required

                        type="file"
                        accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/heic"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        name='project_photo'
                        className='hidden'
                    />
                    <div className='w-full h-[250px] border-[1px] border-dashed border-gray-400 rounded-xl'>
                        {!image &&
                            <div onClick={handleButtonClick} className='w-full h-full text-gray-700   flex flex-col justify-center items-center gap-2 hover:cursor-pointer'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                    </svg>
                                </div>
                                <h3 className='text-xl font-medium'>Upload Banner Picture</h3>
                                <p>Upload only image type file</p>
                            </div>
                        }
                        {image &&
                            <div className='relative w-full px-10 py-5 h-[250px] mx-auto'>
                                <img src={image} alt="Uploaded" className=' w-full h-full object-cover  rounded-xl' />
                                <div onClick={handleDeleteImage} className='absolute top-2  text-gray-100 right-2   -translate-x-1/2 z-50 bg-gray-900 hover:bg-gray-500  h-10 w-10 flex items-center justify-center rounded-full hover:cursor-pointer'>
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
                <div className="lg:flex block items-center gap-6">
                    <div className="mt-3 w-full">
                        <label   >Project Name</label><br />
                        <input
                            name="name"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            type="text"
                            placeholder="enter project name" />
                    </div>
                    <div className="mt-3 w-full">
                        <label    >Banner image</label><br />
                        <input
                            name="banner_img"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            type="file"
                            placeholder="enter project name" />
                    </div>
                </div> <br />

                {/* details */}
                <div className="border border-[#dbdbdb] mt-6 p-6">
                    <h2 className="font-bold border-b  border-[gray] pb-3">Project Details</h2>
                    <br />
                    <div className="">
                        <label   >Detail Image</label><br />
                        <input
                            type="file"
                            name="detail_img"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            placeholder="enter project name" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="mt-3 w-full">
                            <label   >Address</label><br />
                            <input
                                name="address"
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="enter project address" />
                        </div>
                        <div className="mt-3 w-full">
                            <label   >Land Area</label><br />
                            <input
                                name="land_area"
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="enter land area" />
                        </div>
                        <div className="mt-3 w-full">
                            <label   >No of floors</label><br />
                            <input
                                name="no_of_floors"
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="enter no of floors" />
                        </div>
                        <div className="mt-3 w-full">
                            <label   >Apartment/Floors</label><br />
                            <input
                                name="apartment_floors"
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="type apartment/floors" />
                        </div>
                        <div className="mt-3 w-full">
                            <label   >Apartment Size</label><br />
                            <input
                                name="apartment_size"
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="Apartment Size" />
                        </div>
                        <div className="mt-3 w-full">
                            <label   >Bedroom</label><br />
                            <input
                                name="bedroom"
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="Enter total bedroom" />
                        </div>
                        <div className="mt-3 w-full">
                            <label   >Bathroom</label><br />
                            <input
                                name="bathroom"
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="Enter total bathroom " />
                        </div>
                        <div className="mt-3 w-full">
                            <label   >Launch Date</label><br />
                            <input
                                name="launch_date"
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="date" />
                        </div>
                        <div className="mt-3 w-full">
                            <label   >Collections</label><br />
                            <input
                                name="collections"
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="Total Collection " />
                        </div>
                        <div className="mt-3 w-full">
                            <label   >Name Of Works</label><br />
                            <input
                                name="name_of_works"
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="Enter total bathroom " />
                        </div>

                        <div className="mt-3 w-full">
                            <label   >Project Progress</label><br />
                            <input
                                name="project_progress"
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="Project progress percents " />
                        </div>

                    </div>
                </div>

                {/*gallery  */}
                <div className="border border-[#dbdbdb] mt-6 p-6">
                    <h2 className="font-bold border-b  border-[gray] pb-3">Project Gallery</h2>
                    <br />
                    <div className="">
                        <label   >Gallery Image</label><br />
                        <input
                            type="file"
                            multiple
                            name="gallery_img"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            placeholder="enter project name" />
                    </div>
                </div>

                {/* features  */}
                <div className="border border-[#dbdbdb] mt-6 p-6 space-y-3">
                    <h2 className="font-bold border-b  border-[gray] pb-3">Features</h2>
                    <br />
                    <div className="">
                        <label   >Features Info</label><br />
                        <Select
                            isMulti
                            className="border mt-2 w-full  rounded bg-[#f4f3f3]"
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                        />
                    </div>

                    <div className="">
                        <label   >Features Img</label><br />
                        <input
                            type="file"
                            name="features_img"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            placeholder="enter feature img url" />
                    </div>
                </div>

                {/* Video Tour  */}
                <div className="border border-[#dbdbdb] mt-6 p-6 space-y-3">
                    <h2 className="font-bold border-b  border-[gray] pb-3">Video Tour</h2>
                    <br />
                    <div className="">
                        <label   >URL</label><br />
                        <input
                            type="url"
                            name="video_url"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            placeholder="enter video url" />
                    </div>
                    <div className="">
                        <label   >Thumbnail</label><br />
                        <input
                            type="file"
                            multiple
                            name="video_thumbnail"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            placeholder="enter project name" />
                    </div>
                    <div className="">
                        <label   >VR Status</label><br />
                        <input
                            type="text"
                            name="vr_status"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            placeholder="enter vr status" />
                    </div>
                    <div className="">
                        <label   >VR URL</label><br />
                        <input
                            type="url"
                            multiple
                            name="vr_url"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            placeholder="enter vr url" />
                    </div>
                </div>
                {/* map link */}
                <br />
                <div className="">
                    <label   >Map Link</label><br />
                    <input
                        type="text"
                        name="map_link"
                        className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                        placeholder="enter map link" />
                </div>
                {
                    !loading ? <button className="dashboard_form_btn" type="submit">Update</button> : <button disabled className="dashboard_form_btn" type="button">Updating....</button>
                }
            </form>
        </div>

    );
};

export default EditProject;