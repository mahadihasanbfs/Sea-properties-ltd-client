import { useState } from "react";
import AdminTitle from "../../../hooks/useAdminTitle";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import { useQuery } from "@tanstack/react-query";

const ManageTestimonial = () => {
    const [openModal, setOpenModal] = useState(false);
    const [myValue, setMyValue] = useState(openModal?.description);

    // Fetch data using custom hook
    const { data: testimonialData = [], refetch } = useQuery({
        queryKey: ["adminTestimonialAdd"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/api/v1/admin/testimonial`);
            const data = await res.json();
            return data;
        },
    });

    const handleDelete = (id) => {
        fetch(
            `http://localhost:5001/api/v1/admin/testimonial?testimonialId=${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                Swal.fire("Testimonial deleted", "", "success");
                refetch();// reload()
            })
            .catch((error) => {
                console.error("Error deleting testimonial:", error);
            });
    };

    console.log(testimonialData, "======");
    return (
        <div className="pt-3">
            <div className="flex item-center pb-3 justify-between">
                <AdminTitle size={"20px"} title="Manage Testimonial" />

                <Link to={"/admin/add-testimonial"}>
                    <div className="dashboard_form_btn">+ Add Testimonial</div>
                </Link>
            </div>

            <div className="mt-2 shadow-sm border rounded overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-[#e4e4e4] text-[#0d1113] font-medium border-[#bab9b9] border-b">
                        <tr>
                            <th className="py-3 px-6">Image</th>
                            <th className="py-3 px-6"> Name</th>
                            <th className="py-3 px-6"> Position</th>
                            <th className="py-3 px-6">Description</th>
                            <th className="py-3 px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {testimonialData?.map((item, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img
                                        src={item?.photo}
                                        className="w-[60px] h-[60px] border rounded-full object-cover"
                                        alt=""
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item?.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item?.position}</td>
                                <td className="px-6 py-4 whitespace-wrap w-[300px]">{item?.description.slice(0, 100)}...</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <ul className="flex items-center gap-2">
                                        <li>
                                            <button onClick={() => handleDelete(item?._id)}>
                                                <MdDeleteOutline className="text-2xl text-[red]" />
                                            </button>
                                        </li>
                                        {/* <li>
                                            <button onClick={() => setOpenModal(item)}>
                                                <TbEdit className="text-2xl text-[green]" />
                                            </button>
                                        </li> */}
                                    </ul>
                                </td>
                                {/* modal */}

                                {/* end modal */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTestimonial;
