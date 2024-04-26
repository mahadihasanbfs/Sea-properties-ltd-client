import Swal from "sweetalert2";
import { DB_URL } from "../../../const";
import useFetchData from "../../../hooks/useFetchData";

export default function InstallmentModal({ item, openModal, setOpenModal }) {
  const [data] = useFetchData(`${DB_URL}/users`);
  console.log("data", data);
  const userData = data?.data;

  console.log(item);

  const updateModalHandler = (e) => {
    e.preventDefault();
    const formValue = Object.fromEntries(new FormData(e.target));
    console.log("Form Value:", formValue);

    const { _id, ...data } = formValue;
    // console.log(data);
    console.log(_id);

    fetch(
      `https://sea-properties-server.vercel.app/api/v1/admin/installment/update?installment_id=${formValue?._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        Swal.fire("Updated Installment successfully", "", "success");
        setOpenModal(false);
        // Perform any additional actions upon successful response
      })
      .catch((error) => {
        console.error("Error updating Installment:", error);
        Swal.fire("Error", "Failed to update Installment", "error");
      });
  };

  return (
    <div>
      {" "}
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
            className={`text- absolute md:w-[500px] ro    <div className="flex items-center justify-between">
                <button
                  onClick={() => setOpenModal(false)}
                  className="bg-[red] text-[white] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Close
                </button>
                <button
                  // onClick={() => setOpenModal(false)}
                  className="bg-[blue] text-[white] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update
                </button>
              </div>unded-sm bg-[white] p-6 drop-shadow-lg dark:bg-black dark:text-white ${
                openModal?.id == item.id
                  ? "scale-1 opacity-1 duration-300"
                  : "scale-0 opacity-0 duration-150"
              } z-[100]`}
          >
            <div className="">
              <h2 className="text-xl font-bold mb-4">Edit </h2>
              <form onSubmit={updateModalHandler}>
                {/* form content */}
                <div>
                  <label htmlFor="Installment">Select Installment:</label>
                  <br />

                  <input
                    name="_id"
                    defaultValue={item?._id}
                    required
                    placeholder="Enter Installment Name"
                    className="hidden"
                    type="text"
                  />
                  <select
                    id="Installment"
                    value={item?.email} // Set the value attribute to the selected value
                    name="email"
                    required
                    className="rounded-lg w-full border border-[#336cb6] px-4 py-2 bg-[white] text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                  >
                    <option disabled>Select User</option>
                    {userData?.map((user) => (
                      <option
                        className="text-black"
                        key={user.email}
                        value={user.email}
                      >
                        {user.email}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="name">Name</label>
                  <input
                    name="name"
                    defaultValue={item?.name}
                    required
                    placeholder="Enter Installment Name"
                    className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                    type="text"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="amount">Amount</label>
                  <input
                    name="amount"
                    required
                    defaultValue={item?.amount}
                    type="number"
                    placeholder="Enter Installment Name"
                    className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="contact">Contact</label>
                  <input
                    name="contact"
                    type="number"
                    defaultValue={item?.contact}
                    required
                    placeholder="Enter Contact Name"
                    className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="installment">Installment Number</label>
                  <input
                    name="installment"
                    required
                    type="number"
                    defaultValue={item?.installment}
                    placeholder="Enter installment Name"
                    className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="bg-[red] text-[white] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Close
                  </button>
                  <button
                    // onClick={() => setOpenModal(false)}
                    className="bg-[blue] text-[white] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
