/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import Swal from "sweetalert2";
import { DB_URL } from "../../const";
import useAuth from "../../hooks/useAuth";
import Title from "../../components/sharedComponent/Title";
import AdminTitle from "../../hooks/useAdminTitle";
import { useQuery } from "@tanstack/react-query";
import Modal from "./Modal";

const FlatInstallMentPage = () => {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [on, setOn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  const {
    data: allInstallment = [],
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        `${DB_URL}/admin/installment/get-installment-email?email=${user?.reloadUserInfo?.email}`
      );
      const data = await res.json();

      return data?.data;
    },
  });


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    allInstallment && allInstallment?.slice(indexOfFirstItem, indexOfLastItem);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (
      currentPage <
      Math.ceil(allInstallment ? allInstallment.length : 0 / itemsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };


  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginationNumbers = Array.from(
    {
      length: Math.ceil(
        (allInstallment ? allInstallment?.length : 0 || 0) / itemsPerPage
      ),
    },
    (_, i) => i + 1
  );

  console.log(currentItems);


  return (
    <div className="pt-3">
      <AdminTitle size={"20px"} title="Your Installment" />
      <div className="mt-2 shadow-sm border rounded overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-[#e4e4e4] text-[#0d1113] font-medium border-[#bab9b9] border-b">
            <tr>
              <th className="py-3 text-nowrap px-6">Particular</th>
              <th className="py-3 text-nowrap px-6">Check Number</th>
              <th className="py-3 text-nowrap px-6">MR No</th>
              <th className="py-3 text-nowrap px-6">First Installment</th>
              <th className="py-3 text-nowrap px-6">Payment Date</th>
              <th className="py-3 text-nowrap px-6">Total</th>
              <th className="py-3 text-nowrap px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {isLoading && (
              <h1 className="text-lg py-2 text-center">Loading data.......</h1>
            )}
            {currentItems?.length &&
              currentItems.filter((item) => item.isFirstPayment && item.project)?.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className=" flex items-center gap-1">
                      {/* <svg class="w-4 h-4 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="14" x="3" y="5" rx="2" ry="2" /><path d="M7 15h4M15 15h2M7 11h2M13 11h4" /></svg> */}
                      {item?.particular}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-1">

                    <div className=" flex items-center gap-1">
                      {/* <svg class="w-4 h-4 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" ><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg> */}
                      {item?.checkNumber ?? 'N/A'}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className=" flex items-center gap-1">
                      {/* <svg class="w-4 h-4 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" ><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M8 7v10" /><path d="M12 7v10" /><path d="M17 7v10" /></svg> */}
                      {item?.mrNo ?? 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className=" flex items-center gap-1">
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" ><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" /><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /><path d="m2 16 6 6" /><circle cx="16" cy="9" r="2.9" /><circle cx="6" cy="5" r="3" /></svg> */}
                      {item?.receiveAmount ?? 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(item?.receiveDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      {/* <svg class="w-4 h-4 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 18V6" /></svg> */}
                      {item?.total ?? 'N/A'}
                    </div>

                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setOn(item)}
                      type="button"
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-[#4c0082f9] rounded-md shadow-sm hover:bg-[#4c0082f9] focus:outline-none hover:text-[white] hover:border-[#4c0082f9] focus:ring-2 focus:ring-offset-2 focus:ring-[#4c0082f9]"
                    >
                      View Details
                    </button>
                  </td>
                  <Modal setItem={setOn} item={on} all_data={currentItems} />
                </tr>
              ))}
          </tbody>


        </table>
      </div>



      {
        allInstallment?.length > 9 && (
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
                className={`mx-1 px-3 py-1 rounded ${currentPage === number
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
                currentPage === Math.ceil(allInstallment.length / itemsPerPage)
              }
            >
              Next
            </button>
          </div>
        )
      }
    </div >
  );
};

export default FlatInstallMentPage;
