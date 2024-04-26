// import ReactQuill from "react-quill";
import AdminTitle from "../../Component/AdminTitle";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
// import useImageUpload from "../../../hooks/useUploadImg";
import Swal from "sweetalert2";
import useFetchData from "../../../hooks/useFetchData";
import { DB_URL } from "../../../const";
import { useNavigate } from "react-router-dom";

const AddInstallment = () => {
  // const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [data] = useFetchData(`${DB_URL}/users`);
  console.log("data", data);
  const userData = data?.data;

  // console.log("userData", userData);

  const [selectedInstallmentUser, setSelectedInstallmentUser] = useState("");

  // Event handler for when an option is selected
  const handleInstallmentChange = (e) => {
    setSelectedInstallmentUser(e.target.value);
  };

  console.log(selectedInstallmentUser);

  // image upload from custom hooks
  // const { uploadImage } = useImageUpload();

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formValue = Object.fromEntries(new FormData(e.target));
    console.log(formValue);
    // const form = e.target;

    const name = formValue.name;
    const amount = formValue.amount;
    const contact = formValue.contact;
    const installment = formValue.installment;

    const data = {
      name,
      amount,
      contact,
      installment,
      email: selectedInstallmentUser,
    };
    console.log(data);

    fetch(
      "https://sea-properties-server.vercel.app/api/v1/admin/Installment/add",
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
        Swal.fire("Installment successfully added", "", "success");
        navigate("/admin/manage-installment");
      });

    console.log(data);
  };

  console.log(userData);
  return (
    <div className="my-4">
      <AdminTitle title="Add Installment" />
      <form onSubmit={handleSubmit}>
        <br />

        <div>
          <label htmlFor="Installment">Select Installment:</label>
          <br />
          <select
            id="Installment"
            value={selectedInstallmentUser}
            onChange={handleInstallmentChange}
            required
            className="rounded-lg w-full border border-[#336cb6] px-4 py-2 bg-[white] text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
          >
            <option disabled selected>
              Select User
            </option>
            {userData?.map((pkg) => (
              <option className="text-black" key={pkg.email} value={pkg.email}>
                {pkg.email}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            name="name"
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
            placeholder="Enter installment Name"
            className="rounded-lg w-full border border-[#336cb6] px-4 py-2 text-[#336cb6] ring-offset-2 duration-300 focus:outline-none focus:ring-2"
          />
        </div>
        {loading ? (
          <button
            disabled
            type="submit"
            className="px-3 py-1 rounded bg-[#631f31] text-[white]"
          >
            Adding...
          </button>
        ) : (
          <button
            type="submit"
            className="px-3 py-1 rounded bg-[#b02449] text-[white]"
          >
            Add Installment
          </button>
        )}
      </form>
    </div>
  );
};

export default AddInstallment;
