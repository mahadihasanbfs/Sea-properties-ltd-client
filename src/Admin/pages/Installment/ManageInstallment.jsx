import { useState } from "react";
import AdminTitle from "../../../hooks/useAdminTitle";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { DB_URL } from "../../../const";
import InstallmentModal from "./InstallmentModal";
import { useQuery } from "@tanstack/react-query";
import Modal from "./Modal";

const ManageInstallment = () => {
  const [openModal, setOpenModal] = useState(false);
  const [menu, setMenu] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allInstallment = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${DB_URL}/admin/Installment/Installments`);
      const data = await res.json();
      return data?.data;
    },
  });

  // Logic to calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = allInstallment?.length && allInstallment?.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < Math.ceil(allInstallment?.length / itemsPerPage)) {
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
    { length: Math.ceil(allInstallment.length / itemsPerPage) },
    (_, i) => i + 1
  );

  // delete Installment
  const deleteInstallment = (id) => {
    fetch(
      `https://backend.seapropertiesltd.com.bd/api/v1/admin/installment/delete?installment_id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        refetch();
        if (data?.status) {
          Swal.fire("Delete Installment successful", "", "success");
        } else {
          Swal.fire("Delete Failed", "", "error");
        }
      })
      .catch((error) => {
        console.error("Error deleting Installment:", error);
      });
  };

  // Function to handle search query changes
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (searchQuery) {
    const filteredInstallments = allInstallment.filter(
      (installment) =>
        (installment?.email && installment.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (installment?.name && installment.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (installment?.contact && installment.contact.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    currentItems = filteredInstallments;
  }

  console.log(currentItems);


  return (
    <div className="pt-3">
      <div className="flex items-center justify-between">
        <AdminTitle size={"20px"} title="Manage Installment" />
        <input
          type="text"
          className="rounded-lg border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2 w-[30%]"
          placeholder="Search by email"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <Link to={`/admin/add-installment`}>
          <div className="bg-secondary whitespace-nowrap md:text-md text-xs text-[white] py-2 px-3 rounded">
            + Add Installment
          </div>
        </Link>
      </div>
      <div className="mt-2 shadow-sm border rounded overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-[#e4e4e4] text-[#0d1113] font-medium border-[#bab9b9] border-b">
            <tr>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Particular</th>
              <th className="py-3 px-6">Check Number</th>
              <th className="py-3 px-6">MR No</th>
              <th className="py-3 px-6">Receive Amount</th>
              <th className="py-3 px-6">Project Name</th>

              <th className="py-3 px-6">Receive Date</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {isLoading && <h1 className="text-lg py-2 text-center">Loading data.......</h1>}
            {currentItems?.length && currentItems.filter((item) => item?.email && item.isFirstPayment && item.project).map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4" onClick={() => setMenu(item)}>{item?.email}</td>
                <td className="px-6 py-4">{item?.particular}</td>
                <td className="px-6 py-4">{item?.checkNumber ?? 'N/A'}</td>
                <td className="px-6 py-4">{item?.mrNo ?? 'N/A'}</td>
                <td className="px-6 py-4">{item?.receiveAmount ?? 'N/A'}</td>
                <td className="px-6 py-4">{item?.project ?? 'N/A'}</td>
                <td className="px-6 py-4">{item?.receiveDate ? new Date(item?.receiveDate).toLocaleString() : 'N/A'}</td>
                <td className="px-6 py-4">
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
                {
                  menu && <Modal setOpenModal={setOpenModal} deleteInstallment={deleteInstallment} setItem={setMenu} item={menu} all_data={allInstallment} />
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {allInstallment?.length > 9 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={prevPage}
            className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {paginationNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={nextPage}
            className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700"
            disabled={currentPage === Math.ceil(allInstallment.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      )}

      {/* modal */}
      {openModal && (
        <InstallmentModal
          item={openModal}
          openModal={openModal}
          setOpenModal={setOpenModal}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ManageInstallment;
