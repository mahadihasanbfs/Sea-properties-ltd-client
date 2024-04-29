import { useState } from "react";
import AdminTitle from "../../../hooks/useAdminTitle";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import { useQuery } from "@tanstack/react-query";
import useImageUpload from "../../../hooks/useUploadImg";

const BannerManagement = () => {
    const [openModal, setOpenModal] = useState(false);
    const [myValue, setMyValue] = useState(openModal?.description);

    // Fetch data using custom hook

    const { data: bData = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch(`https://sea-properties-server.vercel.app/api/v1/admin/banner/banners`);
            const data = await res.json();
            return data;
        },
    });

    const { uploadImage } = useImageUpload();

    // handle edit
    const handleEdit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const img = form.img.files[0];
        const URL = form.url.value;
        const position = form?.position.value;

        let photo;
        if (img) {
            photo = await uploadImage(img);
        } else {
            // Assign default image URL or whatever default value you have for the image
            photo = openModal?.photo;
        }

        const data = {
            photo,
            url: URL ? URL : openModal?.url,
            position: position ? position : openModal?.position,
            date: new Date()
        };

        // Make the PUT request
        fetch(`https://sea-properties-server.vercel.app/api/v1/admin/banner/update?banner_id=${openModal?._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                refetch();
                // Handle success response
                console.log('Edit successful:', result);
                setOpenModal(false); // Close modal after successful submission
            })

        setOpenModal(false)

        console.log('Form data:', data);
    };

    // delete data using custom hook
    const handleDelete = (id) => {
        fetch(
            `http://localhost:5001/api/v1/admin/banner/delete?banner_id=${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                Swal.fire("Banner Deleted", "", "success");
                refetch()
            })
            .catch((error) => {
                console.error("Error deleting Banner:", error);
            });
    };

    return (
        <div className="pt-3">
            <div className="flex item-center pb-3 justify-between">
                <AdminTitle size={"20px"} title="Manage Banner" />
                <Link to={"/admin/add-banner"}>
                    <div className="dashboard_form_btn">+Add Banner</div>
                </Link>
            </div>

            <div className="mt-2 shadow-sm border rounded overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-[#e4e4e4] text-[#0d1113] font-medium border-[#bab9b9] border-b">
                        <tr>
                            <th className="py-3 px-6">Image</th>
                            <th className="py-3 px-6"> URL</th>
                            <th className="py-3 px-6"> Position</th>
                            <th className="py-3 px-6">Date</th>
                            <th className="py-3 px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {bData?.data?.map((item, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img
                                        src={item?.photo}
                                        className="w-[60px] h-[60px] rounded object-cover"
                                        alt=""
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-wrap w-[200px]">{item?.url}</td>
                                <td className="px-6 py-4 whitespace-wrap w-[200px]">{item?.position ? item?.position : 'No Entry'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item?.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <ul className="flex items-center gap-2">
                                        <li>
                                            <button onClick={() => handleDelete(item?._id)}>
                                                <MdDeleteOutline className="text-2xl text-[red]" />
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => setOpenModal(item)}>
                                                <TbEdit className="text-2xl text-[green]" />
                                            </button>
                                        </li>
                                    </ul>
                                </td>
                                {/* modal */}
                                <div>
                                    <div
                                        onClick={() => setOpenModal(false)}
                                        className={`fixed z-[100] flex items-center justify-center ${openModal?._id == item._id
                                            ? "visible opacity-100"
                                            : "invisible opacity-0"
                                            } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                                    >
                                        <div
                                            onClick={(e_) => e_.stopPropagation()}
                                            className={`text- absolute md:w-[500px] rounded-sm bg-[white] p-6 drop-shadow-lg dark:bg-black dark:text-white ${openModal?.id == item.id
                                                ? "scale-1 opacity-1 duration-300"
                                                : "scale-0 opacity-0 duration-150"
                                                } z-[100]`}
                                        >
                                            <div className="">
                                                <h2 className="text-xl font-bold mb-4">Edit </h2>
                                                <form onSubmit={handleEdit}> {/* Attach handleEdit to the onSubmit event of the form */}
                                                    {/* Form inputs */}
                                                    <div className="mb-4">
                                                        <label
                                                            className="block text-gray-700 text-sm font-bold mb-2"
                                                            htmlFor="img"
                                                        >
                                                            img:
                                                        </label>
                                                        <input
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            id="img"
                                                            type="file"
                                                            name="img"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label
                                                            className="block text-gray-700 text-sm font-bold mb-2"
                                                            htmlFor="totalAmount"
                                                        >
                                                            URL:
                                                        </label>
                                                        <input
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            id="name"
                                                            type="text"
                                                            name="url"
                                                            defaultValue={item.url}
                                                        />
                                                    </div>
                                                    <select
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        name="position" id="">
                                                        <option value="hero_slider">Hero Slider</option>
                                                        <option value="footer_slider">Footer Slider</option>
                                                    </select>
                                                    <br /><br />

                                                    {/* Update and Close buttons */}
                                                    <div className="flex items-center justify-between">
                                                        <button
                                                            onClick={() => setOpenModal(false)}
                                                            className="bg-[red] text-[white] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                            type="button"
                                                        >
                                                            Close
                                                        </button>
                                                        <button
                                                            className="bg-[blue] text-[white] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                            type="submit"
                                                        >
                                                            Update
                                                        </button>
                                                    </div>
                                                </form>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* end modal */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BannerManagement;
