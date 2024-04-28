import ReactQuill from "react-quill";
import AdminTitle from "../../Component/AdminTitle";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import useImageUpload from "../../../hooks/useUploadImg";
import Swal from "sweetalert2";
import { CgClose } from "react-icons/cg";

const AddBanner = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  // image upload from custom hooks
  const { uploadImage } = useImageUpload();

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  const removeImage = (indexToRemove) => {
    const filteredImages = images.filter((_, index) => index !== indexToRemove);
    setImages(filteredImages);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const description = value;
    const meta_tag = form.meta_tag.value;
    const meta_description = form.meta_description.value;

    const uploadedImageUrls = [];

    // Loop through each image in the images array
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      try {
        const imageUrl = await uploadImage(image); // Upload the current image
        uploadedImageUrls.push(imageUrl); // Add the uploaded image URL to the array
      } catch (error) {
        console.error("Error uploading image:", error);
        uploadedImageUrls.push(null); // Push null if upload fails
      }
    }

    console.log("Uploaded Image URLs:", uploadedImageUrls);

    // Now you have all the uploaded image URLs, you can proceed with the rest of your data submission logic

    const data = {
      photos: uploadedImageUrls, // Use uploaded image URLs here
      name,
      date: new Date(),
      status: false,
      description,
      meta_tag,
      meta_description,
    };

    fetch("https://sea-properties-server.vercel.app/api/v1/admin/banner/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Banner successfully added", "", "success");
      });

  };

  return (
    <div className="my-4">
      <AdminTitle title="Add Banner" />
      <form onSubmit={handleSubmit}>
        <br />
        <div className="mb-4 bg-[white] p-4">
          <div className="relative overflow-hidden  w-full border border-dashed border-[#336cb6] px-4 py-2 bg-[white] flex items-center justify-center text-[#336cb6] ring-offset-2 min-h-[280px] duration-300 focus:outline-none focus:ring-2">
            <input
              name="photos"
              placeholder="Select Photos"
              className=" absolute scale-[3] top-0 left-0 right-0 bottom-0 w-full h-full"
              type="file"
              multiple
              onChange={handleImageChange}
            />

            <button className="text-[black] bg-[#e6e6e6] px-6 py-2 rounded">
              Upload Banner
            </button>
          </div>
          {images.length ?
            <div className="mt-2 ">
              <h1 className="mb-2 text-md font-bold">To Upload {images.length}</h1>
              <div className="flex gap-2 flex-wrap">
                {images.map((image, index) => (
                  <div key={index} className="mr-2 mb-2 border rounded border-[red] relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Image ${index}`}
                      className="rounded"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                    <button
                      type="button"
                      className="text-red-500 ml-1 border border-[red] rounded-full bg-[red] text-[white] absolute -top-2 -right-2"
                      onClick={() => removeImage(index)}
                    >
                      <CgClose />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            : ''
          }

        </div>



        <div className="mb-4">
          <label htmlFor="photo">Name</label>
          <input
            name="name"
            placeholder="Enter Blog Name"
            className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
            type="text"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tag">Meta Tag</label>
          <input
            name="meta_tag"
            placeholder="Enter Meta Tags"
            className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="meta_description">Meta Description</label>
          <textarea
            name="meta_description"
            placeholder="Enter Meta Description"
            className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
            type="text"
          />
        </div>
        {loading ? (
          <button
            disabled
            type="submit"
            className="px-3 py-1 rounded bg-[#631f31] text-[white]"
          >
            Adding...
          </button>
        ) : (
          <button
            type="submit"
            className="px-3 py-1 rounded bg-[#b02449] text-[white]"
          >
            Add Banner
          </button>
        )}
      </form>
    </div>
  );
};

export default AddBanner;
