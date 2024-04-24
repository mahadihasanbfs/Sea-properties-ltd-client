import { useState } from "react";
import AdminTitle from "../../../hooks/useAdminTitle";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import useFetchData from "../../../hooks/useFetchData";
import { DB_URL } from "../../../const";

const UserHistory = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  const [data] = useFetchData(`${DB_URL}/users`);
  console.log("data", data);
  const userData = data?.data;
  //   console.log(data);
  console.log("userData", userData);
  const tableItems = [
    {
      id: 1,
      name: "Liam James",
      totalAmount: 450000,
      date: new Date().getTime(),
      due: 50000,
      remainingBalance: 400000,
    },
    {
      id: 2,
      name: "Liam James2",
      totalAmount: 450000,
      date: new Date().getTime(),
      due: 50000,
      remainingBalance: 400000,
    },
    {
      id: 3,
      name: "Liam James3",
      totalAmount: 450000,
      date: new Date().getTime(),
      due: 50000,
      remainingBalance: 400000,
    },
    // Add more items as needed with unique IDs
  ];

  // Logic to calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < Math.ceil(userData.length / itemsPerPage)) {
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
    { length: Math.ceil(userData.length / itemsPerPage) },
    (_, i) => i + 1
  );

  // edit
  const handleSave = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const totalAmount = e.target.totalAmount.value;
    const date = new Date().getTime();
    const due = e.target.due.value;
    const remingBalance = e.target.remingBalance.value;

    const editedItem = {
      name,
      totalAmount,
      date,
      due,
      remingBalance,
    };

    console.log(editedItem);
  };
  return (
    <div className="pt-3">
      <AdminTitle size={"20px"} title="User History" />

      <div className="mt-2 shadow-sm border rounded overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-[#e4e4e4] text-[#0d1113] font-medium border-[#bab9b9] border-b">
            <tr>
              <th className="py-3 px-6">name</th>
              <th className="py-3 px-6">Email</th>
              {/* <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Due</th>
              <th className="py-3 px-6">Remaining balance</th> */}
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {currentItems.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  {item.totalAmount}
                </td> */}
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(item.date).toLocaleString()}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  {item.remainingBalance}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <ul className="flex items-center gap-2">
                    <li>
                      <button>
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
                {/* //!  Edit modal */}
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
                        openModal?._id == item._id
                          ? "scale-1 opacity-1 duration-300"
                          : "scale-0 opacity-0 duration-150"
                      } z-[100]`}
                    >
                      <div className="">
                        <h2 className="text-xl font-bold mb-4">Edit </h2>
                        <form onSubmit={handleSave}>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="name"
                            >
                              name:
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
                              htmlFor="totalAmount"
                            >
                              Total Amount:
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="email"
                              type="email"
                              name="email"
                              defaultValue={item.email}
                            />
                          </div>
                          {/* <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="due"
                            >
                              Due:
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="due"
                              type="number"
                              name="due"
                              defaultValue={item.due}
                            />
                          </div> */}
                          {/* <div className="mb-6">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="remainingBalance"
                            >
                              Remaining Balance:
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="remainingBalance"
                              type="number"
                              name="remainingBalance"
                              defaultValue={item.remainingBalance}
                            />
                          </div> */}
                          <div className="flex items-center justify-between">
                            <button
                              className="bg-[blue] text-[white] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="submit"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => setOpenModal(false)}
                              className="bg-[red] text-[white] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="button"
                            >
                              Close
                            </button>
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
          disabled={currentPage === Math.ceil(tableItems.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserHistory;
