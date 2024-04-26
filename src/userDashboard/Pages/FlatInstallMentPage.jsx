import { useEffect, useState } from "react";

import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import AdminTitle from "../../hooks/useAdminTitle";
import { DB_URL } from "../../const";

const FlatInstallMentPage = () => {
  //   const { logOut, user } = useAuth();
  //   console.log(user);
  const [openModal, setOpenModal] = useState(false);
  const [on, setOn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [allInstallment, setAllInstallments] = useState([]);

  //    const { user } = useAuth();
  //    console.log(user);

  // Logic to calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allInstallment?.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < Math.ceil(allInstallment.length / itemsPerPage)) {
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
    { length: Math.ceil((allInstallment?.length || 0) / itemsPerPage) },
    (_, i) => i + 1
  );

  //get Installment
  useEffect(() => {
    fetch(`${DB_URL}/admin/Installment/Installments`)
      .then((response) => response.json())
      .then((data) => setAllInstallments(data?.data));
  }, [openModal]);

  // delete Installment
  const deleteInstallment = (id) => {
    console.log(id);
    fetch(
      `https://sea-properties-server.vercel.app/api/v1/admin/installment/delete?Installment_id=${id}`,
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
        Swal.fire("Delete Installment successful", "", "success");
        // reload()
      })
      .catch((error) => {
        console.error("Error deleting Installment:", error);
      });
  };

  return (
    <div className="pt-3">
      <div className="mt-2 shadow-sm border rounded overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-[#e4e4e4] text-[#0d1113] font-medium border-[#bab9b9] border-b">
            <tr>
              <th className="py-3 px-6">Installment Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Installment Number</th>
              <th className="py-3 px-6">Contact</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {currentItems?.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{item?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item?.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item?.installment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item?.contact}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ul className="flex items-center gap-2">
                    <li>
                      <button onClick={() => deleteInstallment(item?._id)}>
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
              </tr>
            ))}
          </tbody>

          {/* modal */}
          <div></div>
          {/* end modal */}
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
        {paginationNumbers?.map((number) => (
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
            currentPage ===
            Math.ceil((allInstallment.length || 0) / itemsPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlatInstallMentPage;
