import { Link } from "react-router-dom";
import useFetchData from "../../../hooks/useFetchData";
import { DB_URL } from "../../../const";

export default function TotalBookings() {
  //   const data = useGetData("api/v1/admin/booking/bookings");
  const [data] = useFetchData(`${DB_URL}/admin/booking/bookings`);
  const bookingData = data?.data || 0;

  return (
    <div className="w-full rounded-lg bg-[white] p-2  ">
      <div className="flex flex-col">
        <Link
          to={"/admin/booking-management"}
          className="flex flex-row items-center justify-between px-4 py-4"
        >
          <div className="flex mr-4">
            <span className="items-center px-4 py-4 m-auto bg-blue-200 rounded-full hover:bg-blue-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="items-center w-8 h-8 m-auto text-blue-500 hover:text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </span>
          </div>
          <div className="flex-1 pl-1">
            <div className="text-xl font-medium text-[black]">
              {bookingData?.length}
            </div>
            <div className="text-sm text-gray-400 sm:text-[gray]">
              Total Booking
            </div>
          </div>
        </Link>
        <div className="px-4 pt-px">
          <div className="w-full h-2 bg-gray-200 rounded-md hover:bg-gray-300">
            <div
              className="h-2 bg-blue-500 rounded-md hover:bg-blue-600"
              style={{ width: "83%" }}
            />
          </div>
          <div className="flex flex-row gap-1 items-center justify-between w-full py-px text-base text-gray-400">
            <p className="flex text-nowrap">Total Booking</p>
            <div className="bg-[#f5f4f4] overflow-hidden h-[10px] rounded-full mt-1 w-full">
              <div className="bg-[blue] rounded-full h-full w-[30%]"></div>
            </div>
            <div className="flex items-center justify-between space-x-2">
              <p>30%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
