import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo.png';
import { MdClose, MdOutlineMenu } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const { logOut, user } = useAuth();
    const links = [
        {
            id: 1,
            name: 'Home',
            path: '/',
            isDropdown: false,
            dropdownItems: [],
        },
        {
            id: 2,
            name: 'About us',
            path: '/about',
            isDropdown: true,
            dropdownItems: [
                {
                    id: 1,
                    name: 'Our Story',
                    path: '/our-story',

                },
                {
                    id: 2,
                    name: 'Vision, Mission & Values',
                    path: '/vision-mision-values',

                },
                {
                    id: 3,
                    name: 'Board of Directors',
                    path: '/board-of-directors',

                },
                {
                    id: 4,
                    name: 'Management Team',
                    path: 'management-team'
                },
                {
                    id: 5,
                    name: 'Companies',
                    path: '/companies',

                },
                {
                    id: 6,
                    name: 'Our clients',
                    path: '/our-clients',

                },
                {
                    id: 7,
                    name: 'CSR',
                    path: '/csr',

                },
            ],
        },
        {
            id: 3,
            name: 'Projects',
            path: '/project',
            isDropdown: true,
            dropdownItems: [
                {
                    id: 1,
                    name: 'On Going',
                    path: '/on-going',
                },
                {
                    id: 2,
                    name: 'Up Coming',
                    path: '/up-coming',
                },
                {
                    id: 3,
                    name: 'Completed',
                    path: '/up-coming',
                }
            ],
        },
        {
            id: 4,
            name: 'News&Events',
            path: '/news-and-events',
            isDropdown: false,
            dropdownItems: [],
        },
        {
            id: 5,
            name: 'Contact',
            path: '/contact',
            isDropdown: false,
            dropdownItems: [],
        }
    ];


    return (
        <nav className="bg-[#000000b5] fixed  flex items-center justify-between w-full top-0 text-white md:h-[70px] h-[60px] z-[1000]">
            <div className="relative w-full ">
                <div className="max-w-[1366px] mx-auto pl-5 pr-2 md:px-10">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="text-2xl font-bold hid">
                            <img src={logo} alt="" className="w-[80px] md:w-[100px] " />
                        </Link>
                        <div className="flex items-center gap-4">
                            <ul className="md:flex hidden items-center gap-4 lg:gap-8">

                                {
                                    links.map(itm => <li key={itm.id} className=" flex items-center">
                                        {
                                            !itm?.isDropdown ? <NavLink exact to={itm?.path} className={({ isActive }) =>
                                                isActive ? "border-t-4 border-red-600" : ""} activeClassName="bg-yellow-500"  >{itm?.name}</NavLink>
                                                :
                                                <button className="flex items-center  gap-2 h-[60px] relative group">
                                                    {itm?.name} <FaAngleDown className="mt-2" />
                                                    <ul className="absolute top-[60px] left-0 bg-[#000000e4] w-40 text-white text-left rounded-md shadow-lg fade-in hidden group-hover:block transition-opacity duration-300">
                                                        {itm?.dropdownItems.map(item =>
                                                            <li key={item.id}>
                                                                <NavLink to={item?.path} className="block py-2 px-3 hover:bg-gray-800">
                                                                    {item?.name}
                                                                </NavLink>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </button>


                                        }
                                    </li>)
                                }

                            </ul>
                            {
                                user ?
                                    <button onClick={logOut} className="bg-red-600 text-white md:px-7 px-4 py-1 md:text-md text-sm md:py-2 rounded">
                                        Logout
                                    </button>
                                    :
                                    <Link to={'/sign-in'}>
                                        <button className="bg-red-600 text-white md:px-8 px-4 py-1 md:text-md text-sm md:py-2 rounded">
                                            Login
                                        </button>
                                    </Link>
                            }
                            <button onClick={() => setOpen(!open)} className=" p-1 md:hidden block text-2xl">
                                <MdOutlineMenu />
                            </button>
                        </div>
                        {/* small side nav */}
                    </div>
                </div>

                <div className={` md:hidden block`}>
                    <div 
                        style={{
                            zIndex: '6000'
                        }}
                        className={`absolute bg-white top-0 duration-200 ${!open ? 'left-[-120%]' : 'left-0'} right-0 w-full h-screen   md:hidden ring  `}>
                        <div className="flex container items-center mt-3 bg justify-between w-full">
                            <Link to="/" className="text-2xl font-bold ml-5">
                                <img src={logo} alt="" className="w-20 " />
                            </Link>
                            <button onClick={() => setOpen(!open)} className=" p-1 text-black text-2xl">
                                <MdClose />
                            </button>
                        </div>
                        <ul className="text-black mt-3">
                            {links?.map(itm => (
                                <li key={itm?.id}>
                                    {itm?.isDropdown ? (
                                        <div className="">
                                            <button
                                                onClick={() => setOpenDropdownId(openDropdownId === itm.id ? null : itm.id)}
                                                className="flex items-center px-3 py-2 border-b w-full hover:bg-gray-800 hover:text-white gap-2 h-[60px] relative group justify-between"
                                            >
                                                {itm?.name}
                                                <FaAngleDown className={`mt-2 ${openDropdownId === itm.id ? 'transform rotate-180' : ''}`} />
                                            </button>
                                            {openDropdownId === itm.id && (
                                                <div className="mx-auto p-3 rounded-b ring-1 ring-gray-300 bg-gray-100">
                                                    {itm?.dropdownItems?.map(item => (
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
                                        <NavLink to="/" onClick={() => setOpen(!open)} className="block py-3 px-3 hover:bg-gray-800 hover:text-white duration-150 border-b">
                                            {itm?.name}
                                        </NavLink>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <Link to={'/sign-in'}>
                            <div className="flex justify-center">
                                <button className="bg-red-600 mt-3  w-[93%] text-white md:px-8 px-4  md:text-md text-sm  py-2 rounded">
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