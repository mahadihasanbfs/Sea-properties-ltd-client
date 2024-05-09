/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import AdminTitle from "../../Component/AdminTitle";
import useImageUpload from "../../../hooks/useUploadImg";
import Select from "react-select";
import Swal from "sweetalert2";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import CreatableSelect from 'react-select/creatable';
import { useQuery } from "@tanstack/react-query";

const EditProject = () => {
  const navigate = useNavigate();
  const loadData = useLoaderData();
  const allProjects = loadData?.data;
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const id = useParams().id;
  // banner img show and upload
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = () => {
    setImage(null);
    fileInputRef.current.value = "";
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file.");
    }
  };
  // end banner img

  // multiple selector
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [];

  // upload image
  const { uploadImage } = useImageUpload();



  // const { data: allProjects = [], refetch } = useQuery({
  //   queryKey: ["all_Projects"],
  //   queryFn: async () => {
  //     const res = await fetch( `https://backend.seapropertiesltd.com.bd/api/v1/admin/project/get-project?project_id=${id}`);
  //     const data = await res.json();
  //     return data?.data;
  //   },
  // });


  const [conditionOn, setConditionOn] = useState(allProjects.conditionStatus);

  const handleCheckboxChange = () => {
    setConditionOn(!conditionOn); // Toggle the state
  };


  const [vrOn, setVrOn] = useState(allProjects.vr_status);
  const [youtube, setYoutube] = useState(allProjects.youtube_url)

  const handleVr = () => {
    setVrOn(!vrOn); // Toggle the state
  };

  const [inputFields, setInputFields] = useState(allProjects?.details?.info?.contractionStatus);



  const handleAddField = () => {
    setInputFields([...inputFields, { name: "", progress: "" }]);
  };

  const handleValueChange = (index, e) => {
    const { name, value } = e.target;
    const newInputFields = [...inputFields];
    newInputFields[index][name] = value;
    setInputFields(newInputFields);
  };

  const handleDeleteField = (index) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    // Get values from the form fields
    const name = form.name.value;
    // console.log(name, "name");
    const project_type = form.project_type.value;
    const project_status = form.project_status.value;
    const address = form.address.value;
    const land_area = form.land_area.value;
    const no_of_floors = form.no_of_floors.value;
    const apartment_floors = form.apartment_floors.value;
    const apartment_size = form.apartment_size.value;
    const bedroom = form.bedroom.value
    const bathroom = form.bathroom.value;
    const launch_date = new Date().getTime();
    const collections = form.collections.value;

    const video_url = form?.youtube_url?.value;
    const vr_status = vrOn;
    const vr_url = !vrOn ?? form.vr_url.value;
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
    // const data = {
    //   project_photo: project_photo ? project_photo : allProjects?.project_photo,
    //   banner_img: uploadedBannerImg    ? uploadedBannerImg : allProjects?.banner_img,
    //   name: name ? name : allProjects?.name,
    //   project_type: allProjects?.project_type   ? allProjects?.project_type     : project_type,
    //   project_status: project_status?.project_status  ? allProjects?.project_status   : project_status,

    //   details: {
    //     detail_img: detailImgUpload ? detailImgUpload  : allProjects?.details?.detail_img,
    // info: {
    //   address: address ? address : allProjects?.details?.info?.address,
    //   land_area: land_area ? land_area : allProjects?.details?.info?.land_area,
    //   no_of_floors: no_of_floors ? no_of_floors : allProjects?.details?.info?.no_of_floors,
    //   apartment_floors: apartment_floors ? apartment_floors : allProjects?.details?.info?.apartment_floors,
    //   apartment_size: apartment_size ? apartment_size : allProjects?.details?.info?.apartment_size,
    //   bathroom: bathroom ? bathroom : allProjects?.details?.info?.bathroom,
    //   bedroom: bedroom ? bedroom : allProjects?.details?.info?.bedroom,
    //   launch_date: launch_date ? launch_date : allProjects?.details?.info?.launch_date,
    //   collections: collections ? collections : allProjects?.details?.info?.collections,
    //   contractionStatus: inputFields,
    // },
    //   },
    // gallery_img: galleryImageUrls.length
    //   ? galleryImageUrls
    //   : allProjects?.gallery_img,
    // featureInfo: {
    //   features: selectedOption ? selectedOption : allProjects?.featureInfo?.features,
    //   features_img: featureImgUpload
    //     ? featureImgUpload
    //     : allProjects?.featureInfo?.features_img,
    // },
    //   vr_url,
    //   vr_status,
    //   conditionStatus: conditionOn,
    //   videoThumbnailImgUpload: videoThumbnailImgUpload
    //     ? videoThumbnailImgUpload
    //     : allProjects?.videoThumbnailImgUpload,
    //   video_url,
    //   map_link,
    // };

    const data = {
      project_photo: project_photo ? project_photo : allProjects?.project_photo,
// <<<<<<< update_land_report
//       banner_img: uploadedBannerImg
//         ? uploadedBannerImg
//         : allProjects?.banner_img,
//       name: name,
//       project_type: allProjects?.project_type
//         ? allProjects?.project_type
//         : project_type,
//       project_status: project_status?.project_status
//         ? allProjects?.project_status
//         : project_status,

// =======
      banner_img: uploadedBannerImg ? uploadedBannerImg : allProjects?.banner_img,
      name: name ? name : allProjects?.name,
      project_type: allProjects?.project_type ? allProjects?.project_type : project_type,
      project_status: project_status?.project_status ? allProjects?.project_status : project_status,
// >>>>>>> main
      details: {
        detail_img: detailImgUpload ? detailImgUpload : allProjects?.details?.detail_img,
        info: {
          address: address ? address : allProjects?.details?.info?.address,
          land_area: land_area ? land_area : allProjects?.details?.info?.land_area,
          no_of_floors: no_of_floors ? no_of_floors : allProjects?.details?.info?.no_of_floors,
          apartment_floors: apartment_floors ? apartment_floors : allProjects?.details?.info?.apartment_floors,
          apartment_size: apartment_size ? apartment_size : allProjects?.details?.info?.apartment_size,
          bathroom: bathroom ? bathroom : allProjects?.details?.info?.bathroom,
          bedroom: bedroom ? bedroom : allProjects?.details?.info?.bedroom,
          launch_date: launch_date ? launch_date : allProjects?.details?.info?.launch_date,
          collections: collections ? collections : allProjects?.details?.info?.collections,
          contractionStatus: inputFields,
        },
      },

      gallery_img: galleryImageUrls.length
        ? galleryImageUrls
        : allProjects?.gallery_img,

      featureInfo: {
        features: selectedOption ? selectedOption : allProjects?.featureInfo?.features,
        features_img: featureImgUpload
          ? featureImgUpload
          : allProjects?.featureInfo?.features_img,
      },
      youtube_url: video_url,
      vr_url,
      vr_status,
      conditionStatus: conditionOn,
      videoThumbnailImgUpload: videoThumbnailImgUpload
        ? videoThumbnailImgUpload
        : allProjects?.videoThumbnailImgUpload,
      map_link
    };

    console.log(data);
    fetch(
      `https://backend.seapropertiesltd.com.bd/api/v1/admin/project/update?project_id=${allProjects?._id}`,
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
        navigate("/admin/manage-project");
        setLoading(false);
      });


  };

  console.log(allProjects, '---->');

  return (
    <div>
      <AdminTitle title="Edit project" />
      <br />
      <div className="border overflow-hidden relative border-gray-500 p-4 rounded flex flex-col gap-2">
        <div>
          <input
            required
            // defaultValue={allProjects?.project_photo}
            type="file"
            accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/heic"
            ref={fileInputRef}
            onChange={handleImageChange}
            name="project_photo"
            className="absolute top-[-28px] left-0 h-[340px] right-0 bottom-0 z-[200]"
          />
          <div className="w-full h-[250px] relative border-[1px] border-dashed border-gray-400 rounded-xl">
            {!image && (
              <div
                onClick={handleButtonClick}
                className="w-full h-full text-gray-700   flex flex-col justify-center items-center gap-2 hover:cursor-pointer"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium">Upload Banner Picture</h3>
                <p>Upload only image type file</p>
              </div>
            )}
            {(
              <div className="absolute top-0 left-0 right-0 bottom-0 w-full  h-full mx-auto">
                <img
                  src={image ? image : allProjects?.banner_img}
                  alt="Uploaded"
                  className=" w-full h-full object-cover  rounded-xl"
                />
                {image && <div
                  onClick={handleDeleteImage}
                  className="absolute top-2 z-[300] text-gray-100 right-2   -translate-x-1/2 z-50 bg-gray-900 hover:bg-gray-500  h-10 w-10 flex items-center justify-center rounded-full hover:cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>}
              </div>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="lg:flex block items-center gap-6">
          <div className="mt-3 w-full">
            <label>Project Name</label>
            <br />
            <input
              defaultValue={allProjects?.name}
              name="name"
              className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
              type="text"
              placeholder="enter project name"
            />
          </div>
          <div className="mt-3 w-full">
            <label>Banner image</label>
            <br />
            <input
              // defaultValue={allProjects?.banner_img}
              name="banner_img"
              className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
              type="file"
              placeholder="enter project name"
            />
          </div>
        </div>
        <div className="md:flex items-center gap-6">
          <div className="mt-3 w-full">
            <label>Project Type</label>
            <br />
            <select
              name="project_type"
              className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
              type="text"
              placeholder="enter project name"
            >
              <option value="projectType">Project Type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <div className="mt-3 w-full">
            <label>Project Status</label>
            <br />
            <select
              name="project_status"
              className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
              type="text"
              placeholder="enter project name"
            >
              <option value="onGoing">ON Going</option>
              <option value="upComing">Up Coming</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <br />

        {/* details */}
        <div className="border border-[#dbdbdb] mt-6 p-6">
          <h2 className="font-bold border-b  border-[gray] pb-3">
            Project Details
          </h2>
          <br />
          <div className="">
            <label>Detail Image</label>
            <br />
            <input
              // defaultValue={allProjects?.details?.detail_img}
              type="file"
              name="detail_img"
              className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
              placeholder="enter project name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mt-3 w-full">
              <label>Address</label>
              <br />
              <input
                defaultValue={allProjects?.details?.info?.address}
                name="address"
                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                type="text"
                placeholder="enter project address"
              />
            </div>
            <div className="mt-3 w-full">
              <label>Land Area</label>
              <br />
              <input
                defaultValue={allProjects?.details?.info?.land_area}
                name="land_area"
                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                type="text"
                placeholder="enter land area"
              />
            </div>
            <div className="mt-3 w-full">
              <label>No of floors</label>
              <br />
              <input
                defaultValue={allProjects?.details?.info?.no_of_floors}
                name="no_of_floors"
                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                type="text"
                placeholder="enter no of floors"
              />
            </div>
            <div className="mt-3 w-full">
              <label>Apartment/Floors</label>
              <br />
              <input
                defaultValue={allProjects?.details?.info?.apartment_floors}
                name="apartment_floors"
                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                type="text"
                placeholder="type apartment/floors"
              />
            </div>
            <div className="mt-3 w-full">
              <label>Apartment Size</label>
              <br />
              <input
                defaultValue={allProjects?.details?.info?.apartment_size}
                name="apartment_size"
                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                type="text"
                placeholder="Apartment Size"
              />
            </div>
            <div className="mt-3 w-full">
              <label>No of Parking</label>
              <br />
              <input
                defaultValue={allProjects?.details?.info?.bedroom}
                name="bedroom"
                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                type="text"
                placeholder="Enter total bedroom"
              />
            </div>
            <div className="mt-3 w-full">
              <label>Flat Details</label>
              <br />
              <textarea
                defaultValue={allProjects?.details?.info?.bathroom}
                name="bathroom"
                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                type="text"
                placeholder="Enter total bathroom "
              />
            </div>

            <div className="mt-3 w-full">
              <label>Collections</label>
              <br />
              <input
                defaultValue={allProjects?.details?.info?.collections}
                name="collections"
                className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                type="text"
                placeholder="Total Collection "
              />
            </div>
          </div>
        </div>

        {/* dynamic inputs */}
        <div className="border border-[#dbdbdb] mt-6 p-6">
          <label htmlFor="cdn" className="text-md flex gap-2 font-semibold">
            <input
              type="checkbox"
              id="cdn"
              checked={conditionOn} // Bind the checked state to conditionOn
              onChange={handleCheckboxChange} // Handle the change event
            />
            Explant Status
          </label>
          {conditionOn && <div >
            <div className="flex items-center justify-between">
              <h2>Contraction Status</h2>
              <button
                type="button"
                className="duration-200 bg-[#e1e0e0] px-4 py-1"
                onClick={handleAddField}
              >
                + Add Field
              </button>
            </div>
            {/* dynamic inputs */}
            {inputFields?.map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div className="mt-3 w-full">
                  <label>Name Of Works</label>
                  <br />
                  <input

                    className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                    type="text"
                    name="name"
                    defaultValue={item.name}
                    placeholder="Name Of The Works"
                    onChange={(e) => handleValueChange(index, e)}
                  />
                </div>

                <div className="mt-3 w-full">
                  <label>Project Progress</label>
                  <br />
                  <div className="flex items-center gap-2">
                    <input
                      name="progress"
                      className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                      type="text"
                      defaultValue={item.progress}
                      placeholder="progress"
                      onChange={(e) => handleValueChange(index, e)}
                    />
                    <button
                      onClick={() => handleDeleteField(index)}
                      type="button"
                      className="bg-[#8a1717] w-[50px] h-[40px] mt-2 flex justify-center text-xl rounded text-[white] items-center"
                    >
                      x
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>}
        </div>

        {/*gallery  */}
        <div className="border border-[#dbdbdb] mt-6 p-6">
          <h2 className="font-bold border-b  border-[gray] pb-3">
            Project Gallery
          </h2>
          <br />
          <div className="">
            <label>Gallery Image</label>
            <br />
            <input
              // defaultValue={allProjects?.details?.info?.gallery_img}
              type="file"
              multiple
              name="gallery_img"
              className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
              placeholder="enter project name"
            />
          </div>
        </div>

        {/* features  */}
        <div className="border border-[#dbdbdb] mt-6 p-6 space-y-3">
          <h2 className="font-bold border-b  border-[gray] pb-3">Features</h2>
          <br />
          <div className="">
            <label>Features Info</label>
            <br />
            {/* <Select
              isMulti
              className="border mt-2 w-full  rounded bg-[#f4f3f3]"
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            /> */}

            <CreatableSelect
              type="button"
              isMulti
              isClearable
              onChange={setSelectedOption}
            // Replace 'options' with your actual options array
            />
          </div>

          <div className="">
            <label>Features Img</label>
            <br />
            <input
              // defaultValue={allProjects?.details?.info?.features_img}
              type="file"
              name="features_img"
              className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
              placeholder="enter feature img url"
            />
          </div>
        </div>

        {/*   <div className="border border-[#dbdbdb] mt-6 p-6 space-y-3">
          <h2 className="font-bold border-b  border-[gray] pb-3">Video Tour</h2>
          <br />
          <div className="">
            <label>URL</label>
            <br />
            <input
              defaultValue={allProjects?.video_url}
              type="url"
              name="video_url"
              className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
              placeholder="enter video url"
            />
          </div>
          <div className="">
            <label>Thumbnail</label>
            <br />
            <input
              // defaultValue={allProjects?.video_thumbnail}
              type="file"
              multiple
              name="video_thumbnail"
              className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
              placeholder="enter project name"
            />
          </div>
          <div className="">
            <label>VR Status</label>
            <br />
            <input
              defaultValue={allProjects?.vr_status}
              type="text"
              name="vr_status"
              className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
              placeholder="enter vr status"
            />
          </div>
          <div className="">
            <label>VR URL</label>
            <br />
            <input

              defaultValue={allProjects?.vr_url}
              type="url"
              multiple
              name="vr_url"
              className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
              placeholder="enter vr url"
            />
          </div>
        </div>  */}

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
              defaultValue={allProjects.youtube_url}
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
          <label>Map Link</label>
          <br />
          <input
            defaultValue={allProjects?.map_link}
            type="text"
            name="map_link"
            className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
            placeholder="enter map link"
          />
        </div>

        {/* <button className="dashboard_form_btn" type="submit">
          Update
        </button> */}
        {
          !loading ? (
            <button className="dashboard_form_btn" type="submit">
              Update
            </button>
          ) : (
            <button disabled className="dashboard_form_btn" type="button">
              Updating....
            </button>
          )
        }
      </form >
    </div >
  );
};

export default EditProject;
