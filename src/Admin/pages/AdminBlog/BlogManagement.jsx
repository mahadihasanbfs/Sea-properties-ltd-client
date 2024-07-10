/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import AdminTitle from "../../../hooks/useAdminTitle";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import { useQuery } from "@tanstack/react-query";
import useImageUpload from "../../../hooks/useUploadImg";
import JoditEditor from "jodit-react";

const ManageBlog = () => {
  const [openModal, setOpenModal] = useState(false);

  const [content, setContent] = useState('');
  const editor = useRef(null);
  // Fetch data using custom hook
  // const blogData = useGetData("api/v1/admin/blog/blogs");
  const { data: blogData = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`https://backend.seapropertiesltd.com.bd/api/v1/admin/blog/blogs`);
      const data = await res.json();
      return data;
    },
  });

  const [loading, setLoading] = useState(false)


  const { uploadImage } = useImageUpload();
  // edit blog
  const handleEdit = async (e) => {
    e.preventDefault();

    setLoading(true)
    const form = e.target;
    const img = form.img.files[0];
    const description = form.description.value;
    const name = form.title.value;

    let photo;
    if (img) {
      photo = await uploadImage(img);
    } else {
      // Assign default image URL or whatever default value you have for the image
      photo = openModal?.photo;
    }

    const data = {
      photo,
      description,
      name: name,
    };

    // Make the PUT request
    fetch(`https://backend.seapropertiesltd.com.bd/api/v1/admin/blog/update?blog_id=${openModal?._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        refetch();
        setLoading(false)
        Swal.fire("Blog Updated", "", "success");
        setOpenModal(false);
      })
    setLoading(false)
    setOpenModal(false)


  };


  // delete data using custom hook
  const handleDelete = (id) => {
    fetch(
      `https://backend.seapropertiesltd.com.bd/api/v1/admin/blog/delete?blog_id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        refetch()
        Swal.fire("Blog Deleted", "", "success");
        // reload()
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
      });
  };

  console.log(blogData, "======");
  return (
    <div className="pt-3">
      <div className="flex item-center pb-3 justify-between">
        <AdminTitle size={"20px"} title="Manage Blog" />

        <Link to={"/admin/add-blog"}>
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
                  <img
                    src={item?.photo}
                    className="w-[60px] h-[60px] rounded object-cover"
                    alt=""
                  />
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
                <div className="">
                  <div
                    onClick={() => setOpenModal(false)}
                    className={`fixed z-[100] flex  items-center justify-center ${openModal?._id == item._id
                      ? "visible opacity-100"
                      : "invisible opacity-0"
                      } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                  >
                    <div
                      onClick={(e_) => e_.stopPropagation()}
                      className={`text- absolute md:w-[500px] h-[80%] overflow-y-scroll rounded-sm bg-[white] p-6 drop-shadow-lg dark:bg-black dark:text-white ${openModal?.id == item.id
                        ? "scale-1 opacity-1 duration-300"
                        : "scale-0 opacity-0 duration-150"
                        } z-[100]`}
                    >
                      <div className="">
                        <h2 className="text-xl font-bold mb-4">Edit </h2>
                        <form onSubmit={handleEdit}>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="img"
                            >
                              img:
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="img"
                              type="file"
                              name="img"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="totalAmount"
                            >
                              Name:
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="name"
                              type="text"
                              name="title"
                              defaultValue={item?.name}
                            />
                          </div>
                          <div className="mb-4 h-[80%] overflow-y-auto">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="due"
                            >
                              Description:
                            </label>

                            <JoditEditor

                              name="description"
                              value={item?.description}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => setOpenModal(false)}
                              className="bg-[red] text-[white] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="button"
                            >
                              Close
                            </button>
                            {loading ? <button className="bg-[blue] text-[white] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Updating ..</button> : <button

                              className="bg-[blue] text-[white] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="f"
                            >
                              Update
                            </button>}
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
