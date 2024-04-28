import ReactQuill from "react-quill";
import AdminTitle from "../../Component/AdminTitle";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import useImageUpload from "../../../hooks/useUploadImg";
import Swal from "sweetalert2";

const AddTestimonials = () => {
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
        const position = form.position.value;
        // const description = value;
        const description = form.description.value;

        const data = {
            photo,
            name,
            position,
            date: new Date(),
            status: false,
            description,

        };

        fetch("https://sea-properties-server.vercel.app/api/v1/admin/testimonial/add_testimonial", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                Swal.fire("Testimonial successfully added", "", "success");
                // navigate('/admin/project-management');
            });

        console.log(data);
    };
    return (
        <div className="my-4">
            <AdminTitle title="Add Testimonial" />
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
                    <label htmlFor="position">Position</label>
                    <input
                        name="position"
                        placeholder="Enter position"
                        className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                        type="text"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="meta_description">Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter Description"
                        className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                        type="text"
                    />
                </div>
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

export default AddTestimonials;
