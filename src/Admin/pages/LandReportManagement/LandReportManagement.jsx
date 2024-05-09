import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import useGetData from "../../../hooks/useGetData";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import AdminTitle from "../../../hooks/useAdminTitle";


const LandReportManagement = () => {
    const [openModal, setOpenModal] = useState(false);
    // const navigate = useNavigate()

    const { data: areaData = [], refetch, isLoading } = useQuery({
        queryKey: ["allBlog"],
        queryFn: async () => {
            const res = await fetch('https://backend.seapropertiesltd.com.bd/api/v1/admin/all-land-registration');
            const data = await res.json();
            return data;
        },
    });



    // delete data using custom hook
    const handleDelete = (id) => {
        fetch(
            `https://backend.seapropertiesltd.com.bd/api/v1/admin/delete-land-registration?id=${id}`,
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




    console.log(areaData?.data, '>>>>>>');
    return (
        <div className="pt-3">
            <div className="flex item-center pb-3 justify-between">
                <AdminTitle size={"20px"} title="Booking Management" />

                <Link to="/land-registration-form" className="bg-[#1a2635] text-[white] px-5 py-2 rounded-md">Add New</Link>
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
                        {isLoading && <h2 className="text-center text-xl font-[400] py-2">Loading  ........</h2>}
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
                                        <li>
                                            <Link to={`/view-land-report/${item?._id}`}>
                                                <BsEye className="text-xl text-[#001aff]" />
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
