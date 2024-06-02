// import ReactQuill from "react-quill";
import AdminTitle from "../../Component/AdminTitle";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
// import useImageUpload from "../../../hooks/useUploadImg";
import Swal from "sweetalert2";
import useFetchData from "../../../hooks/useFetchData";
import { DB_URL } from "../../../const";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const AddInstallment = () => {
  // const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [data] = useFetchData(`${DB_URL}/users`);
  console.log("data", data);
  const userData = data?.data;
  const [selectedInstallmentUser, setSelectedInstallmentUser] = useState("");

  // Event handler for when an option is selected
  const handleInstallmentChange = (e) => {
    console.log("e", e);

    setSelectedInstallmentUser(e);
  };



  console.log(selectedInstallmentUser);

  // image upload from custom hooks
  // const { uploadImage } = useImageUpload();

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formValue = Object.fromEntries(new FormData(e.target));
    console.log("Form Values:", formValue);

    const name = formValue.name;
    // const amount = formValue.amount;
    const contact = formValue.contact;
    const installment = formValue.installment;
    const particular = formValue.particular;
    const mrNo = formValue.mrNo;
    const receiveDate = formValue.receiveDate;
    const checkNumber = formValue.checkNumber;
    const receiveAmount = formValue.receiveAmount;
    const due = formValue.due;

    const data = {
      email: selectedInstallmentUser?.value,
      particular,
      mrNo,
      receiveDate,
      checkNumber,
      receiveAmount,
      due
    };

    console.log('Data to be submitted:', data);

    fetch(
      "https://backend.seapropertiesltd.com.bd/api/v1/admin/Installment/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        Swal.fire("Installment  Added", "", "success");
        navigate("/admin/manage-installment");
      });

    setLoading(false);
  };


  return (
    <div className="my-4">
      <AdminTitle title="Add Installment" />
      <form onSubmit={handleSubmit}>
        <br />

        <div>
          <label htmlFor="Installment">Select User:</label>
          <br />
          <Select
            id="Installment"
            value={selectedInstallmentUser}
            onChange={handleInstallmentChange}
            required
            className="rounded-lg w-full border border-[#336cb6]  bg-[white] text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
            options={userData
              ?.filter((item) => item?.role !== "admin")
              ?.map((user) => ({
                label: user.email,
                value: user.email,
              }))}
          />
        </div>
        <div className="mb-4 mt-2">
          <label htmlFor="particular">Particular </label>
          <input
            name="particular"
            required
            placeholder="Enter Particular"
            className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
            type="text"
          />
        </div>
        <div className="mb-4 mt-2">
          <label htmlFor="name">MR NO Manual </label>
          <input
            name="mrNo"
            required
            placeholder="Enter Mr No"
            className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
            type="text"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount">Received Date</label>
          <input
            name="receiveDate"
            required
            type="date"
            placeholder="Enter Received Date"
            className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="checkNumber">Check Number</label>
          <input
            name="checkNumber"
            required
            type="number"
            placeholder="Enter Check Number"
            className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="receivedAmount">Received Amount</label>
          <input
            name="receiveAmount"
            required
            type="number"
            placeholder="Enter Received Amount"
            className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="due">Dues</label>
          <input
            name="due"
            required
            type="text"
            placeholder="Enter Dues"
            className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
          />
        </div>

        {loading ? (
          <button
            disabled
            type="submit"
            className="px-3 py-1 flex items-center gap-2 rounded bg-[#631f31] text-[white]"
          >
            <div className="border-gray-300 h-[20px] w-[20px] animate-spin rounded-full border-[4px] border-t-[#c40424]" />
            Adding...
          </button>
        ) : (
          <button
            type="submit"
            className="px-3 py-1 rounded bg-[#b02449] text-[white]"
          >
            +Add
          </button>
        )}
      </form>
    </div>
  );
};
export default AddInstallment;
