import { useState } from "react";
import AdminTitle from "../../../hooks/useAdminTitle";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";


const ManageProject = () => {
    const [openModal, setOpenModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page

    const projectData = [
        {
            id: 1,
            img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: 'project 1',
            date: new Date().getTime(),
            address: 'dhaka',

        },
        {
            id: 2,
            img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: 'project 1',
            date: new Date().getTime(),
            address: 'dhaka',

        },
        {
            id: 3,
            img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: 'project 1',
            date: new Date().getTime(),
            address: 'dhaka',

        },
        // Add more items as needed with unique IDs
    ];


    // Logic to calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = projectData.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to handle next page
    const nextPage = () => {
        if (currentPage < Math.ceil(projectData.length / itemsPerPage)) {
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
    const paginationNumbers = Array.from({ length: Math.ceil(projectData.length / itemsPerPage) }, (_, i) => i + 1);


    // edit
    const handleSave = (e) => {
        e.preventDefault();
        const img = e.target.img.value;
        const totalAmount = e.target.totalAmount.value;
        const date = new Date().getTime();
        const due = e.target.due.value;
        const remingBalance = e.target.remingBalance.value;

        const editedItem = {
            img,
            totalAmount,
            date,
            due,
            remingBalance
        };

        console.log(editedItem);
    };
    return (
        <div className="pt-3">
            <AdminTitle size={'20px'} title='Manage Project' />

            <div className="mt-2 shadow-sm border rounded overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-[#e4e4e4] text-[#0d1113] font-medium border-[#bab9b9] border-b">
                        <tr>
                            <th className="py-3 px-6">Image</th>
                            <th className="py-3 px-6">Project Name</th>
                            <th className="py-3 px-6">Date</th>
                            <th className="py-3 px-6">Address</th>
                            <th className="py-3 px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {currentItems.map((item, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img src={item.img} className="w-[60px] h-[60px] rounded object-cover" alt="" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(item.date).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.address}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <ul className="flex items-center gap-2">
                                        <li>
                                            <button >
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
                                    <div onClick={() => setOpenModal(false)} className={`fixed z-[100] flex items-center justify-center ${openModal?.id == item.id ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}>

                                        <div onClick={(e_) => e_.stopPropagation()} className={`text- absolute md:w-[500px] rounded-sm bg-[white] p-6 drop-shadow-lg dark:bg-black dark:text-white ${openModal?.id == item.id ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'} z-[100]`}>
                                            <div className="">
                                                <h2 className="text-xl font-bold mb-4">Edit </h2>
                                                <form onSubmit={handleSave}>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="img">img:</label>
                                                        <input
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            id="img"
                                                            type="text"
                                                            name="img"
                                                            defaultValue={item.img}
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalAmount">Total Amount:</label>
                                                        <input
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            id="totalAmount"
                                                            type="number"
                                                            name="totalAmount"
                                                            defaultValue={item.totalAmount}
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="due">Due:</label>
                                                        <input
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            id="due"
                                                            type="number"
                                                            name="due"
                                                            defaultValue={item.due}
                                                        />
                                                    </div>
                                                    <div className="mb-6">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remainingBalance">Remaining Balance:</label>
                                                        <input
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            id="remainingBalance"
                                                            type="number"
                                                            name="remainingBalance"
                                                            defaultValue={item.remainingBalance}
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <button
                                                            className="bg-[blue] text-[white] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                            type="submit"
                                                        >
                                                            Update
                                                        </button>
                                                        <button
                                                            onClick={() => setOpenModal(false)}
                                                            className="bg-[red] text-[white] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                            type="button"
                                                        >
                                                            Close
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

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <button onClick={prevPage} className="mx-1  px-3 py-1 rounded bg-gray-200 text-[#d8d8d8] bg-[blue]" disabled={currentPage === 1}>Prev</button>
                {paginationNumbers.map((number) => (
                    <button key={number} onClick={() => paginate(number)} className={`mx-1 px-3 py-1 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                        {number}
                    </button>
                ))}
                <button onClick={nextPage} className="mx-1 px-3 py-1 rounded bg-gray-200 text-[#d8d8d8] bg-[blue]" disabled={currentPage === Math.ceil(projectData.length / itemsPerPage)}>Next</button>
            </div>
        </div>
    );
};

export default ManageProject;