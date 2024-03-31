/* eslint-disable no-unused-vars */
import logo from '../assets/logo.png';
import { useState } from "react";
import { FaAngleDown, FaUpDown } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { Outlet } from "react-router";
import { Link, NavLink } from 'react-router-dom';
import AdminSideNav from '../Admin/Component/AdminSideNav';
import { GoHome } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";

export default function AdminLayout() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [activeMenu, setActiveMenu] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex flex-col md:flex-row sticky overflow-hidden h-screen">
                <aside className={`${!toggleMenu ? 'lg:w-64 md:w-0 w-0' : 'lg:w-0 w-full'} duration-200 w-30  bg-dark text-light h-[100vh] overflow-y-auto shadow-md z-[100]`}>
                    <div className="flex items-center bg-gray-900 justify-between">
                        <div className="flex items-center text-white px-8 h-[70px] space-x-2">
                            <img src={logo} alt="logo" className="w-20 " />
                        </div>
                        <button onClick={() => setToggleMenu(!toggleMenu)} className="mr-10 block lg:hidden">
                            <IoClose />
                        </button>
                    </div>
                    <div className="px-6 py-2 md:relative ">
                        <nav className="text-white">
                            <AdminSideNav />
                        </nav>
                    </div>
                </aside>

                <main className="flex-1 bg-[#f7f7f7] overflow-y-auto md:relative fixed top-0 left-0 lg:px-8 p-2 right-0 w-full">
                    <nav className="bg-[white] rounded md:px-8 px-4 h-[70px] md:rel flex items-center justify-between" >
                        <div className="flex items-center gap-2">
                            <div className="">
                                {!toggleMenu && <img src={logo} alt="logo" className="w-20 md:hidden block" />}
                            </div>
                            <button
                                onClick={() => setToggleMenu(!toggleMenu)}
                                className="rounded">
                               <RxHamburgerMenu className='text-2xl'/>
                            </button>
                        </div>
                        <div className="flex items-center md:gap-4 gap-2">
                            <Link to={`/`}>
                                <div className="hover:bg-[#e5e5e5b5] duration-150 w-[38px] h-[38px] rounded-full flex items-center justify-center">
                                    <GoHome className='text-2xl' />
                                </div>
                            </Link>
                            <div className="flex relative items-center gap-2">
                                <div
                                    onClick={() => setActiveMenu(!activeMenu)}
                                    className="flex items-center gap-3 cursor-pointer">
                                    <div className='text-end group cursor-pointer'>
                                        <h3 className="text-sm font-semibold">Name</h3>
                                        <p className="text-xs text-[gray]">admin</p>
                                    </div>
                                    <img src="https://randomuser.me/api/portraits/men/18.jpg" alt="" className="w-10 h-10 rounded-full cursor-pointer" />
                                </div>

                                {activeMenu &&
                                    <ul className="bg-whtie shadow-lg absolute top-[57px] bg-[white] ring-1 ring-[#8080805d] right-0  w-[200px] p-2">
                                        <li>
                                            <Link to="/dashboard">
                                                <div className="flex w-full hover:bg-dark duration-100 hover:text-[white] text-sm px-2 py-2 items-center  gap-2">
                                                    Profile
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/dashboard">
                                                <div className="flex w-full hover:bg-dark duration-100 hover:text-[white] text-sm px-2 py-2 items-center  gap-2">
                                                    Log out
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>}
                            </div>
                        </div>
                    </nav>
                    <div className=" py-2">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

