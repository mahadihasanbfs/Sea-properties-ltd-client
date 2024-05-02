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

      <section className="max-w-xl mt-12 mx-auto px-4 md:px-8">
        <div className="space-y-3 text-center">
          {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
          </svg> */}
          <h3 className="text-3xl text-gray-800 capitalize font-bold">
            Subscribe to our newsletter
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to subscribe with your email.
          </p>
        </div>
        <div className="mt-6">
          <form
            onSubmit={submitHandler}
            className="items-center justify-center sm:flex">
            <input
              type="email"
              onChange={(e) => setNewsLetter(e.target.value)}
              placeholder="Enter your email"
              className="text-gray-500 w-full p-3 rounded-md border outline-none focus:border-indigo-600"
            />
            <button
              className="w-full mt-3 px-5 py-3 rounded-md text-[white] bg-[#820021] hover:bg-[#820021] active:bg-[#820021] duration-150 outline-none shadow-md focus:shadow-none focus:ring-2 ring-offset-2 ring-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 mx-auto text-center max-w-lg text-[15px] text-gray-400">
            No spam ever, we are care about the protection of your data.
            {/* <a className="text-indigo-600 underline" href="/privacy-policy"> Privacy Policy </a> */}
          </p>
        </div>
      </section>

    </div>
  );
};

export default NewsLetter;
