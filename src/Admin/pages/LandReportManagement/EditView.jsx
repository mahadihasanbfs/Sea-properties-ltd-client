import { useRef, useState } from 'react';
import logo from '../../../assets/Logo_light.png';
import useImageUpload from '../../../hooks/useUploadImg';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { Helmet } from 'react-helmet';
import { MdOutlineCall } from 'react-icons/md';
import { AiOutlineGlobal } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { FaFacebookF } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import bg from '../../../assets/bg-form.png'
const EditView = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const { id } = useParams();
    const { data: report = [] } = useQuery({
        queryKey: ["report"],
        queryFn: async () => {
            const res = await fetch('http://localhost:5001/api/v1/admin/user-land-registration');
            const data = await res.json();
            return data?.data;
        },
    });

    const editItm = report?.find(itm => itm?._id === id);
    const date = new Date(editItm?.timestamp);
    const formattedDate = date.toDateString();

    console.log(formattedDate, '------====');
    return (
        <div className=''>
            <Helmet>
                <title>Land Registration Report</title>
            </Helmet>
            <div className='' ref={componentRef}>
                <div>






                    <div
                        ref={componentRef}
                        style={{
                            backgroundImage: `url(${bg})`,
                        }}
                        className="max-w-[1366px] bg-[white] overflow-hidden print-data mx-auto bg-cover bg-center h-fit print-main-box mt-[70px] relative">


                        <div className=" px-[60px]">
                            <div className="grid grid-cols-3">
                                <div className="">
                                    <ul className="space-y-1 absolute">
                                        <li className='flex items-center gap-2 font-semibold'>
                                            <a href="" className="w-5 h-5 rounded-[50%] text-[white] bg-[#A20E27] flex justify-center items-center">
                                                <MdOutlineCall className='text-xs' />
                                            </a>
                                            <small className='print-text-xs'>+88 01894440111</small>
                                        </li>
                                        <li className='flex items-center gap-2 font-semibold'>
                                            <a href="" className="w-5 h-5 rounded-[50%] text-[white] bg-[#A20E27] flex justify-center items-center">
                                                <AiOutlineGlobal />

                                            </a>
                                            <small className='print-text-xs'>https://seapropertiesltd.com.bd</small>
                                        </li>
                                        <li className='flex items-center gap-2 font-semibold'>
                                            <a href="" className="w-5 h-5 rounded-[50%] text-[white] bg-[#A20E27] flex justify-center items-center">
                                                <HiOutlineMail />
                                            </a>
                                            <small className='print-text-xs'>info.seapropertiesltd@gmail.com</small>
                                        </li>
                                        <li className='flex items-center gap-2 font-semibold'>
                                            <a href="" className="w-5 h-5 rounded-[50%] text-[white] bg-[#A20E27] flex justify-center items-center">
                                                <FaFacebookF className='text-xs' />
                                            </a>
                                            <small className='print-text-xs'>fb.com/seapropertiesltd.com.bd</small>
                                        </li>
                                        <li className='flex items-start gap-2 font-semibold'>
                                            <a href="" className="w-5 h-5 rounded-[50%] text-[white] bg-[#A20E27] flex justify-center items-center">
                                                <IoLocationOutline className='text-xs' />
                                            </a>
                                            <small className='print-text-xs'>
                                                100 North Kalshi, Gate No - 01, <br /> Mirpur DOHS,
                                                Dhaka, Bangladesh
                                            </small>
                                        </li>


                                    </ul>
                                </div>
                                <div className="flex justify-center">
                                    <div className='flex  flex-col items-center '>
                                        {/* <span className="ring-1 ring-[black] px-2 py-1 text-sm mb-3 print-m-b rounded-full">CUSTOMER COPY</span> */}
                                        <div className='print-mt-title h-full flex flex-col justify-center items-between'>
                                            <img className='w-[270px] mt-3 object-contain print-logo' src={logo} alt="" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end ">
                                    <div>
                                        <input readOnly
                                            type="file"
                                            accept="image/*"
                                            name='test'
                                            className='hidden'
                                        />
                                        <div className='w-[188px] relative print-photo h-[208px] border-[1px] border-[#A20E27]'>

                                            {editItm?.img &&
                                                <div className='relative w-full h-full mx-auto'>
                                                    <img src={editItm?.img} alt="Uploaded" className='w-full ml-auto   h-full object-cover object-center' />

                                                </div>
                                            }
                                        </div>

                                        {/* <div className=' whitespace-nowrap border  text-center border-[#A20E27] text-[#A20E27] print-date-text px-1 py-1 mt-1 text-sm font-semibold'>
                                            {
                                                formattedDate
                                            }
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 mt-3 print-grid items-end">
                                <div>
                                    <div className='flex gap-2 items-end'>
                                        <p>Reference :</p>
                                    </div>
                                    <div className='flex gap-2 whitespace-nowrap items-end'>
                                        <p>Serial No</p>
                                        <input
                                            value={editItm?.SN}
                                            type="text"
                                            name='serialNumber'
                                            className='focus:outline-none  border-dashed w-[100px] border-black'
                                        />
                                    </div>
                                </div>
                                <h2 className='text-[40px] font-[900]  print-head-text text-center '>BOOKING FORM</h2>
                                <div className='pb-3'>
                                    <div className='print-date-area  border border-[#A20E27] text-center w-[200px] ml-auto flex items-center justify-center'>
                                        {
                                            formattedDate
                                        }
                                    </div>
                                </div>
                            </div>

                            <div
                                className='space-y-2 '>
                                {/* Serial No */}
                                <div className='w-full print-bar print-mt-header-0 h-[40px] bg-cover bg-[#A20E27] mt-10 flex items-center pl-4'>
                                    <p className='text-[20px] text-[white]'>Client Information</p>
                                </div>

                                {/* client information input field */}
                                <div className='w-full whitespace-nowrap  print-mt-header-3 print-data-show py-[14px] px-4 border border-black flex'>
                                    <p>Applicant’s Name in English : </p>
                                    <input readOnly
                                        defaultValue={editItm?.englishName}
                                        name='englishName'
                                        type="text"
                                        className='w-full focus:outline-none pl-2 cursor-default bg-[transparent]'
                                    />
                                </div>

                                <div className='w-full py-[14px] whitespace-nowrap px-4 border print-mt-header-3 print-data-show border-black flex'>
                                    <p>Applicant’s Name in Bangla : </p>
                                    <input readOnly
                                        defaultValue={editItm?.banglaName}
                                        name='banglaName'
                                        type="text"
                                        className='w-[800px] focus:outline-none pl-2 cursor-default bg-[transparent]'
                                    />
                                </div>

                                <div className='w-full py-[14px] whitespace-nowrap print-mt-header-3 print-data-show px-4 border border-black flex'>
                                    <p>Father/Husband’s Name in English : </p>
                                    <input readOnly
                                        defaultValue={editItm?.fatherOrHusbandsEnglishName}
                                        name='fatherOrHusbandsEnglishName'
                                        type="text"
                                        className='w-[800px] focus:outline-none pl-2 cursor-default bg-[transparent]'
                                    />
                                </div>

                                <div className='w-full whitespace-nowrap print-mt-header-3 print-data-show py-[14px] px-4 border border-black flex'>
                                    <p>Father/Husband’s Name in Bangla : </p>
                                    <input readOnly
                                        defaultValue={editItm?.fatherOrHusbandsBanglaName}
                                        name='fatherOrHusbandsBanglaName'
                                        type="text"
                                        className='w-[800px] focus:outline-none pl-2 cursor-default bg-[transparent]'
                                    />
                                </div>

                                <div className='w-full print-py-sm py-[14px] whitespace-nowrap print-mt-header-3 print-data-show px-4 border border-black flex'>
                                    <p>Mother’s Name in English : </p>
                                    <input readOnly
                                        defaultValue={editItm?.motherEnglishName}
                                        name='motherEnglishName'
                                        type="text"
                                        className='w-[800px] focus:outline-none pl-2 cursor-default bg-[transparent]'
                                    />
                                </div>

                                <div className='w-full whitespace-nowrap print-mt-header-3 print-data-show py-[14px] px-4 border border-black flex'>
                                    <p>Mother’s Name in Bangla : </p>
                                    <input readOnly
                                        defaultValue={editItm?.motherBanglaName}
                                        name='motherBanglaName'
                                        type="text"
                                        className='w-[800px] focus:outline-none pl-2 cursor-default bg-[transparent]'
                                    />
                                </div>

                                <div className='w-full whitespace-nowrap print-mt-header-3 print-data-show py-[14px] px-4 border border-black flex'>
                                    <p>Permanent Address in Bangla : </p>
                                    <input readOnly
                                        defaultValue={editItm?.address}
                                        name='address'
                                        type="text"
                                        className='w-[800px] focus:outline-none pl-2 cursor-default bg-[transparent]'
                                    />
                                </div>

                                <div className='flex justify-between print-mt-header-3'>
                                    <div className='space-y-2'>
                                        <div className='w-[400px] whitespace-nowrap print-data-show  print-half-div py-[14px] px-4 border border-black flex justify-between'>
                                            <p >Date of birth : </p>
                                            <input readOnly
                                                defaultValue={editItm?.birthDate}
                                                name='birthDate'
                                                type={editItm?.birthDate ? "date" : "text"}
                                                className='w-full ml-3  focus:outline-none cursor-default bg-[transparent]'
                                            />
                                        </div>

                                        <div className='w-[400px] py-[14px] whitespace-nowrap print-data-show print-half-div px-4 border border-black flex'>
                                            <p>NID/Passport : </p>
                                            <input readOnly
                                                defaultValue={editItm?.nidOrPassportNumber}
                                                name='nidOrPassportNumber'
                                                type="text"
                                                className=' focus:outline-none pl-2 cursor-default bg-[transparent]'
                                            />
                                        </div>
                                    </div>

                                    <div className='space-y-2'>
                                        <div className='w-[400px] print-box-2 whitespace-nowrap print-data-show print-half-div py-[14px] px-4 border border-black flex'>
                                            <p>Nationality : </p>
                                            <input readOnly
                                                defaultValue={editItm?.nationality}
                                                name='nationality'
                                                type="text"
                                                className='focus:outline-none pl-2 cursor-default bg-[transparent]'
                                            />
                                        </div>

                                        <div className='w-[400px] print-box-2 whitespace-nowrap print-data-show print-half-div py-[14px] px-4 border gap-3 border-black flex'>
                                            <p>Gender : </p>
                                            <div className='flex capitalize justify-center items-center gap-2'>
                                                <p>{editItm?.gendar}</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* project details input fields*/}
                                <div className='w-full h-[40px] print-mt-header-3 print-details-bar print-bar print-mt-sm bg-cover bg-[#A20E27] mt-[30px!important] flex items-center pl-4'>
                                    <p className='text-[20px] text-[white]'>Project Details</p>
                                </div>

                                <div className='w-full py-[14px] print-mt-header-3 print-data-show whitespace-nowrap px-4 border border-black flex'>
                                    <p>Name of the project : </p>
                                    <input readOnly
                                        defaultValue={editItm?.projectName}
                                        name='projectName'
                                        type="text"
                                        className='w-[800px] focus:outline-none pl-2 cursor-default bg-[transparent]'
                                    />
                                </div>

                                <div className='w-full py-[14px] print-mt-header-3 px-4 print-data-show whitespace-nowrap border border-black flex'>
                                    <p>Project Address : </p>
                                    <input readOnly
                                        defaultValue={editItm?.projectAddress}
                                        name='projectAddress'
                                        type="text"
                                        className='w-[800px] focus:outline-none pl-2 cursor-default bg-[transparent]'
                                    />
                                </div>


                                {/* payment information input fields */}
                                <div className='w-full h-[40px] print-bar print-mt-header-4 bg-cover bg-[#A20E27] mt-[40px!important] flex items-center pl-4 text-start'>
                                    <p className='text-[20px] text-[white]'>Payment Information</p>
                                </div>

                                <div className='flex justify-between print-mt-header-4 print-mt-header-3'>
                                    <div className='text-start print-single-box w-[400px] whitespace-nowrap print-data-show py-[14px] px-4 border border-black flex'>
                                        <p>Total Share Price : </p>
                                        <input readOnly
                                            defaultValue={editItm?.totalSharePrice}
                                            name='totalSharePrice'
                                            type="text"
                                            className='focus:outline-none pl-2 cursor-default bg-[transparent]'
                                        />
                                    </div>

                                    <div className='print-box  w-[820px] print-single-box-2 whitespace-nowrap  py-[14px] px-4 border border-black flex'>
                                        <p className='whitespace-wrap'>In Word : </p>
                                        <input readOnly
                                            defaultValue={editItm?.totalSharePriceInWord}
                                            name='totalSharePriceInWord'
                                            type="text"
                                            className='w-[500px] focus:outline-none pl-2 cursor-default bg-[transparent]'
                                        />
                                    </div>
                                </div>

                                <div className='flex justify-between print-mt-header-4  print-mt-header-3'>
                                    <div className='text-start print-single-box w-[400px] whitespace-nowrap print-data-show py-[14px] px-4 border border-black flex'>
                                        <p>Booking Money : </p>
                                        <input readOnly
                                            defaultValue={editItm?.bookingMoney}
                                            name='bookingMoney'
                                            type="text"
                                            className='focus:outline-none pl-2 cursor-default bg-[transparent]'
                                        />
                                    </div>

                                    <div className='w-[820px] whitespace-nowrap print-single-box-2 print-box py-[14px] px-4 border border-black flex'>
                                        <p>In Word : </p>
                                        <input readOnly
                                            defaultValue={editItm?.bookingMoneyInWord}
                                            name='bookingMoneyInWord'
                                            type="text"
                                            className='w-[500px] focus:outline-none pl-2 cursor-default bg-[transparent]'
                                        />
                                    </div>
                                </div>

                                <div className='flex justify-between print-mt-header-4  print-mt-header-3'>
                                    <div className='text-start print-single-box w-[400px] whitespace-nowrap print-data-show py-[14px] px-4 border border-black flex'>
                                        <p>Due Amount : </p>
                                        <input readOnly
                                            defaultValue={editItm?.dueAmount}
                                            name='dueAmount'
                                            type="text"
                                            className='focus:outline-none pl-2 cursor-default bg-[transparent]'
                                        />
                                    </div>

                                    <div className='w-[820px]  print-single-box-2 whitespace-nowrap print-box print-data-show pt-[14px] pb-[7px] px-4 border border-black flex'>
                                        <p>In Word : </p>
                                        <input readOnly
                                            defaultValue={editItm?.dueAmountInWord}
                                            name='dueAmountInWord'
                                            type="text"
                                            className='w-[500px] focus:outline-none pl-2 cursor-default bg-[transparent]'
                                        />
                                    </div>
                                </div>

                                {/* signature input fields */}
                                <div className='flex justify-between  mt-[50px!important] print-footer'>
                                    < div className='flex flex-col items-center'>
                                        <input readOnly defaultValue={editItm?.authorizedSignature} name='authorizedSignature' type="text" className='border-b text-center focus:outline-none bg-[transparent] border-black px-2' />
                                        <p>Authorized Signature</p>
                                    </div>

                                    < div className='flex flex-col   items-center'>
                                        <input readOnly defaultValue={editItm?.sharersSignature} name='sharersSignature' type="text" className='border-b text-center focus:outline-none bg-[transparent] border-black px-2' />
                                        <p>Sharer’s Signature</p>
                                    </div>
                                </div>


                                {/* <div className='w-full print-bar h-[118px] bg-cover bg-center bg-no-repeat bg-[#A20E27] mt-[40px!important] flex items-center pl-4' style={{ backgroundImage: "url(https://i.ibb.co/hsytgwT/Rectangle-58-1.png)" }}>
                            </div> */}
                            </div>
                        </div>


                        <div className='w-full h-[60px] print-bar print-mt-footer-4 bg-cover bg-[#A20E27] mt-[40px!important] flex items-center pl-4 text-start'>
                            {/* <p className='text-[20px] text-[white]'>Payment Information</p> */}
                        </div>

                    </div>

                </div >
            </div>
            <div className='flex items-center justify-center'>
                <button onClick={handlePrint} className='px-4 py-2 mt-8 mb-16 mx-auto bg-[#912424] text-[white] rounded shadow'>
                    Print
                </button>
            </div>
        </div >
    );
};

export default EditView;