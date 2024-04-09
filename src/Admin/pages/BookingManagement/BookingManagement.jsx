import { useEffect, useState } from "react";
import AdminTitle from "../../../hooks/useAdminTitle";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import AlertModal from "../../../hooks/useAlertModal";
import Swal from "sweetalert2";
import useGetData from "../../../hooks/useGetData";

const BookingManagement = () => {
    const [openModal, setOpenModal] = useState(false);

    // Fetch data using custom hook
    const data = useGetData('api/v1/admin/booking/bookings');

    // delete data using custom hook
    const handleDelete = (id) => {
        console.log(id, '-------->');
        fetch(`https://sea-properties-server.vercel.app/api/v1/admin/booking/delete?booking_id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {

                Swal.fire('Booking deleted', '', 'success')
                // reload()
            })
            .catch((error) => {
                console.error('Error deleting project:', error);
            });
    }


    return (
        <div>
            <div className="pt-3">
                <div className="flex items-center justify-between">
                    <AdminTitle size={'20px'} title='Booking Management' />
                </div>
                <div className="mt-2 shadow-sm border rounded overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-[#e4e4e4] text-[#0d1113] font-medium border-[#bab9b9] border-b">
                            <tr>
                                <th className="py-3 px-6"> Name</th>
                                <th className="py-3 px-6">Email</th>
                                <th className="py-3 px-6">Number</th>
                                <th className="py-3 px-6">Message</th>
                                <th className="py-3 px-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {data?.data?.map((item, idx) => (
                                <tr key={idx}>

                                    <td className="px-6 py-4 whitespace-nowrap">{item?.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item?.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item?.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item?.message}</td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <ul className="flex items-center gap-2">
                                            <li>
                                                <button
                                                    onClick={() => handleDelete(item?._id)}
                                                >
                                                    <MdDeleteOutline className="text-2xl text-[red]" />
                                                </button>
                                            </li>
                                            {/* <li>
                                                <Link to={`/admin/edit-project/${item?._id}`}>
                                                    <TbEdit className="text-2xl text-[green]" />
                                                </Link>
                                            </li> */}
                                        </ul>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                {/* Pagination */}
                {/* <div className="flex justify-center mt-4">
                    <button onClick={prevPage} className="mx-1  px-3 py-1 rounded bg-gray-200 text-[#d8d8d8] bg-[blue]" disabled={currentPage === 1}>Prev</button>
                    {paginationNumbers.map((number) => (
                        <button key={number} onClick={() => paginate(number)} className={`mx-1 px-3 py-1 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                            {number}
                        </button>
                    ))}
                    <button onClick={nextPage} className="mx-1 px-3 py-1 rounded bg-gray-200 text-[#d8d8d8] bg-[blue]" disabled={currentPage === Math.ceil(projectData.length / itemsPerPage)}>Next</button>
                </div> */}
            </div>
        </div>

    );
};

export default BookingManagement;