import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="bg-white  py-12 overflow-hidden lg:px-6">
            <div className="container px-12 grid md:grid-cols-2 grid-cols-1 lg:gap-2">
                <div>
                    <img src={logo} className='w-20' alt="" />
                    <p className="text-gray-800 mt-4 md:w-[260px]">
                        Sed ut perspiciatis undmnis is iste
                        natus error sit amet voluptatem
                        totam rem aperiam.
                    </p>
                </div>
                <div
                    className='grid md:grid-cols-2 justify-between grid-cols-1 gap-3'
                >
                    <div>
                        <h2
                            className="text-gray-900 font-bold text-[24px] mb-4">Contact
                        </h2>
                        <div
                            className="flex flex-col gap-2">
                            <div
                                className='text-gray-800 text-md font-[400]'> Phone :
                                <a
                                    href="tel:01303531371"
                                    className='text-[#825DC8]'>
                                    01303531371
                                </a>
                            </div>
                            <div
                                className='text-gray-800 text-md font-[400]'> Email :
                                <a
                                    href="mailto:example@e.com"
                                    className='text-[#825DC8]'>
                                    example@e.com
                                </a>
                            </div>
                            <div
                                className='text-gray-800 text-md font-[400]'> Address :
                                <span
                                    className='text-[#825DC8]'>
                                    123, New Lenox Chicago, IL 60606
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className=' ml-auto'>
                        <h2
                            className="text-gray-900 font-bold text-[24px] mb-4">Social
                        </h2>
                        <div
                            className="flex gap-2">
                            <div
                                className='text-gray-800 text-md font-[400]'>
                                <Link
                                    to="/"
                                    className='text-[#825DC8]'>
                                    <div className="bg-[#323232] w-[32px] text-white flex items-center justify-center h-[32px] rounded-full">
                                        <FaFacebookF />
                                    </div>
                                </Link>
                            </div>
                            <div
                                className='text-gray-800 text-md font-[400]'>
                                <Link
                                    to="/"
                                    className='text-[#825DC8]'>
                                    <div className="bg-[#323232] w-[32px] text-white flex items-center justify-center h-[32px] rounded-full">
                                        <FaTwitter />
                                    </div>
                                </Link>
                            </div>
                            <div
                                className='text-gray-800 text-md font-[400]'>
                                <Link
                                    to="/"
                                    className='text-[#825DC8]'>
                                    <div className="bg-[#323232] w-[32px] text-white flex items-center justify-center h-[32px] rounded-full">
                                        <FaLinkedinIn />
                                    </div>
                                </Link>
                            </div>
                            <div
                                className='text-gray-800 text-md font-[400]'>
                                <Link
                                    to="/"
                                    className='text-[#825DC8]'>
                                    <div className="bg-[#323232] w-[32px] text-white flex items-center justify-center h-[32px] rounded-full">
                                        <FaYoutube />
                                    </div>
                                </Link>
                            </div>

                        </div>
                        <p className="md:w-[260px] mt-4">
                            Sed ut perspiciatis undmnis is iste natus error sit amet volup
                        </p>
                    </div>
                </div>
            </div>
            <div className="border-t pt-4 mt-6 container flex items-center md:justify-between">
                <p className="text-gray-900 text-sm">
                    (C) SMA Technologies. All Rights Reserved, 2023
                </p>
                <div className="flex gap-3 items-center">
                    <Link className='border-r pr-3 border-gray-600 text-sm hover:text-blue-600' to={``}>Privacy Policy</Link>
                    <Link className='border-r pr-3 border-gray-600 text-sm hover:text-blue-600' to={``}>Terms & Conditions</Link>
                    <Link className='border-r pr-3 border-gray-600 text-sm hover:text-blue-600' to={``}>Sitemap</Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;