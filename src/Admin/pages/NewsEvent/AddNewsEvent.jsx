import ReactQuill from "react-quill";
import AdminTitle from "../../Component/AdminTitle";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import useImageUpload from "../../../hooks/useUploadImg";
import Swal from "sweetalert2";
import JoditEditor from "jodit-react";

const AddNewsEvent = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const fileList = Array.from(e.target.files);
    const newImages = fileList.map((file) => ({
      file: file,
      url: URL.createObjectURL(file)
    }));
    setImages([...images, ...newImages]);
  };


  const handleImageRemove = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  // image upload from custom hooks
  const { uploadImage } = useImageUpload();



  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const photo = await uploadImage(form.photo.files[0]);
    const name = form.name.value;
    const status = form.status.value;
    const description = value;
    const meta_tag = form.meta_tag.value;
    const meta_description = form.meta_description.value;

    let galleryImageUrls = [];
    for (let i = 0; i < images.length; i++) {
      const imageUrl = await uploadImage(images[i].file);

      galleryImageUrls.push(imageUrl);
    }

    const data = {
      galleryImg: galleryImageUrls,
      featureImg: photo,
      title: name,
      date: new Date(),
      status: false,
      type: status,
      description,
      meta_tag,
      meta_description,
    };

    fetch("https://backend.seapropertiesltd.com.bd/api/v1/admin/add-news-events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        Swal.fire("Add News Event Post Successfully", "", "success");
        // navigate('/admin/project-management');
      });

    console.log(data, 'event');
  };

  return (
    <div className="my-4">
      <AdminTitle title="Add News Event" />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="photo">Title</label>
          <input
            name="name"
            placeholder="Enter News Events Title"
            className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
            type="text"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="photo">Feature Image</label>
          <input
            name="photo"
            placeholder="Enter Blog Name"
            className="rounded-lg w-full border border-[#336cb6] px-4 py-2 bg-[white] text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
            type="file"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="photo">Description</label>
          <JoditEditor
            className="rounded-lg w-full border border-[#336cb6] h-[200px] overflow-hidden  ring-offset-2 duration-300 focus:outline-none focus:ring-2"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>


        <div className="space-y-2 mb-4">
          <label htmlFor="photo">Gallery Image</label>
          <div className="flex items-center space-x-2">
            <input
              name='images'
              className="w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:outline-none"
              id="images"
              multiple
              type="file"
              onChange={handleImageChange}
            />
          </div>
          <div className="md:grid md:grid-cols-6 gap-4">
            {images.map((image, index) => (
              <div className="relative h-30" key={index}>
                <img
                  alt={`Image ${index + 1}`}
                  className="h-full w-full border rounded-md object-cover"
                  src={image.url}
                />
                <button
                  className="absolute top-1 right-1 rounded-full bg-dark bg-gray-800 p-1 text-light hover:bg-[#336cb6] focus:outline-none focus:ring-2 focus:ring-gray-500"
                  type="button"
                  onClick={() => handleImageRemove(index)}
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      fillRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <label htmlFor="tag">Status</label>
        <div className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2 mb-4">
          <select
            name="status"
            className="outline-none w-full bg-[transparent]">
            <option value="Status" selected>Status</option>
            <option value="news" >News</option>
            <option value="event" >Event</option>
          </select>
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
        {/* {loading ? (
          <button
            disabled
            type="submit"
            className="px-3 py-1 flex items-center gap-2 rounded bg-[#631f31] text-[white]"
          >
            <div className="border-gray-300 h-[20px] w-[20px] animate-spin rounded-full border-[4px] border-t-[#c40424]" />
            Adding...
          </button>
        ) : ( */}
        <button
          type="submit"
          className="px-10 py-2 rounded bg-[#b02449] text-[white]"
        >
          + Add
        </button>
        {/* )} */}
      </form>
    </div>
  );
};

export default AddNewsEvent;