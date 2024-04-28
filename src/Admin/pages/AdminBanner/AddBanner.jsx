import ReactQuill from "react-quill";
import AdminTitle from "../../Component/AdminTitle";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import useImageUpload from "../../../hooks/useUploadImg";
import Swal from "sweetalert2";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const AddBanner = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { uploadImage } = useImageUpload();
  const navigation = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const form = e.target;
    const photo = form.photo;
    const url = form.url.value;
    // const description = value;
    // const meta_tag = form.meta_tag.value;
    // const meta_description = form.meta_description.value;




    const data = {
      photo: await uploadImage(photo.files[0]), // Use uploaded image URLs here
      url,
      date: new Date(),
      status: false,
      // meta_tag,
      // meta_description,
    };

    fetch("http://localhost:6001/api/v1/api/v1/admin/banner/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        Swal.fire("Banner successfully added", "", "success");
        navigation('/admin/banner-management');
      });

    console.log(data, '+++++??>');

  };

  return (
    <div className="my-4">
      <AdminTitle title="Add Banner" />
      <form onSubmit={handleSubmit}>
        <br />

        <div className="mb-4">
          <label htmlFor="photo">Photo</label>
          <input
            name="photo"
            type="file"
            className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="url">URL</label>
          <input
            name="url"
            placeholder="Enter Blog Name"
            className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
            type="url"
          />
        </div>

        {/* <div className="mb-4">
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
        </div> */}
        {loading ? (
          <button
            disabled
            type="submit"
            className="px-3 py-1 flex items-center gap-2 rounded bg-[#631f31] text-[white]"
          >
            <div className="border-gray-300 h-[20px] w-[20px] animate-spin rounded-full border-[4px] border-t-[#c40424]" />
            Adding...
          </button>
        ) : (
          <button
            type="submit"
            className="px-3 py-1 rounded bg-[#b02449] text-[white]"
          >
            +Add
          </button>
        )}
      </form>
    </div>
  );
};

export default AddBanner;
