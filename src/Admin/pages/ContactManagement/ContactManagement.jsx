import { useState } from "react";
import AdminTitle from "../../../hooks/useAdminTitle";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";

const ManageContact = () => {
  const [openModal, setOpenModal] = useState(false);
  const [myValue, setMyValue] = useState(openModal?.description);

  // Fetch data using custom hook
  const contactData = useGetData("api/v1/admin/contacts");

  // Logic to calculate pagination
  console.log(contactData, "*-*-**");

  // delete data using custom hook
  const handleDelete = (id) => {
    console.log(id, "-------->");
    fetch(
      `https://sea-properties-server.vercel.app/api/v1/admin/contact/delete?contact_id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire("contact deleted", "", "success");
        // reload()
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
      });
  };

  console.log(contactData, "======");
  return (
    <div className="pt-3">
      <div className="flex item-center pb-3 justify-between">
        <AdminTitle size={"20px"} title="Manage contact" />

        {/* <Link to={"/admin/add-contact"}>
          <div className="dashboard_form_btn">+Add contact</div>
        </Link> */}
      </div>

      <div className="mt-2 shadow-sm border rounded overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-[#e4e4e4] text-[#0d1113] font-medium border-[#bab9b9] border-b">
            <tr>
              <th className="py-3 px-6"> Name</th>
              <th className="py-3 px-6"> Email</th>
              <th className="py-3 px-6">Phone</th>
              <th className="py-3 px-6">Time</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {contactData?.data?.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item?.name ?? "User Name"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item?.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item?.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(item?.date || new Date()).toLocaleString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    hour12: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ul className="flex items-center gap-2">
                    <li>
                      <button onClick={() => handleDelete(item?._id)}>
                        <MdDeleteOutline className="text-2xl text-[red]" />
                      </button>
                    </li>
                    <li>
                      {/* <button onClick={() => setOpenModal(item)}>
                        <TbEdit className="text-2xl text-[green]" />
                      </button> */}
                    </li>
                  </ul>
                </td>
                {/* modal */}
                <div>
                  <div
                    onClick={() => setOpenModal(false)}
                    className={`fixed z-[100] flex items-center justify-center ${
                      openModal?._id == item._id
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                    } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                  >
                    <div
                      onClick={(e_) => e_.stopPropagation()}
                      className={`text- absolute md:w-[500px] rounded-sm bg-[white] p-6 drop-shadow-lg dark:bg-black dark:text-white ${
                        openModal?.id == item.id
                          ? "scale-1 opacity-1 duration-300"
                          : "scale-0 opacity-0 duration-150"
                      } z-[100]`}
                    >
                      <div className="">
                        <h2 className="text-xl font-bold mb-4">Edit </h2>
                        <form onSubmit={``}>
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
                              Total Amount:
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="name"
                              type="text"
                              name="name"
                              defaultValue={item.name}
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="due"
                            >
                              Due:
                            </label>

                            <ReactQuill
                              className="rounded-lg w-full border border-[#336cb6] h-[200px] overflow-hidden text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                              theme="snow"
                              value={myValue}
                              onChange={setMyValue}
                            />
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

export default ManageContact;
