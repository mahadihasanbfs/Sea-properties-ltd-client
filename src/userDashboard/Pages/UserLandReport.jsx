import { useContext, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { format } from "date-fns";
import { AuthContext } from "../../Provider/AuthProvider";

const UserLandReportManagement = () => {
    const [openModal, setOpenModal] = useState(false);
    const { user } = useContext(AuthContext)
    const { data: areaData = [], refetch } = useQuery({
        queryKey: ["landReport"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/api/v1/admin/get-user-booking?email=${user?.email}`);
            const data = await res.json();
            return data;
        },
    });

    console.log(`http://localhost:5001/api/v1/admin/get-user-booking?email=${user?.email}`);
    // delete data using custom hook 

    console.log(areaData?.data, '>>>>>>');

    return (
        <div className="pt-3">
            <div className="flex item-center pb-3 justify-between">
                <h1 className="font-bold text-xl">Booking History</h1>
                <Link to={"/land-registration-form"}>
                    <div className="dashboard_form_btn">+ Add New Booking</div>
                </Link>
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
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {format(new Date(item?.timestamp), 'dd-MMMM-yy (H:mm:ss)')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <ul className="flex items-center gap-2">
                                        {/* <li>
                                            <button onClick={() => handleDelete(item?._id)}>
                                                <MdDeleteOutline className="text-2xl text-[red]" />
                                            </button>
                                        </li> */}
                                        <li>
                                            <Link to={`/view-land-report/${item?._id}`}>
                                                <BsEye className="text-xl text-[#001aff]" />
                                            </Link>
                                        </li>
                                    </ul>
                                </td>

                            </tr>
                        ))}
                        {!areaData?.data?.length === 0 || areaData?.data == undefined &&
                            <tr>
                                <td colSpan={4} className="text-center py-4 font-semibold text-red-500">No Data Found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserLandReportManagement;
