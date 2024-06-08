import Swal from "sweetalert2";
import { DB_URL } from "../../../const";
import useFetchData from "../../../hooks/useFetchData";
import Select from "react-select";

export default function InstallmentModal({
  item,
  openModal,
  setOpenModal,
  refetch,
}) {
  const [data] = useFetchData(`${DB_URL}/users`);
  console.log("data", data);
  
  const userData = data?.data;

  const updateModalHandler = (e) => {
    e.preventDefault();
    const formValue = Object.fromEntries(new FormData(e.target));
    console.log("Form Value:", formValue);

    const { _id, ...restData } = formValue;

    // Add receiveDate to the data object
    const updatedData = {
      ...restData,
      receiveDate: new Date().toISOString(), // Adjust the date format as needed
    };

    console.log('Updated Data:', updatedData);

    fetch(
      `https://backend.seapropertiesltd.com.bd/api/v1/admin/installment/update?installment_id=${item?._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
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
        refetch();
      })
      .catch((error) => {
        console.error("Error updating Installment:", error);
        Swal.fire("Error", "Failed to update Installment", "error");
      });
  };


  // <th className="py-3 px-6">Email</th>
  // <th className="py-3 px-6">Particular</th>
  // <th className="py-3 px-6">Check Number</th>
  // <th className="py-3 px-6">MR No</th>
  // <th className="py-3 px-6">Receive Amount</th>
  // <th className="py-3 px-6">Due</th>
  // <th className="py-3 px-6">Receive Date</th>
  // <th className="py-3 px-6">Action</th>


  return (
    <div>
      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-[100] flex items-center justify-center ${openModal?._id === item._id ? "visible opacity-100" : "invisible opacity-0"} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`rounded-sm bg-[white] p-6 drop-shadow-lg dark:bg-black dark:text-white ${openModal?._id === item._id ? "scale-1 opacity-1 duration-300" : "scale-0 opacity-0 duration-150"} z-[100]`}
        >
          <div className="">
            <h2 className="text-xl text-[black] font-bold mb-4">Edit Installment</h2>
            <form className="font-[600] !text-[black]" onSubmit={updateModalHandler}>
              <div className=" space-y-1 mt-3">
                <label htmlFor="email">Email</label>
                <Select
                  id="email"
                  name="email"
                  defaultValue={{
                    label: item?.email,
                    value: item?.email,
                  }}
                  className="rounded-lg w-full border border-[#336cb6] bg-[white] text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                  options={userData
                    ?.filter((user) => user?.role !== "admin")
                    ?.map((user) => ({
                      label: user.email,
                      value: user.email,
                    }))}
                />
              </div>

              <div className="mb-4 space-y-1 mt-3">
                <label htmlFor="particular">Particular</label>
                <input
                  name="particular"
                  type="text"
                  defaultValue={item?.particular}
                  required
                  placeholder="Enter Particular"
                  className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#000] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                />
              </div>
          
              <div className="mb-4 space-y-1 mt-3">
                <label htmlFor="checkNumber">Check Number</label>
                <input
                  name="checkNumber"
                  required
                  type="text"
                  defaultValue={item?.checkNumber}
                  placeholder="Enter Check Number"
                  className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[black] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                />
              </div>

              <div className="mb-4 text-[black] space-y-1 mt-3">
                <label htmlFor="mrNo">Mr No</label>
                <input
                  name="mrNo"
                  required
                  defaultValue={item?.mrNo}
                  type="number"
                  placeholder="Enter Installment Name"
                  className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#000] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                />
              </div>

              <div className="mb-4 space-y-1 mt-3">
                <label htmlFor="receiveAmount">Receive Amount</label>
                <input
                  name="receiveAmount"
                  required
                  type="number"
                  defaultValue={item?.receiveAmount}
                  placeholder="Enter Received Amount"
                  className="rounded-lg w-full border border-[#000] px-4 py-2 text-[black] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                />
              </div>

              <div className="mb-4 space-y-1 mt-3">
                <label htmlFor="due">Due</label>
                <input
                  name="due"
                  defaultValue={item?.due}
                  required
                  placeholder="Enter Due"
                  className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#000] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
                  type="text"
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
  );
}
