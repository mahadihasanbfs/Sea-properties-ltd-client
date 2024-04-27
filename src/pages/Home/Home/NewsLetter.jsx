/* eslint-disable no-unused-vars */
import { useState } from "react";
import Title from "../../../components/sharedComponent/Title";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { DB_URL } from "../../../const";

const NewsLetter = () => {
  const { user } = useAuth();
  console.log(user?.reloadUserInfo);
  const [newsLetter, setNewsLetter] = useState("");

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("yes");

    const data = {
      email: newsLetter,
      date: new Date().toString(),
    };
    console.log(data);

    // return;
    fetch(`${DB_URL}/admin/news-letter/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        if (data?.status) {
          Swal.fire("Subscribed Successfully", "", "success");
        } else {
          Swal.fire(data?.message, "", "error");
        }
      });
  };
  return (
    <div>
      <div className="container mt-12 mb-7">
        <Title text="News Letter" position="center" />
        <p className=" text-center md:w-[500px] mx-auto">
          Get all the latest updates easily.
        </p>{" "}
        <br />
        <form
          onSubmit={submitHandler}
          action=""
          className="flex  items-center gap-4 justify-center"
        >
          <input
            type="email"
            onChange={(e) => setNewsLetter(e.target.value)}
            className="border-2 border-gray-400 rounded-xl  py-2 md:w-[500px] w-full px-2"
            placeholder="write your email"
          />{" "}
          <button className="px-10 rounded-lg py-2 bg-[#A20E27] text-light">
            {loading ? "sending" : "Subscribe"}
          </button>
        </form>{" "}
        <br />
      </div>
    </div>
  );
};

export default NewsLetter;
