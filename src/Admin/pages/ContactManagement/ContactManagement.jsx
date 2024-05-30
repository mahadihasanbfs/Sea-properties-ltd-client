import { useState } from "react";
import AdminTitle from "../../../hooks/useAdminTitle";
import { MdDeleteOutline } from "react-icons/md";
// import { TbEdit } from "react-icons/tb";
// import { Link } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import { useQuery } from "@tanstack/react-query";
import { DB_URL } from "../../../const";
import { BsEye } from "react-icons/bs";
import { format } from "date-fns";

const ManageContact = () => {
  const [openModal, setOpenModal] = useState(false);
  const [myValue, setMyValue] = useState(openModal?.description);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const { data: contactData = [], refetch } = useQuery({
    queryKey: ["contact_data"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5001/api/v1/admin/contacts`);
      const data = await res.json();
      return data.data;
    },
  });
  // delete data using custom hook
  const handleDelete = (id) => {
    // console.log(id, "-------->");
    fetch(
      `http://localhost:5001/api/v1/admin/contact/delete?contact_id=${id}`,
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
        Swal.fire("Contact Deleted Successfully", "", "success");
        refetch();
        // reload()
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
      });
  };



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



  console.log(contactData, "======");
  return (
    <div className="pt-3">
      <div className="flex item-center pb-3 justify-between">
        <AdminTitle size={"20px"} title="Manage contact" />

        <button
          onClick={handleSendEmail}
          className="bg-blue-500 hover:bg-blue-700 bg-[#006aff] text-[white] py-2 px-4 rounded"
          disabled={selectedItems.length === 0}
        >
          Send Email
        </button>
      </div>

      {contactData.length ? <div className="mt-2 shadow-sm border rounded overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-[#e4e4e4] text-[#0d1113] font-medium border-[#bab9b9] border-b">
            <tr>
              <th className="py-3 px-6 flex gap-2">  <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              /> Name</th>
              <th className="py-3 px-6"> Email</th>
              <th className="py-3 px-6">Phone</th>
              <th className="py-3 px-6">Time</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">

            {contactData?.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item._id)}
                    onChange={() => handleCheckboxChange(item._id)}
                  />   {item?.name ?? "User Name"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item?.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item?.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(item?.date), 'dd-MMMM-yy (H:mm:ss)')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ul className="flex items-center gap-2">
                    <li>
                      <button onClick={() => handleDelete(item?._id)}>
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
                {/* end modal */}
              </tr>
            ))}
          </tbody>
        </table>
      </div> :
        <div className="text-center text-2xl">No Contact Found</div>
      }
    </div>
  );
};

export default ManageContact;