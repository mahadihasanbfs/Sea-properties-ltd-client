/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AdminTitle from "../../../hooks/useAdminTitle";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import AlertModal from "../../../hooks/useAlertModal";
import Swal from "sweetalert2";
import useGetData from "../../../hooks/useGetData";
import { useQuery } from "@tanstack/react-query";
import { BsEye } from "react-icons/bs";
import { format } from "date-fns";

const BookingManagement = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    // Fetch data using custom hook
    // const data = useGetData('api/v1/admin/booking/bookings');

    const { data: data = [], refetch, isLoading } = useQuery({
        queryKey: ["bookingData"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/api/v1/admin/booking/bookings`);
            const data = await res.json();
            return data;
        },
    });

    console.log(data);


    // delete data using custom hook
    const handleDelete = (id) => {
        fetch(`http://localhost:5001/api/v1/admin/booking/delete?booking_id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {

                Swal.fire('Booking Deleted Successfully', '', 'success')
                refetch()
            })
            .catch((error) => {
                console.error('Error deleting project:', error);
            });
    }


    const handleCheckboxChange = (id) => {
        const selectedIndex = selectedItems.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = [...selectedItems, id];
        } else {
            newSelected = selectedItems.filter((itemId) => itemId !== id);
        }

        setSelectedItems(newSelected);
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            const allIds = contactData.map((item) => item._id);
            setSelectedItems(allIds);
        }
        setSelectAll(!selectAll);
    };

    const handleSendEmail = () => {
        const emails = selectedItems.map((itemId) =>
            contactData.find((item) => item._id === itemId).email
        );
        const recipientList = emails.join(",");
        const subject = encodeURIComponent("Your Subject");
        const body = encodeURIComponent("Your Message");
        window.location.href = `mailto:${recipientList}?subject=${subject}&body=${body}`;
    };

    return (
        <div>
            <div className="pt-3">
                <div className="flex items-center justify-between">
                    <AdminTitle size={'20px'} title='Booking Management' />
                    <button
                        onClick={handleSendEmail}
                        className="bg-blue-500 hover:bg-blue-700 bg-[#006aff] text-[white] py-2 px-4 rounded"
                        disabled={selectedItems.length === 0}>
                        Send Email
                    </button>
                </div>
                {isLoading ?
                    <div className='md:h-[50vh] flex flex-col gap-3 items-center justify-center'>
                        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-[red]"></div>
                        <p className="text-center">Loading...</p>
                    </div>
                    :
                    <div className="mt-2 shadow-sm border rounded overflow-x-auto">
                        <table className="w-full table-auto text-sm text-left">
                            <thead className="bg-[#e4e4e4] text-[#0d1113] font-medium border-[#bab9b9] border-b">
                                <tr>
                                    <th className="py-3 px-6 flex gap-2">  <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll} />Name</th>
                                    <th className="py-3 px-6">Email</th>
                                    <th className="py-3 px-6">Number</th>
                                    <th className="py-3 px-6">Date</th>
                                    <th className="py-3 px-6">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 divide-y">
                                {data?.data?.map((item, idx) => (
                                    <tr key={idx}>

                                        <td className="px-6 py-4 whitespace-nowrap flex gap-2">  <input
                                            type="checkbox"
                                            checked={selectedItems.includes(item._id)}
                                            onChange={() => handleCheckboxChange(item._id)}
                                        /> {item?.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item?.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item?.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap"> {item.date && format(new Date(item?.date), 'dd-MMMM-yy (H:mm:ss)')}</td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <ul className="flex items-center gap-2">
                                                <li>
                                                    <button
                                                        onClick={() => handleDelete(item?._id)}
                                                    >
                                                        <MdDeleteOutline className="text-2xl text-[red]" />
                                                    </button>
                                                </li>
                                                <li>
                                                    <button onClick={() => setOpenModal(item)}>
                                                        <BsEye className="text-2xl text-[green]" />
                                                    </button>
                                                </li>
                                            </ul>
                                        </td>
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
                                                    <div>
                                                        <p>  <span className="font-bold">Message:</span> {item.message}</p>
                                                        <br />
                                                        <a href={`mailto:${item.email}`} className=" px-3 py-2 bg-dark text-light">Send Reply</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }


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