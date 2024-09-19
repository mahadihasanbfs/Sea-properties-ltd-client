/* eslint-disable no-unused-vars */
import { useState } from "react";
import AdminTitle from "../../../hooks/useAdminTitle";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import { useQuery } from "@tanstack/react-query";
import { format } from 'date-fns';
import useImageUpload from "../../../hooks/useUploadImg";
import JoditEditor from "jodit-react";

const NewsEventManagement = () => {
      const [openModal, setOpenModal] = useState(false);
      const [myValue, setMyValue] = useState(openModal?.description);

      // Fetch data using custom hook
      // const blogData = useGetData("api/v1/admin/blog/blogs");
      const { data: blogData = [], refetch } = useQuery({
            queryKey: ["news_events"],
            queryFn: async () => {
                  const res = await fetch(`https://backend.seapropertiesltd.com.bd/api/v1/admin/news-events`);
                  const data = await res.json();
                  return data;
            },
      });



      // delete data using custom hook
      const handleDelete = (id) => {

            fetch(
                  `https://backend.seapropertiesltd.com.bd/api/v1/admin/delete_news_event?id=${id}`,
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
                        Swal.fire("News Event Deleted Successfully", "", "success");
                        // reload()
                  })
                  .catch((error) => {
                        console.error("Error deleting project:", error);
                  });
      };

      const [value, setValue] = useState("");
      const [loading, setLoading] = useState(false);

      const [images, setImages] = useState([]);

      const handleImageChange = (e) => {
            const fileList = Array.from(e.target.files);
            const newImages = fileList.map((file) => ({
                  file: file,
                  url: URL.createObjectURL(file)
            }));
            setImages([...images, ...newImages]);
      };


      const handleImageRemove = (index) => {
            const updatedImages = [...images];
            updatedImages.splice(index, 1);
            setImages(updatedImages);
      };

      // image upload from custom hooks
      const { uploadImage } = useImageUpload();



      // submit handler
      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            const form = e.target;
            const photo = await uploadImage(form.photo.files[0])
            const name = form.name.value
            const status = form.status.value
            const description = value
            const meta_tag = form.meta_tag.value
            const meta_description = form.meta_description.value

            let galleryImageUrls = [];

            for (let i = 0; i < images.length; i++) {
                  const imageUrl = await uploadImage(images[i].file);

                  galleryImageUrls.push(imageUrl);
            }


            const cleanData = (obj) => {
                  return Object.fromEntries(
                        Object.entries(obj).filter(
                              ([_, value]) => value !== null && value !== undefined && value !== "" && !(Array.isArray(value) && value.length === 0)
                        )
                  );
            };

            const data = {
                  galleryImg: galleryImageUrls,
                  featureImg: photo,
                  title: name,
                  date: new Date(),
                  status: false,
                  type: status,
                  description,
                  meta_tag,
                  meta_description,
            };

            const cleanedData = cleanData(data);



            fetch(`https://backend.seapropertiesltd.com.bd/api/v1/admin/update_news_event?id=${openModal?._id}`, {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(cleanedData),
            })
                  .then((res) => res.json())
                  .then((data) => {

                        refetch()
                        setLoading(false);
                        Swal.fire("News Event Updated Successfully", "", "success");
                        setImages([])
                        setOpenModal(false)
                  });

      };

      return (
            <div className="pt-3">
                  <div className="flex item-center pb-3 justify-between">
                        <AdminTitle size={"20px"} title="Manage News Event" />

                        <Link to={"/admin/add-news-event"}>
                              <div className="dashboard_form_btn">+ Add News Event</div>
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
                                                            src={item?.featureImg}
                                                            className="w-[60px] h-[60px] rounded object-cover"
                                                            alt=""
                                                      />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item?.title}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{format(new Date(item?.date), 'dd-MMMM-yy (H:mm:ss)')}</td>
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
                                                      <div
                                                            onClick={() => setOpenModal(false)}
                                                            className={`fixed z-[100] flex items-center justify-center ${openModal?._id == item._id
                                                                  ? "visible opacity-100"
                                                                  : "invisible opacity-0"
                                                                  } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                                                      >
                                                            <div
                                                                  onClick={(e_) => e_.stopPropagation()}
                                                                  className={`text- absolute md:w-[500px]  overflow-y-auto  rounded-sm h-[80%] my-20 bg-[white] p-6 drop-shadow-lg dark:bg-black dark:text-white ${openModal?.id == item.id
                                                                        ? "scale-1 opacity-1 duration-300"
                                                                        : "scale-0 opacity-0 duration-150"
                                                                        } z-[100]`}
                                                            >
                                                                  <div className=" ">
                                                                        <h2 className="text-xl font-bold mb-4">Edit </h2>
                                                                        <form onSubmit={handleSubmit}>
                                                                              <div className="mb-4">
                                                                                    <label htmlFor="photo">Title</label>
                                                                                    <input
                                                                                          name="name"
                                                                                          defaultValue={openModal.title}
                                                                                          placeholder="Enter News Events Title"
                                                                                          className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                                                                                          type="text"
                                                                                    />
                                                                              </div>

                                                                              <div className="mb-4">
                                                                                    <label htmlFor="photo">Feature Image</label>
                                                                                    <input
                                                                                          name="photo"
                                                                                          placeholder="Enter Blog Name"
                                                                                          className="rounded-lg w-full border border-[#336cb6] px-4 py-2 bg-[white] text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                                                                                          type="file"
                                                                                    />
                                                                              </div>

                                                                              <div className="mb-4">
                                                                                    <label htmlFor="photo">Description</label>
                                                                                    <JoditEditor
                                                                                          className="rounded-lg w-full border border-[#336cb6] h-[200px] overflow-hidden  ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                                                                                          theme="snow"
                                                                                          value={openModal.description}
                                                                                          onChange={setValue}
                                                                                    />
                                                                              </div>


                                                                              <div className="space-y-2 mb-4">
                                                                                    <label htmlFor="photo">Gallery Image</label>
                                                                                    <div className="flex items-center space-x-2">
                                                                                          <input
                                                                                                name='images'
                                                                                                className="w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:outline-none"
                                                                                                id="images"
                                                                                                multiple
                                                                                                type="file"
                                                                                                onChange={handleImageChange}
                                                                                          />
                                                                                    </div>
                                                                                    <div className="md:grid md:grid-cols-6 gap-4">
                                                                                          {images.map((image, index) => (
                                                                                                <div className="relative h-30" key={index}>
                                                                                                      <img
                                                                                                            alt={`Image ${index + 1}`}
                                                                                                            className="h-full w-full border rounded-md object-cover"
                                                                                                            src={image.url}
                                                                                                      />
                                                                                                      <button
                                                                                                            className="absolute top-1 right-1 rounded-full bg-dark bg-gray-800 p-1 text-light hover:bg-[#336cb6] focus:outline-none focus:ring-2 focus:ring-gray-500"
                                                                                                            type="button"
                                                                                                            onClick={() => handleImageRemove(index)}
                                                                                                      >
                                                                                                            <svg
                                                                                                                  className="h-4 w-4"
                                                                                                                  fill="currentColor"
                                                                                                                  viewBox="0 0 20 20"
                                                                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                                                            >
                                                                                                                  <path
                                                                                                                        clipRule="evenodd"
                                                                                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                                                                        fillRule="evenodd"
                                                                                                                  />
                                                                                                            </svg>
                                                                                                      </button>
                                                                                                </div>
                                                                                          ))}
                                                                                    </div>
                                                                              </div>

                                                                              <label htmlFor="tag">Status</label>
                                                                              <div className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2 mb-4">
                                                                                    <select
                                                                                          selected={openModal.type}
                                                                                          name="status"
                                                                                          className="outline-none w-full bg-[transparent]">

                                                                                          <option value="news" >News</option>
                                                                                          <option value="event" >Event</option>
                                                                                    </select>
                                                                              </div>

                                                                              <div className="mb-4">
                                                                                    <label htmlFor="tag">Meta Tag</label>
                                                                                    <input
                                                                                          defaultValue={openModal.meta_tag}
                                                                                          name="meta_tag"
                                                                                          placeholder="Enter Meta Tags"
                                                                                          className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                                                                                          type="text"
                                                                                    />
                                                                              </div>
                                                                              <div className="mb-4">
                                                                                    <label htmlFor="meta_description">Meta Description</label>
                                                                                    <textarea
                                                                                          defaultValue={openModal.meta_description}
                                                                                          name="meta_description"
                                                                                          placeholder="Enter Meta Description"
                                                                                          className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                                                                                          type="text"
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
                                                                                    <button
                                                                                          // onClick={() => setOpenModal(false)}
                                                                                          className="bg-[blue] text-[white] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                                                          type="submit"
                                                                                    >
                                                                                          Update
                                                                                    </button>
                                                                              </div>
                                                                              {/* <button
                                                                                    type="submit"
                                                                                    className="px-10 py-2 rounded bg-[#b02449] text-[white]"
                                                                              >
                                                                                    + Add
                                                                              </button> */}
                                                                              {/* )} */}
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

export default NewsEventManagement;
