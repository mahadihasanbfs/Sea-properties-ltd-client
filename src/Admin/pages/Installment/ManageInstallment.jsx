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

  const totalPages = Math.ceil(allInstallment.length / itemsPerPage);


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
      {/* <div className="mt-2 shadow-sm border rounded overflow-x-auto">
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
      </div> */}
      <div class="">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">


          <div class="flex flex-col mt-4 lg:mt-8">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <table class="min-w-full lg:divide-gray-200 lg:divide-y">
                  <thead class="hidden lg:table-header-group">
                    <tr>
                      <th class="py-3.5 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-widest">Email Address</th>

                      <th class="py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500">Project Name</th>
                      <th class="py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500">Receive Date</th>

                      <th class="py-3.5 px-4 text-left hidden xl:table-cell text-xs uppercase tracking-widest font-medium text-gray-500">Particular</th>
                      <th class="py-3.5 px-4 text-left text-xs uppercase tracking-widest text-nowrap font-medium text-gray-500">Check Number</th>


                      <th class="py-3.5 px-4 text-left text-xs uppercase tracking-widest text-nowrap font-medium text-gray-500">MR No</th>
                      <th class="py-3.5 px-4 text-left text-xs uppercase tracking-widest text-nowrap font-medium text-gray-500">Receive Amount</th>
                      <th class="py-3.5 px-4 text-xs uppercase text-center tracking-widest text-nowrap font-medium text-gray-500">Action</th>


                    </tr>
                  </thead>

                  <tbody>
                    {currentItems?.length && currentItems.filter((item) => item?.email && item.isFirstPayment && item.project).map((item, idx) => (
                      <tr class="bg-white">

                        <td class="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                          <div class="flex items-center">
                            <svg class="w-4 h-4 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {item?.email}
                          </div>
                        </td>

                        <td class="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                          <div class="flex items-center">
                            {item?.project}
                          </div>
                        </td>

                        <td class="hidden px-4 py-4 text-sm font-medium text-gray-900 xl:table-cell whitespace-nowrap">
                          <div class="flex items-center">
                            <svg class="w-4 h-4 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(item?.receiveDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </div>
                        </td>

                        <td class="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                          <div class="flex items-center">
                            {item?.particular}
                          </div>
                        </td>
                        <td class="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                          <div class="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-banknote"><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>
                            {item?.checkNumber}
                          </div>
                        </td>



                        <td class="px-4 py-4 text-sm font-medium text-right text-gray-900 align-top lg:align-middle lg:text-left whitespace-nowrap">
                          {item?.mrNo}
                        </td>

                        <td class="px-4 py-4 text-sm font-medium text-right text-gray-900 align-top lg:align-middle lg:text-left whitespace-nowrap">
                          <div class="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-dollar-sign"><circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 18V6" /></svg>
                            {item?.receiveAmount}
                          </div>
                        </td>

                        <td class="hidden px-4 py-4 lg:table-cell whitespace-nowrap">
                          <div class="flex items-center space-x-4">
                            <button
                              onClick={() => setMenu(item)}
                              type="button"
                              class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-[#4c0082f9] rounded-md shadow-sm hover:bg-[#4c0082f9] focus:outline-none hover:text-[white] hover:border-[#4c0082f9] focus:ring-2 focus:ring-offset-2 focus:ring-[#4c0082f9]"
                            >
                              View Details
                            </button>

                            <button
                              onClick={() => setOpenModal(item)}
                              type="button"
                              class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-[#00ddff76] rounded-md shadow-sm hover:bg-[#00ddff76] focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => deleteInstallment(item?._id)}
                              type="button"
                              class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-[#f9afaf] rounded-md shadow-sm hover:bg-[#f9afaf] focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Delete
                            </button>



                          </div>
                        </td>
                        {
                          menu && <Modal setOpenModal={setOpenModal} deleteInstallment={deleteInstallment} setItem={setMenu} item={menu} all_data={allInstallment} />
                        }
                      </tr>

                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 bg-gray-50">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center lg:flex-row lg:justify-between">
            <p className="text-sm font-medium text-gray-500">
              Showing {itemsPerPage * (currentPage - 1) + 1} to {Math.min(itemsPerPage * currentPage, allInstallment.length)} of {allInstallment.length} results
            </p>

            <nav className="relative mt-6 lg:mt-0 flex justify-end space-x-1.5">
              <button
                onClick={prevPage}
                className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9"
                disabled={currentPage === 1}
                title="Previous"
              >
                <span className="sr-only"> Previous </span>
                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {paginationNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9 ${currentPage === number ? 'bg-[black] text-[white] border-[black]' : 'bg-white text-gray-400 border-gray-200'
                    }`}
                >
                  {number}
                </button>
              ))}

              <button
                onClick={nextPage}
                className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9"
                disabled={currentPage === totalPages}
                title="Next"
              >
                <span className="sr-only"> Next </span>
                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>

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
