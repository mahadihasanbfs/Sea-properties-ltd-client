import { useEffect, useState } from "react";
import AdminTitle from "../../../hooks/useAdminTitle";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

const ManageInstallment = () => {
  const [openModal, setOpenModal] = useState(false);
  const [on, setOn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [allInstallment, setAllInstallments] = useState([]);
  const InstallmentData = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Installment 1",
      date: new Date().getTime(),
      address: "dhaka",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Installment 1",
      date: new Date().getTime(),
      address: "dhaka",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Installment 1",
      date: new Date().getTime(),
      address: "dhaka",
    },
    // Add more items as needed with unique IDs
  ];

  // Logic to calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = InstallmentData.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < Math.ceil(InstallmentData.length / itemsPerPage)) {
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
  const paginationNumbers = Array.from(
    { length: Math.ceil(InstallmentData.length / itemsPerPage) },
    (_, i) => i + 1
  );

  //get Installment
  useEffect(() => {
    fetch(
      "https://sea-properties-server.vercel.app/api/v1/admin/Installment/Installments"
    )
      .then((response) => response.json())
      .then((data) => setAllInstallments(data?.data));
  }, []);

  // delete Installment
  const deleteInstallment = (id) => {
    fetch(
      `https://sea-properties-server.vercel.app/api/v1/admin/Installment/delete?Installment_id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Delete Installment successful", "", "success");
        // reload()
      })
      .catch((error) => {
        console.error("Error deleting Installment:", error);
      });
  };

  return (
    <div className="pt-3">
      <div className="flex items-center justify-between">
        <AdminTitle size={"20px"} title="Manage Installment" />
        <Link to={`/admin/add-installment`}>
          <div className="bg-secondary text-[white] py-2 px-3 rounded">
            + Add Installment
          </div>
        </Link>
      </div>
      <div className="mt-2 shadow-sm border rounded overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-[#e4e4e4] text-[#0d1113] font-medium border-[#bab9b9] border-b">
            <tr>
              <th className="py-3 px-6">Image</th>
              <th className="py-3 px-6">Installment Name</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Address</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {allInstallment.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={item?.Installment_photo}
                    className="w-[60px] h-[60px] rounded object-cover"
                    alt=""
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item?.details?.info?.launch_date
                    ? new Date().toLocaleString(
                        item?.details?.info?.launch_date
                      )
                    : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item?.details?.info?.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ul className="flex items-center gap-2">
                    <li>
                      <button onClick={() => deleteInstallment(item?._id)}>
                        <MdDeleteOutline className="text-2xl text-[red]" />
                      </button>
                    </li>
                    <li>
                      <Link to={`/admin/edit-Installment/${item?._id}`}>
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
        <button
          onClick={prevPage}
          className="mx-1  px-3 py-1 rounded bg-gray-200 text-[#d8d8d8] bg-[blue]"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {paginationNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === number
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={nextPage}
          className="mx-1 px-3 py-1 rounded bg-gray-200 text-[#d8d8d8] bg-[blue]"
          disabled={
            currentPage === Math.ceil(InstallmentData.length / itemsPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageInstallment;
