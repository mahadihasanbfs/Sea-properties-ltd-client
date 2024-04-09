import { useState } from "react";
import AdminTitle from "../../../hooks/useAdminTitle";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";


const ManageBlog = () => {
    const [openModal, setOpenModal] = useState(false);
    const [myValue, setMyValue] = useState(openModal?.description);


    // Fetch data using custom hook
    const blogData = useGetData('api/v1/admin/blog/blogs');


    // Logic to calculate pagination
    console.log(blogData, '*-*-**', openModal?.description);


    // delete data using custom hook
    const handleDelete = (id) => {
        console.log(id, '-------->');
        fetch(`https://sea-properties-server.vercel.app/api/v1/admin/blog/delete?blog_id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {

                Swal.fire('Blog deleted', '', 'success')
                // reload()
            })
            .catch((error) => {
                console.error('Error deleting project:', error);
            });
    }

    console.log(blogData, '======');
    return (
        <div className="pt-3">
            <div className="flex item-center pb-3 justify-between">
                <AdminTitle size={'20px'} title='Manage Blog' />

                <Link to={'/admin/add-blog'}>
                    <div className="dashboard_form_btn">+Add Blog</div>
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
                        {blogData?.data?.map((item, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img src={item?.photo} className="w-[60px] h-[60px] rounded object-cover" alt="" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item?.name}</td>
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
                                    <div onClick={() => setOpenModal(false)} className={`fixed z-[100] flex items-center justify-center ${openModal?._id == item._id ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}>

                                        <div onClick={(e_) => e_.stopPropagation()} className={`text- absolute md:w-[500px] rounded-sm bg-[white] p-6 drop-shadow-lg dark:bg-black dark:text-white ${openModal?.id == item.id ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'} z-[100]`}>
                                            <div className="">
                                                <h2 className="text-xl font-bold mb-4">Edit </h2>
                                                <form onSubmit={``}>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="img">img:</label>
                                                        <input
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            id="img"
                                                            type="file"
                                                            name="img"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalAmount">Total Amount:</label>
                                                        <input
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            id="name"
                                                            type="text"
                                                            name="name"
                                                            defaultValue={item.name}
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="due">Due:</label>

                                                        <ReactQuill className="rounded-lg w-full border border-[#336cb6] h-[200px] overflow-hidden text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2" theme="snow" value={myValue} onChange={setMyValue} />
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

export default ManageBlog;