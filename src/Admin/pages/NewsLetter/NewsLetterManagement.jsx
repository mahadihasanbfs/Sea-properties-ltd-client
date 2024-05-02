/* eslint-disable no-unused-vars */
import { useState } from "react";
import AdminTitle from "../../../hooks/useAdminTitle";
import { MdDeleteOutline } from "react-icons/md";

import Swal from "sweetalert2";
import useGetData from "../../../hooks/useGetData";
import { DB_URL } from "../../../const";
import useFetchData from "../../../hooks/useFetchData";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

const NewsLetterManagement = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Fetch data using custom hook

  const { data: data = [], refetch } = useQuery({
    queryKey: ["news_letter"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5001/api/v1/admin/news-letter/get`);
      const data = await res.json();
      return data;
    },
  });
  // delete data using custom hook
  const handleDelete = (id) => {
    fetch(`${DB_URL}/admin/news-letter/delete-by-id?newsletter_id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("NewsLetter deleted", "", "success");
        refetch();
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
      const allIds = data.data.map((item) => item._id);
      setSelectedItems(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleSendEmail = () => {
    const emails = selectedItems.map((itemId) =>
      data.data.find((item) => item._id === itemId).email
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
          <AdminTitle size={"20px"} title="NewsLetter Management" />
          <button
            onClick={handleSendEmail}
            className="bg-blue-500 hover:bg-blue-700 bg-[#006aff] text-[white] py-2 px-4 rounded"
            disabled={selectedItems.length === 0}
          >
            Send Email
          </button>
        </div>
        <div className="mt-2 shadow-sm border rounded overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-[#e4e4e4] text-[#0d1113] font-medium border-[#bab9b9] border-b">
              <tr>
                <th className="py-3 px-6">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {data?.data?.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => handleCheckboxChange(item._id)}
                    />
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(new Date(item?.date), 'dd-MMMM-yy (H:mm:ss)')}

                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => handleDelete(item._id)}>
                      <MdDeleteOutline className="text-2xl text-[red]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterManagement;
