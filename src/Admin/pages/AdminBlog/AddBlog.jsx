import ReactQuill from "react-quill";
import AdminTitle from "../../Component/AdminTitle";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import useImageUpload from "../../../hooks/useUploadImg";
import Swal from "sweetalert2";

const AddBlog = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  // image upload from custom hooks
  const { uploadImage } = useImageUpload();

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const photo = await uploadImage(form.photo.files[0]);
    const name = form.name.value;
    const description = value;
    const meta_tag = form.meta_tag.value;
    const meta_description = form.meta_description.value;

    const data = {
      photo,
      name,
      date: new Date(),
      status: false,
      description,
      meta_tag,
      meta_description,
    };

    fetch("https://sea-properties-server.vercel.app/api/v1/admin/blog/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        Swal.fire("Blog successfully added", "", "success");
        // navigate('/admin/project-management');
      });

    console.log(data);
  };
  return (
    <div className="my-4">
      <AdminTitle title="Add Blog" />
      <form onSubmit={handleSubmit}>
        <br />
        <div className="mb-4">
          <label htmlFor="photo">Photo</label>
          <input
            name="photo"
            placeholder="Enter Blog Name"
            className="rounded-lg w-full border border-[#336cb6] px-4 py-2 bg-[white] text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
            type="file"
          />
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
          <label htmlFor="photo">Description</label>
          <ReactQuill
            className="rounded-lg w-full border border-[#336cb6] h-[200px] overflow-hidden text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
            theme="snow"
            value={value}
            onChange={setValue}
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
            Add Blog
          </button>
        )}
      </form>
    </div>
  );
};

export default AddBlog;
