import { useState } from "react";
import AdminTitle from "../../../hooks/useAdminTitle";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import useGetData from "../../../hooks/useGetData";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const LandReportManagement = () => {
    const [openModal, setOpenModal] = useState(false);

    const { data: areaData = [], refetch } = useQuery({
        queryKey: ["allBlog"],
        queryFn: async () => {
            const res = await fetch('https://sea-properties-server.vercel.app/api/v1/admin/all-land-registration');
            const data = await res.json();
            return data;
        },
    });

    // delete data using custom hook
    const handleDelete = (id) => {
        fetch(
            `https://sea-properties-server.vercel.app/api/v1/admin/delete-land-registration?id=${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                Swal.fire("Data deleted", "", "success");
                refetch()
            })
            .catch((error) => {
                console.error("Error deleting project:", error);
            });
    };
    const formatDate = (dateString) => {
        const year = dateString.substring(4);
        const month = dateString.substring(2, 4);
        const day = dateString.substring(0, 2);
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    };



    return (
        <div className="pt-3">
            <div className="flex item-center pb-3 justify-between">
                <AdminTitle size={"20px"} title="Land Report" />

            </div>

            <div className="mt-2 shadow-sm border rounded overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-[#e4e4e4] text-[#0d1113] font-medium border-[#bab9b9] border-b">
                        <tr>
                            <th className="py-3 px-6">Image</th>
                            <th className="py-3 px-6"> Name</th>
                            <th className="py-3 px-6">Date</th>
                            <th className="py-3 px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {areaData?.data?.map((item, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img
                                        src={item?.img}
                                        className="w-[60px] h-[60px] rounded object-cover"
                                        alt=""
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item?.englishName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{
                                    formatDate(item?.submitData)
                                }</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <ul className="flex items-center gap-2">
                                        <li>
                                            <button onClick={() => handleDelete(item?._id)}>
                                                <MdDeleteOutline className="text-2xl text-[red]" />
                                            </button>
                                        </li>
                                        <li>
                                            <Link to={`/admin/edit-land-area/${item?._id}`}>
                                                <TbEdit className="text-2xl text-[green]" />
                                            </Link>
                                        </li>
                                    </ul>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LandReportManagement;
