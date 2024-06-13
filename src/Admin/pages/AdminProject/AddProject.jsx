/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import AdminTitle from "../../Component/AdminTitle";
import useImageUpload from "../../../hooks/useUploadImg";
import CreatableSelect from 'react-select/creatable';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);
    const [toggle, setToggle] = useState(false);



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
    const options = [];

    // upload image 
    const { uploadImage } = useImageUpload();

    // dynamic inputs
    const [inputFields, setInputFields] = useState([{ name: '', progress: '' }]);

    // Function to handle adding new input fields
    const handleAddField = () => {
        setInputFields([...inputFields, { name: '', progress: '' }]);
    };

    // Function to handle input value changes
    const handleValueChange = (index, e) => {
        const { name, value } = e.target;

        console.log('check', name, value);
        const newInputFields = [...inputFields];
        newInputFields[index][name] = value;
        setInputFields(newInputFields);
    };

    const handleDeleteField = (index) => {
        const newInputFields = [...inputFields];
        newInputFields.splice(index, 1);
        setInputFields(newInputFields);
    };



    const [conditionOn, setConditionOn] = useState(true);

    const handleCheckboxChange = () => {
        setConditionOn(!conditionOn); // Toggle the state
    };


    const [vrOn, setVrOn] = useState(true);
    const [youtube, setYoutube] = useState(true)

    const handleVr = () => {
        setVrOn(!vrOn); // Toggle the state
    };

    const [selectedOptions, setSelectedOptions] = useState([]);
    const navigate = useNavigate();
    const handleChange = (newValue, actionMeta) => {
        console.log('Selected Options:', newValue);
        console.log('Action Meta:', actionMeta);
        setSelectedOptions(newValue); // Optionally, you can set the selected options to state
    };



    // form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        //
        console.log('hit')
        // Get values from the form fields
        const name = form.project_name.value;
        const project_type = form.project_type.value;
        const project_status = form.project_status.value;
        const address = form.address.value;
        const land_area = form.land_area.value;
        const no_of_floors = form.no_of_floors.value;
        const apartment_floors = form.apartment_floors.value;
        const apartment_size = form.apartment_size.value;
        const bedroom = form.bedroom.value;
        const bathroom = form.bathroom.value;
        const launch_date = new Date().getTime();
        const collections = form.collections.value;
        const handover = form.handover.value;
        const youtube_url = form.youtube_url.value;
        const vr_status = vrOn
        const vr_url = vrOn && form.vr_url.value;
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
            project_type,
            status: toggle,
            project_status,
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
                    handover,
                    contractionStatus: inputFields
                }
            },
            gallery_img: galleryImageUrls,
            featureInfo: {
                features: selectedOptions,
                features_img: featureImgUpload
            },
            youtube_url,
            vr_url,
            vr_status,
            conditionStatus: conditionOn,
            videoThumbnailImgUpload: videoThumbnailImgUpload,
            map_link
        };



        fetch('https://backend.seapropertiesltd.com.bd/api/v1/admin/project/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => res.json()).then((data) => {
            setLoading(false)
            Swal.fire('Project Successfully Added', '', 'success');
            // navigate('/admin/manage-project');
        })

        console.log(data, 'testing......', uploadedBannerImg, banner_img);
    };



    return (
        <div>

            <div className="flex items-center justify-between">
                <AdminTitle title='Add Project' />

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
                            required
                            name="project_name"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            type="text"
                            placeholder="Enter Project name" />
                    </div>
                    <div className="mt-3 w-full">
                        <label    >Cart Image</label><br />
                        <input
                            name="banner_img"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            type="file"
                            placeholder="Enter Project name" />
                    </div>
                </div>
                <div className="md:flex items-center gap-6">
                    <div className="mt-3 w-full">
                        <label   >Project Type</label><br />
                        <select
                            name="project_type"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            type="text"
                            placeholder="Enter Project name">
                            <option value="projectType">Project Type</option>
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                        </select>
                    </div>
                    <div className="mt-3 w-full">
                        <label>Project Status</label><br />
                        <select
                            name="project_status"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            type="text"
                            placeholder="Enter Project name">
                            <option selected value="project status">Project Status</option>
                            <option value="onGoing">ON Going</option>
                            <option value="upComing">Up Coming</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                <br />

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
                            placeholder="Enter Project name" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="mt-3 w-full">
                            <label   >Address</label><br />
                            <input
                                name="address"
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="Enter Project address" />
                        </div>
                        <div className="mt-3 w-full">
                            <label   >Land Area</label><br />
                            <input
                                name="land_area"
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="Enter land area" />
                        </div>
                        <div className="mt-3 w-full">
                            <label   >No of Floors</label><br />
                            <input
                                name="no_of_floors"
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="Enter no of floors" />
                        </div>
                        <div className="mt-3 w-full">
                            <label   >Apartment / Floors</label><br />
                            <input
                                name="apartment_floors"
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="Type apartment/floors" />
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
                            <label   >No of Parking</label><br />
                            <input
                                name="bedroom"
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="Enter data" />
                        </div>
                        <div className="mt-3 w-full">
                            <label   >Flat Details</label><br />
                            <textarea
                                name="bathroom"
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="Enter data " />
                        </div>

                        <div className="mt-3 w-full">
                            <label   >Collections</label><br />
                            <input
                                name="collections"
                                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                type="text"
                                placeholder="Total Collection " />

                        </div>
                    </div>
                    <div className="mt-3 w-full">
                        <label   >Handover</label><br />
                        <input
                            name="handover"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            type="text"
                            placeholder="Hand over date " />
                    </div>
                </div>
                <br />

                {/* dynamic inputs */}
                <label htmlFor="cdn" className="text-md flex gap-2 font-semibold">
                    <input
                        type="checkbox"
                        id="cdn"
                        checked={conditionOn} // Bind the checked state to conditionOn
                        onChange={handleCheckboxChange} // Handle the change event
                    />
                    Explant Status
                </label>

                {conditionOn && <div className="border border-[#dbdbdb] mt-3 p-6">
                    <div className="flex items-center gap-2 justify-between">
                        <h2> Explant Status</h2>
                        <button type="button" className="duration-200 bg-[#e1e0e0] px-4 py-1" onClick={handleAddField}>+ Add Field</button>
                    </div>
                    {/* dynamic inputs */}
                    {inputFields.map((item, index) => (
                        <div key={index} className="grid grid-cols-2 gap-4">
                            <div className="mt-3 w-full">
                                <label>Name Of Works</label>
                                <br />
                                <input
                                    className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                    type="text"
                                    name="name"
                                    placeholder="Name Of The Works"
                                    onChange={(e) => handleValueChange(index, e)}
                                />
                            </div>

                            <div className="mt-3 w-full">
                                <label>Project Progress</label><br />
                                <div className="flex items-center gap-2">
                                    <input
                                        name="progress"
                                        className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                                        type="text"
                                        value={item.progress}
                                        placeholder="progress"
                                        onChange={(e) => handleValueChange(index, e)}
                                    />
                                    <button onClick={() => handleDeleteField(index)} type="button" className="bg-[#8a1717] w-[50px] h-[40px] mt-2 flex justify-center text-xl rounded text-[white] items-center">x</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}
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
                            placeholder="Enter Project name" />
                    </div>
                </div>

                {/* features  */}
                <div className="border border-[#dbdbdb] mt-6 p-6 space-y-3">
                    <h2 className="font-bold border-b  border-[gray] pb-3">Features</h2>
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
                        <label   >Features Img</label><br />
                        <input
                            type="file"
                            name="features_img"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            placeholder="Enter feature img url" />
                    </div>
                </div>

                {/* Video Tour  */}
                <div className="border border-[#dbdbdb] mt-6 p-6 space-y-3">
                    <h2 className="font-bold border-b  border-[gray] pb-3">Video Tour</h2>
                    <br />
                    <label htmlFor="vr" className="text-md flex gap-2 font-semibold">
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
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            placeholder="Enter youtube url" />

                        <br />

                        <div className="">
                            <label   >Thumbnail</label><br />
                            <input
                                type="file"

                                name="video_thumbnail"
                                className="border mt-1 w-full p-2 rounded bg-[#f4f3f3]"
                                placeholder="Enter Project name" />
                        </div>
                    </div>}


                    <br />
                    <label htmlFor="vr" className="text-md flex gap-2 font-semibold">
                        <input
                            type="checkbox"
                            id="vr"
                            checked={vrOn} // Bind the checked state to conditionOn
                            onChange={handleVr} // Handle the change event
                        />
                        Add VR url
                    </label>

                    {vrOn && <div className="">
                        <label   >VR URL</label><br />
                        <input
                            type="url"
                            multiple
                            name="vr_url"
                            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                            placeholder="Enter vr url" />
                    </div>}
                </div>
                {/* map link */}
                <br />
                <div className="">
                    <label   >Map Link</label><br />
                    <input
                        type="text"
                        name="map_link"
                        className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                        placeholder="Enter map link" />
                </div>
                <br /> <br />
                {loading ? (
                    <button
                        disabled
                        type="submit"
                        className="px-8 py-2 flex items-center gap-2 rounded bg-[#631f31] text-[white]"
                    >
                        <div className="border-gray-300 h-[20px] w-[20px] animate-spin rounded-full border-[4px] border-t-[#c40424]" />
                        Adding...
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="px-8 py-2 rounded bg-[#b02449] text-[white]"
                    >
                        +Add
                    </button>
                )}

            </form>
        </div>

    );
};

export default AddProject;