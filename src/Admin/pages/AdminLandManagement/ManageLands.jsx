/* eslint-disable no-unused-vars */
import { useState } from "react";
import AdminTitle from "../../../hooks/useAdminTitle";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
// import AlertModal from "../../../hooks/useAlertModal";
// import EditProject from "./EditProject";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { DB_URL } from "../../../const";

const ManageLand = () => {
    //   const [openModal, setOpenModal] = useState(false);
    //   const [on, setOn] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page
    // const [allLand, setallLands] = useState([])
    const { data: allLand = [], refetch, isLoading } = useQuery({
        queryKey: ["lands"],
        queryFn: async () => {
            const res = await fetch(`https://backend.seapropertiesltd.com.bd/api/v1/admin/land/lands`);
            const data = await res.json();
            return data.data;
        },
    });


    // Logic to calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allLand?.length && allLand.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to handle next page
    const nextPage = () => {
        if (currentPage < Math.ceil(allLand?.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Function to handle previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Generate pagination numbers
    const paginationNumbers = Array.from(
        { length: Math.ceil(allLand?.length / itemsPerPage) },
        (_, i) => i + 1
    );

    const deleteProject = (id) => {
        fetch(
            `https://backend.seapropertiesltd.com.bd/api/v1/admin/land/delete?land_id=${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                Swal.fire("Project Deleted Successfully", "", "success");
                refetch();
            })
            .catch((error) => {
                console.error("Error deleting project:", error);
            });
    };

    return (
        <div className="pt-3">
            <div className="flex items-center justify-between">
                <AdminTitle size={"20px"} title="Manage Land" />
                <Link to={`/admin/add-land`}>
                    <div className="bg-secondary text-[white] py-2 px-3 rounded">
                        + Add Land
                    </div>
                </Link>
            </div>
            {isLoading ? (
                <div className='h-[50vh] flex flex-col gap-3 items-center justify-center'>
                    <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-[red]"></div>
                    <p className="text-center">Loading...</p>
                </div>
            )
                :
                (
                    <div className="mt-2 shadow-sm border rounded overflow-x-auto">
                        <table className="w-full table-auto text-sm text-left">
                            <thead className="bg-[#e4e4e4] text-[#0d1113] font-medium border-[#bab9b9] border-b">
                                <tr>
                                    <th className="py-3 px-6">Image</th>
                                    <th className="py-3 px-6">Land Location</th>
                                    <th className="py-3 px-6">Date</th>
                                    <th className="py-3 px-6">Out of Sold</th>
                                    <th className="py-3 px-6">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 divide-y">
                                {isLoading && <h2 className="text-center text-xl font-[400] py-2">Loading Project ........</h2>}
                                {currentItems?.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                src={item?.project_photo}
                                                className="w-[60px] h-[60px] rounded object-cover"
                                                alt=""
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item?.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item?.date ? new Date(item.date).toLocaleString() : "N/A"}
                                        </td>
                                        <td className="px-6 font-semibold py-4 whitespace-nowrap">
                                            {
                                                item?.status ?
                                                    <div className="bg-[#0080001a] flex items-center justify-center text-[#2b932b] px-2 w-[100px] rounded-full h-[30px]">Enable</div>
                                                    :
                                                    <div className="bg-[#80000018] flex items-center justify-center text-[#f14141] px-2 w-[100px] rounded-full h-[30px]">Disable</div>
                                            }
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <ul className="flex items-center gap-2">
                                                <li>
                                                    <button onClick={() => deleteProject(item?._id)}>
                                                        <MdDeleteOutline className="text-2xl text-[red]" />
                                                    </button>
                                                </li>
                                                <li>
                                                    <Link to={`/admin/edit-land/${item?.sku}`}>
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
                )
            }
            {/* Pagination */}
            {!isLoading && <div className="flex justify-center mt-4">
                <button
                    onClick={prevPage}
                    className="mx-1 px-3 py-1 rounded bg-gray-200 text-[#d8d8d8] bg-[blue]"
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                {paginationNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === number
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={nextPage}
                    className="mx-1 px-3 py-1 rounded bg-gray-200 text-[#d8d8d8] bg-[blue]"
                    disabled={currentPage === Math.ceil(allLand.length / itemsPerPage)}
                >
                    Next
                </button>
            </div>}
        </div>
    );
};

export default ManageLand;
