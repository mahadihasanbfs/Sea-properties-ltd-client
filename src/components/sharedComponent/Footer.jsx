import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="bg-white  py-12 overflow-hidden lg:px-6">
            <div className="container px-12 grid md:grid-cols-2 grid-cols-1 lg:gap-2">
                <div>
                    <img src={logo} className='w-20' alt="" />
                    <p className="text-gray-800 mt-4 md:w-[260px]">

                        100 North Kalshi, Gate No - 1, Mirpur DOHS, Dhaka, Bangladesh

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
                                className='text-gray-800 text-md font-[400]'> Phone:
                                <a
                                    href="tel:01894-440111"
                                    className='text-[#825DC8]'>
                                    &nbsp;01894-440111
                                </a>
                            </div>
                            <div
                                className='text-gray-800 text-md font-[400]'> Email:
                                <a
                                    href="mailto:example@e.com"
                                    className='text-[#825DC8]'>
                                    &nbsp;info@seapropertiesltd.com.bd
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className=' md:ml-auto'>
                        <h2
                            className="text-gray-900 font-bold text-[24px] mb-4">Follow Us
                        </h2>
                        <div
                            className="flex gap-2">
                            <div
                                className='text-gray-800 text-md font-[400]'>
                                <a
                                    href="https://www.facebook.com/seapropertiesltd.com.bd"
                                    target='_blank'
                                    className='text-light'>
                                    <div className="bg-[#9f0931b9] w-[32px] text-white flex items-center justify-center h-[32px] rounded-full">
                                        <FaFacebookF />
                                    </div>
                                </a>
                            </div>
                            <div
                                className='text-gray-800 text-md font-[400]'>
                                <a
                                    href="https://www.instagram.com/seapropertiesltd"
                                    target='_blank'
                                    className='text-light'>
                                    <div className="bg-[#9f0931b9] w-[32px] text-white flex items-center justify-center h-[32px] rounded-full">
                                        <FaInstagram />
                                    </div>
                                </a>
                            </div>
                            <div
                                className='text-gray-800 text-md font-[400]'>
                                <a
                                    href="https://www.linkedin.com/company/seapropertiesltd"
                                    target='_blank'
                                    className='text-light'>
                                    <div className="bg-[#9f0931b9] w-[32px] text-white flex items-center justify-center h-[32px] rounded-full">
                                        <FaLinkedinIn />
                                    </div>
                                </a>
                            </div>
                            <div
                                className='text-gray-800 text-md font-[400]'>
                                <a
                                    href="https://www.youtube.com/channel/UCNAukuPlGHAigQ1XnzSjqhw"
                                    target='_blank'
                                    className='text-light'>
                                    <div className="bg-[#9f0931b9] w-[32px] text-white flex items-center justify-center h-[32px] rounded-full">
                                        <FaYoutube />
                                    </div>
                                </a>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div className="border-t pt-4 mt-6 container md:flex items-center md:justify-between">
                <p className="text-gray-900 md:text-start text-center text-sm">
                    © SEA Properties Ltd. All Rights Reserved, {new Date().getFullYear()}
                </p>

                <div className="flex md:justify-start justify-center md:mt-0 mt-2 gap-3 items-center">
                    <Link to={'/privacy-policy'} className='border-r pr-3 border-gray-600 text-sm hover:text-blue-600' >Privacy Policy</Link>
                    <Link className=' pr-3 border-gray-600 text-sm hover:text-blue-600' to={`/terms-condition`}>Terms & Conditions</Link>

                </div>
            </div>
        </div>
    );
};

export default Footer;