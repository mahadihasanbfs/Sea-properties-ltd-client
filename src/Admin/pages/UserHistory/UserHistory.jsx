import { useEffect, useState } from "react";
import AdminTitle from "../../../hooks/useAdminTitle";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import useFetchData from "../../../hooks/useFetchData";
import { DB_URL } from "../../../const";
import BrightAlert from "bright-alert";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const UserHistory = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  const { data: data = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${DB_URL}/users`);
      const data = await res.json();
      return data;
    },
  });



  const userData = data?.data;
  //   console.log(data);
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
  const currentItems =
    userData?.length && userData?.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < Math.ceil(userData?.length / itemsPerPage)) {
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
    { length: Math.ceil(userData?.length / itemsPerPage) },
    (_, i) => i + 1
  );

  // edit
  const handleSave = (e) => {
    e.preventDefault();

    const name = e.target.userName.value;
    const email = e.target.email.value;


    const editedItem = {
      name,
      email
    };

    fetch(`${DB_URL}/users/update?id=${openModal?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedItem),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setOpenModal(false);
        Swal.fire("User Updated", "", "success");
        refetch();
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("User Not Updated", "", "error");
        refetch();
      });
  };

  const delete_user = (id) => {
    fetch(`${DB_URL}/users/delete?id=${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire("User Deleted", "", "success")
        refetch()
      })
      .catch((error) => {
        Swal.fire("User Not Deleted", "", "error");
        refetch()
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
    <div className="pt-3">
      <div className="flex items-center justify-between">
        <AdminTitle size={"20px"} title="User History" />
        <button
          onClick={handleSendEmail}
          className="bg-blue-500 hover:bg-blue-700 bg-[#006aff] text-[white] py-2 px-4 rounded"
          disabled={selectedItems.length === 0}
        >
          Send Email
        </button>
      </div>

      {currentItems?.length ? <div>
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
                <th className="py-3 px-6">name</th>
                <th className="py-3 px-6">Email</th>
                {/* <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Due</th>
              <th className="py-3 px-6">Remaining balance</th> */}
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {currentItems?.length &&
                currentItems?.filter((item) => item.email !== 'admin@admin.com').map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item._id)}
                        onChange={() => handleCheckboxChange(item._id)}
                      />
                    </td>
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
                          <button onClick={() => delete_user(item._id)}>
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

                    <div>
                      {openModal?._id == item._id && <div
                        onClick={() => setOpenModal(false)}
                        className={`fixed z-[100] flex items-center justify-center ${openModal?._id == item._id
                          ? "visible opacity-100"
                          : "invisible opacity-0"
                          } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                      >
                        <div
                          onClick={(e_) => e_.stopPropagation()}
                          className={`text- absolute md:w-[500px] rounded-sm bg-[white] p-6 drop-shadow-lg dark:bg-black dark:text-white ${openModal?._id == item._id
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
                                  name="userName"
                                  defaultValue={item.name}
                                />
                              </div>
                              <div className="mb-4">
                                <label
                                  className="block text-gray-700 text-sm font-bold mb-2"
                                  htmlFor="totalAmount"
                                >
                                  Email:
                                </label>
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  id="email"
                                  type="email"
                                  name="email"
                                  defaultValue={item.email}
                                />
                              </div>

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
                      </div>}
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

            className="mx-1  px-3 py-1 rounded bg-gray-200 cursor-pointer text-[#d8d8d8] bg-[blue]"
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
            className="mx-1 px-3 py-1 rounded bg-gray-200 text-[#d8d8d8] bg-[blue] cursor-pointer "
            disabled={currentPage === Math.ceil(tableItems.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div> : 'No data found'}
    </div>
  );
};

export default UserHistory;
