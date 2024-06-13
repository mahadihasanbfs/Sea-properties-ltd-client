/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import AdminTitle from "../../Component/AdminTitle";
import useImageUpload from "../../../hooks/useUploadImg";
import CreatableSelect from 'react-select/creatable';
import Swal from "sweetalert2";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

const EditAdminLand = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const id = useParams()?.id;
    const landData = useLoaderData()?.data;



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


    const initialData = {
        _id: 0,
        features: [
            { "label": "fdegtr", "value": "fdegtr", "__isNew__": true },
            { "label": "dfs", "value": "dfs", "__isNew__": true },
        ],
        galleryImg: ["https://backend.seapropertiesltd.com.bd/api/v1/image/665c2fafa8c28ab3c744598d.jpg", "https://backend.seapropertiesltd.com.bd/api/v1/image/665c2fafa8c28ab3c744598d.jpg"]
    };

    const [selectedOptions, setSelectedOptions] = useState(landData?.features || initialData.features);
    const navigate = useNavigate();

    const handleChange = (newValue) => {
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
        const no_of_floors = form.no_of_floors?.value;
        const apartment_floors = form.apartment_floors?.value;
        const apartment_size = form.apartment_size?.value;
        const bedroom = form.bedroom?.value;
        const bathroom = form.bathroom?.value;
        const launch_date = new Date().getTime();
        const collections = form.collections?.value;
        const handover = form.handover?.value;
        const youtube_url = form.youtube_url?.value;
        const vr_status = vrOn;
        const vr_url = vrOn ? form.vr_url?.value : null;
        const map_link = form.map_link?.value;

        // Get files from file inputs
        const detail_img = form?.detail_img?.files[0];
        const banner_img = form?.banner_img?.files[0];
        const video_thumbnail = form?.video_thumbnail?.files[0];
        const gallery_img = form?.gallery_img?.files;
        const features_img = form?.features_img?.files[0];

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
            project_photo: project_photo ?? landData?.project_photo,
            banner_img: uploadedBannerImg ?? landData?.banner_img,
            name: name ?? landData?.name,
            date: new Date(),
            project_type: project_type ?? landData?.project_type,
            project_status: project_status ?? landData?.project_type,
            Project_location: land_area ?? landData?.Project_location,
            details: {
                info: {
                    address: address ?? landData?.details?.info?.address,
                }
            },
            gallery_img: galleryImageUrls.length
                ? galleryImageUrls
                : landData?.gallery_img,
            featureInfo: {
                features: selectedOptions ?? landData?.featureInfo?.features,
                features_img: featureImgUpload ?? landData?.featureInfo?.features_img
            },
            map_link: map_link ?? landData?.map_link
        };

        fetch(
            `https://backend.seapropertiesltd.com.bd/api/v1/admin/land/update?land_id=${landData?._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                Swal.fire("Project Updated", "", "success");
                navigate("/admin/manage-land");
                setLoading(false);
            });


        console.log('updated......', data);
        setLoading(false);
    };


    // console.log('land..', landData);

    return (
        <div>
            <AdminTitle title='Edit Land' />
            <br />
            <div className='border border-gray-500 p-4 rounded flex flex-col gap-2'>
                <div>
                    <input
                        type="file"
                        accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/heic"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        name='project_photo'
                        className='hidden'
                    />
                    <div className='w-full h-[250px] border-[1px] border-dashed border-gray-400 rounded-xl'>
                        {!image &&
                            <div onClick={handleButtonClick} className='w-full h-full text-gray-700 flex flex-col justify-center items-center gap-2 hover:cursor-pointer'>
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
                                <img src={image} alt="Uploaded" className='w-full h-full object-cover rounded-xl' />
                                <div onClick={handleDeleteImage} className='absolute top-2 text-gray-100 right-2 -translate-x-1/2 z-50 bg-gray-900 hover:bg-gray-500 h-10 w-10 flex items-center justify-center rounded-full hover:cursor-pointer'>
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
                        <label>Land Name</label><br />
                        <input
                            defaultValue={landData?.name}
                            required
                            name="project_name"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            type="text"
                            placeholder="Enter Land name" />
                    </div>
                    <div className="mt-3 w-full">
                        <label>Cart Image</label><br />
                        <input
                            name="banner_img"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            type="file"
                            placeholder="Enter Land name" />
                    </div>
                </div>
                <div className="md:flex items-center gap-6">
                    <div className="mt-3 w-full">
                        <label>Land Type</label><br />
                        <select
                            name="project_type"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
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
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
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
                <div className="border border-[#dbdbdb] mt-6 p-6">
                    <h2 className="font-bold border-b border-[gray] pb-3">Land Locations</h2>
                    <br />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="mt-3 w-full">
                            <label>Address</label><br />
                            <input
                                name="address"
                                defaultValue={landData?.details?.info?.address}
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="Enter Land address" />
                        </div>
                        <div className="mt-3 w-full">
                            <label>Land Area</label><br />
                            <input
                                name="land_area"
                                defaultValue={landData?.details?.info?.land_area}
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="Enter land area" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <label>Map Link</label><br />
                        <input
                            defaultValue={landData?.map_link}
                            type="text"
                            name="map_link"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            placeholder="Enter map link" />
                    </div>
                </div>
                <br />

                {/*gallery  */}
                <div className="border border-[#dbdbdb] mt-6 p-6">
                    <h2 className="font-bold border-b border-[gray] pb-3">Land Gallery</h2>
                    <br />
                    <div className="">
                        <label>Gallery Image</label><br />
                        <input
                            type="file"
                            multiple
                            name="gallery_img"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            placeholder="Enter Land name" />
                    </div>
                </div>

                {/* features  */}
                <div className="border border-[#dbdbdb] mt-6 p-6 space-y-3">
                    <h2 className="font-bold border-b border-[gray] pb-3">Features</h2>
                    <br />

                    {/* <div className="container">
                        <label>Features Info</label><br />
                        <CreatableSelect
                            isMulti
                            isClearable
                            onChange={handleChange}
                        // Replace 'options' with your actual options array
                        />
                    </div> */}

                    <div className="container">
                        <label>Features Info</label>
                        <br />
                        <CreatableSelect
                            isMulti
                            isClearable
                            value={selectedOptions}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="">
                        <label>Features Img</label><br />
                        <input
                            type="file"
                            name="features_img"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            placeholder="Enter feature img url" />
                    </div>
                </div>

                <br /><br />
                {loading ? (
                    <button
                        disabled
                        type="submit"
                        className="px-8 py-2 flex items-center gap-2 rounded bg-[#631f31] text-[white]"
                    >
                        <div className="border-gray-300 h-[20px] w-[20px] animate-spin rounded-full border-[4px] border-t-[#c40424]" />
                        Updating...
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="px-8 py-2 rounded bg-[#b02449] text-[white]"
                    >
                        Update
                    </button>
                )}

            </form>
        </div>
    );
};

export default EditAdminLand;
