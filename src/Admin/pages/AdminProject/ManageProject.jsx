import { useState } from "react";
import AdminTitle from "../../../hooks/useAdminTitle";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import AlertModal from "../../../hooks/useAlertModal";
import EditProject from "./EditProject";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";


const ManageProject = () => {
    const [openModal, setOpenModal] = useState(false);
    const [on, setOn] = useState(false);
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


    //get project
    const { data: projects = [], refetch: reload } = useQuery({
        queryKey: ["all_projects_location"],
        queryFn: async () => {
            const res = await fetch("https://sea-properties-server.vercel.app/api/v1");
            const data = await res.json();
            return data.data;
        },
    });

    // delete project
    const deleteProject = (id) => {
        fetch(`https://sea-properties-server.vercel.app/api/v1/project/delete?project_id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {

                Swal.fire('Delete Project successful', '', 'success')
                reload()

            })
            .catch((error) => {
                console.error('Error deleting project:', error);
            });
    }


    return (
        <div className="pt-3">
            <div className="flex items-center justify-between">
                <AdminTitle size={'20px'} title='Manage Project' />
                <Link to={`/admin/add-project`}>
                    <div className="bg-secondary text-[white] py-2 px-3 rounded">
                        + Add Project
                    </div>
                </Link>
            </div>
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
                                            <button onClick={() => deleteProject(1)} >
                                                <MdDeleteOutline className="text-2xl text-[red]" />
                                            </button>
                                        </li>
                                        <li>
                                            <Link to={`/admin/edit-project/123`}>
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