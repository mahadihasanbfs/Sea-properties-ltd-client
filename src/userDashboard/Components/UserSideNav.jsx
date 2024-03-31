/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaAngleDown, FaUpDown } from 'react-icons/fa6';
import { Outlet } from "react-router";
import { Link, NavLink } from 'react-router-dom';

export default function UserSideNav() {
    const [toggleMenu, setToggleMenu] = useState(true);
    const [activeMenu, setActiveMenu] = useState(false);


    const [open, setOpen] = useState(null);
    const [isOpen, setIsOpen] = useState(null);

    const handleToggle = (idx) => setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));


    const links = [
        {
            id: 0,
            name: 'Flat Installment',
            icon: 'ICN',
            path: '/user/flat-installment',
            role: 'user',
            isDropdown: false,
            menu: []
        },
      
    ];
    return (
        <ul className='space-y-2'>
            {
                links.map((data, idx) =>
                    <div key={data?.id}>
                        {data?.isDropdown ? 
                        // dropdown nav
                        <li className="cursor-pointer" >
                            {/* header / Title */}
                            <div onClick={() => handleToggle(idx)} className={`px-3 py-2 rounded hover:bg-[#00000036] hover:text-black duration-200 bg-[#001eff00]`}>
                                <div className="flex items-center">
                                    <div className="flex justify-between items-center gap-2">
                                        <div className="w-[30px] h-[30px] rounded bg-[gray] flex items-center justify-center">
                                            {data?.icon}
                                        </div>
                                        {/* <img src={data.icon} alt="" className="w-[30px]" /> */}
                                        <span className="text-md">{data.name}</span>
                                    </div>
                                    <div onClick={() => setOpen(!open)} className="ml-auto text-xs">
                                        <FaAngleDown />
                                    </div>
                                </div>
                            </div>

                            {/* body / content  */}
                            <div className={`grid overflow-hidden transition-all duration-300 ease-in-out   ${isOpen === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <ol className={` text-sm  space-y-1 pt-1 pb-2 px-2 bg-gray-100 mt-1 `}>
                                        {
                                            data.menu.map(itm => <li key={itm?.id}>
                                                <Link to={itm?.path}>
                                                    <div className="px-2 py-2 text-sm rounded flex items-center justify-between duration-200 hover:bg-secondary">
                                                        <div className="flex items-center gap-2">
                                                            <span className="bg-[gray] w-[32px] h-[32px] flex items-center justify-center rounded">{itm?.icon}</span>  {itm.name}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>)
                                        }
                                    </ol>
                                </div>
                            </div>
                        </li>
                            :
                            // single nav
                            <NavLink to={data?.path}
                                className={({ isActive }) => isActive ? 'bg-slate-700  hover:bg-[#00000048] text-white  py-2 pl-3 rounded block'
                                    : 'text-gray-900   py-2 pl-3 hover:bg-[#00000051] hover:text-black duration-200 rounded block'}>

                                <div className={` `}>
                                    <div className="flex items-center">
                                        <div className="flex justify-between items-center gap-2">
                                            <div className="w-[30px] rounded h-[30px] bg-[gray] flex items-center justify-center">
                                                {data?.icon}
                                            </div>
                                            {/* <img src={data.icon} alt="" className="w-[30px]" /> */}
                                            <span className="text-md ">{data?.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>}
                    </div>)
            }
        </ul>
    )
}

