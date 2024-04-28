import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { MdClose, MdOutlineMenu } from "react-icons/md";
import { FaAngleDown, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useContext, useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const role = localStorage.getItem("role");
  console.log(role);
  const { logOut, user } = useAuth();
  console.log(user);
  const links = [
    {
      id: 1,
      name: "Home",
      path: "/",
      isDropdown: false,
      dropdownItems: [],
    },
    {
      id: 2,
      name: "About us",
      path: "/about",
      isDropdown: true,
      dropdownItems: [
        {
          id: 1,
          name: "Our Story",
          path: "/our-story",
        },
        {
          id: 2,
          name: "Vision, Mission & Values",
          path: "/vision-mision-values",
        },
        {
          id: 3,
          name: "Board of Directors",
          path: "/board-of-directors",
        },
        // {
        //     id: 4,
        //     name: 'Management Team',
        //     path: 'management-team'
        // },
        // {
        //     id: 5,
        //     name: 'Companies',
        //     path: '/companies',

        // },
        // {
        //     id: 6,
        //     name: 'Our clients',
        //     path: '/our-clients',

        // },
        // {
        //     id: 7,
        //     name: 'CSR',
        //     path: '/csr',

        // },
      ],
    },
    {
      id: 3,
      name: "Projects",
      path: "/project",
      isDropdown: true,
      dropdownItems: [
        {
          id: 1,
          name: "On Going",
          path: "/project#onGoing",
        },
        {
          id: 2,
          name: "Up Coming",
          path: "/project#upComing",
        },
        {
          id: 3,
          name: "Completed",
          path: "/project#completed",
        },
      ],
    },
    {
      id: 4,
      name: "News & Events",
      path: "/news-and-events",
      isDropdown: false,
      dropdownItems: [],
    },
    {
      id: 5,
      name: "Blogs",
      path: "/blogs",
      isDropdown: false,
      dropdownItems: [],
    },
    {
      id: 6,
      name: "Contact",
      path: "/contact",
      isDropdown: false,
      dropdownItems: [],
    },
  ];

  const [on, setOn] = useState(false);
  const dropDownRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOn(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, []);

  console.log(user, "user");
  return (
    <nav className="bg-[#000000e4] text-[white] fixed z-50 flex items-center justify-between w-full top-0 text-white md:h-[70px] h-[60px]">
      <div className="relative  w-full ">
        <div className="max-w-[1366px] mx-auto pl-5 pr-2 md:px-10">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold hid">
              <img src={logo} alt="" className="w-[80px] md:w-[100px] " />
            </Link>
            <div className="flex items-center gap-4">
              <ul className="md:flex hidden items-center gap-4 lg:gap-8">
                {links.map((itm) => (
                  <li key={itm.id} className=" flex items-center">
                    {!itm?.isDropdown ? (
                      <NavLink
                        exact
                        to={itm?.path}
                        className={({ isActive }) =>
                          isActive ? "border-b-4 border-[#9b2d2d]" : ""
                        }
                        activeClassName="bg-yellow-500"
                      >
                        {itm?.name}
                      </NavLink>
                    ) : (
                      <button className="flex items-center  gap-2 h-[60px] relative group">
                        {itm?.name}
                        {/* <FaAngleDown className="mt-2" /> */}
                        <ul className="absolute z-[1000] top-[60px] left-0 bg-[#000000e4] w-40 text-white text-left rounded-md shadow-lg fade-in hidden group-hover:block transition-opacity duration-300">
                          {itm?.dropdownItems.map((item) => (
                            <li key={item.id}>
                              <NavLink
                                to={item?.path}
                                className="block py-2 px-3 hover:bg-gray-800"
                              >
                                {item?.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {user ? (
                <div
                  ref={dropDownRef}
                  className="relative mx-auto w-fit text-black"
                >
                  <button onClick={() => setOn((prev) => !prev)}>
                    <p className="border w-10 h-10 rounded-full bg-[#0a193452] flex items-center justify-center">
                      {user.displayName.slice(0, 1)}
                    </p>
                    {/* <img width={40} height={40} className="size-10 rounded-full bg-slate-500 object-cover duration-500 hover:scale-x-[98%] hover:opacity-80" src={user?.photoURL} alt="avatar drop down navigate ui" /> */}
                  </button>
                  <ul
                    className={`${on ? "visible duration-300" : "invisible"
                      } absolute right-0 top-12 z-50 w-[200px] rounded-sm bg-[#252c33] shadow-md `}
                  >
                    <li
                      className={`rounded-sm px-2 py-2 ${on ? "opacity-100 duration-300" : "opacity-0"
                        }   `}
                    >
                      <Link
                        className="w-full"
                        to={role == "admin" ? `/admin` : `/user`}
                      >
                        <div className="duration-200 hover:bg-[#1b1d2bde] px-2 py-1 rounded w-full">
                          Dashboard
                        </div>
                      </Link>
                    </li>{" "}
                    <li
                      className={`rounded-sm px-2 py-2 ${on ? "opacity-100 duration-300" : "opacity-0"
                        }   `}
                    >
                      <button
                        onClick={logOut}
                        className="duration-200 text-start hover:bg-[#1b1d2bde] px-2 py-1 rounded w-full"
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to={"/sign-in"}>
                  <button className="bg-red-600 text-white md:px-8 px-4 py-1 md:text-md text-sm md:py-2 rounded">
                    Login
                  </button>
                </Link>
              )}
              <button
                onClick={() => setOpen(!open)}
                className=" p-1 md:hidden block text-2xl"
              >
                <MdOutlineMenu />
              </button>
            </div>
            {/* small side nav */}
          </div>
        </div>

        <div className={` md:hidden block`}>
          <div
            style={{
              zIndex: "6000",
            }}
            className={`absolute bg-white bg-[#101522] top-0 duration-200 ${!open ? "left-[-120%]" : "left-0"
              } right-0 w-full h-screen   md:hidden ring  `}
          >
            <div className="flex container items-center mt-3 bg justify-between w-full">
              <Link to="/" className="text-2xl font-bold ml-5">
                <img src={logo} alt="" className="w-20 " />
              </Link>
              <button
                onClick={() => setOpen(!open)}
                className=" p-1 text-black text-2xl"
              >
                <MdClose />
              </button>
            </div>
            <ul className="text-black mt-3">
              {links?.map((itm) => (
                <li key={itm?.id}>
                  {itm?.isDropdown ? (
                    <div className="">
                      <button
                        onClick={() =>
                          setOpenDropdownId(
                            openDropdownId === itm.id ? null : itm.id
                          )
                        }
                        className="flex items-center px-3 py-2 border-b w-full hover:bg-gray-800 hover:text-white gap-2 h-[60px] relative group justify-between"
                      >
                        {itm?.name}
                        {openDropdownId === itm.id ?
                          <FaAngleDown
                            className="mt-3"
                          />
                          :
                          <FaAngleRight
                            className="mt-3"
                          />
                        }
                      </button>
                      {openDropdownId === itm.id && (
                        <div className="mx-auto p-3 rounded-b ring-1 ring-gray-300 bg-gray-100">
                          {itm?.dropdownItems?.map((item) => (
                            <NavLink
                              onClick={() => setOpen(!open)}
                              key={item?.id}
                              to={item?.path}
                              className="block py-2 px-3 hover:text-white rounded hover:bg-gray-800"
                            >
                              {item?.name}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      to="/"
                      onClick={() => setOpen(!open)}
                      className="block py-3 px-3 hover:bg-gray-800 hover:text-white duration-150 border-b"
                    >
                      {itm?.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
            <Link to={"/sign-in"}>
              <div className="flex justify-center">
                <button className="bg-[#c12222] mt-3  w-[93%] text-white md:px-8 px-4  md:text-md text-sm  py-2 rounded">
                  Login
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;