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
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {isLoading && (
              <h1 className="text-lg py-2 text-center">Loading data.......</h1>
            )}
            {currentItems?.length &&
              currentItems.filter((item) => item.isFirstPayment && item.project)?.map((item, idx) => (
                <tr key={idx}>
                  <td onClick={() => setOn(item)} className="px-6 py-4 whitespace-nowrap">{item?.particular}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.checkNumber ?? 'N/A'}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.mrNo ?? 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.receiveAmount ?? 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.receiveDate ?? 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.total ?? 'N/A'}
                  </td>
                  <Modal setItem={setOn} item={on} all_data={currentItems} />
                </tr>
              ))}
          </tbody>


        </table>
      </div>



      {allInstallment?.length > 9 && (
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
      )}
    </div>
  );
};

export default FlatInstallMentPage;
