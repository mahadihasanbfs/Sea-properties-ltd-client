import { useRef, useState } from 'react';
import logo from '../../../assets/logo.png';
import useImageUpload from '../../../hooks/useUploadImg';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

const EditView = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const { id } = useParams();
    const { data: report = [] } = useQuery({
        queryKey: ["report"],
        queryFn: async () => {
            const res = await fetch('https://backend.seapropertiesltd.com.bd/api/v1/admin/user-land-registration');
            const data = await res.json();
            return data?.data;
        },
    });

    const date = new Date();
    const editItm = report?.find(itm => itm?._id === id);
    console.log(editItm, '------====');
    return (
        <div>
            <div className='' ref={componentRef}>
                <div>
                    <div
                        ref={componentRef}
                        // style={{
                        //     backgroundImage: 'url(https://i.ibb.co/D4z4S2h/Rectangle-55.png)'
                        // }}
                        className="max-w-[1366px] print-data mx-auto bg-cover bg-center h-fit print-main-box px-[60px] mt-[70px] relative">
                        {/* social links */}

                        {/* logo */}
                        <div className='flex  justify-between items-center '>
                            <ul className="space-y-2 mb-3">
                                <li>
                                    <a href="" className="w-6 h-6 rounded-[50%] bg-[#A20E27] flex justify-center items-center">
                                        <img src="https://i.ibb.co/pnVMx5S/facebook-fill.png" alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="w-6 h-6 rounded-[50%] bg-[#A20E27] flex justify-center items-center">
                                        <img src="https://i.ibb.co/PtkdWgz/twitter.png" alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="w-6 h-6 rounded-[50%] bg-[#A20E27] flex justify-center items-center">
                                        <img src="https://i.ibb.co/n1gFW0z/youtube.png" alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="w-6 h-6 rounded-[50%] bg-[#A20E27] flex justify-center items-center">
                                        <img src="https://i.ibb.co/gvnHg8X/linkedin-alt.png" alt="" />
                                    </a>
                                </li>
                            </ul>
                            <div className='flex flex-col  items-center  print-center-box  '>
                                <img className='w-[180px] print-logo h-[90px] object-contain' src={logo} alt="" />
                                <h2 className='text-[40px] print-title print-title font-medium text-center'>Land <br /> Registration Form</h2>
                            </div>

                            {/* img upload and date */}
                            <div className='flex flex-col items-end '>
                                <input readOnly
                                    type="file"
                                    accept="image/*"
                                    name='test'
                                    className='hidden'
                                />
                                <div className='w-[188px] print-photo h-[208px] border-[1px] border-[#A20E27]'>

                                    {editItm?.img &&
                                        <div className='relative w-full h-full mx-auto'>
                                            <img src={editItm?.img} alt="Uploaded" className='w-full  h-full object-cover object-center' />

                                        </div>
                                    }
                                </div>

                                <div className=' whitespace-nowrap text-sm print-date-box h-[35px] font-semibold text-[#A20E27] text-end border border-[#A20E27] mt-4 relative px-2 flex items-center'>
                                    Date:   {
                                        new Date().toLocaleString(editItm?.timestamp)
                                    }
                                </div>
                            </div>
                        </div>

                        <div
                            className='space-y-4 '>
                            {/* Serial No */}
                            <div className='flex gap-2 print-mt-header print-mt-sm items-end'>
                                <p>Serial No</p>
                                <input readOnly
                                    value={editItm?.SN}
                                    type="text"
                                    name='serialNumber'
                                    className='focus:outline-none border-b-[1px] border-black'
                                />
                            </div>

                            <div className='w-full print-bar print-mt-header-0 h-[55px] bg-cover bg-[#A20E27] mt-10 flex items-center pl-4' style={{ backgroundImage: "url(https://i.ibb.co/1LdyZhT/Rectangle-58.png)" }}>
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
                                <div className='space-y-4'>
                                    <div className='w-[400px] whitespace-nowrap print-data-show py-[14px] px-4 border border-black flex justify-between'>
                                        <p>Date of birth : </p>
                                        <input readOnly
                                            defaultValue={editItm?.birthDate}
                                            name='birthDate'
                                            type="date"
                                            className='w-[250px] focus:outline-none pl-2 cursor-default bg-[transparent]'
                                        />
                                    </div>

                                    <div className='w-[400px] py-[14px] whitespace-nowrap print-data-show px-4 border border-black flex'>
                                        <p>NID/Passport : </p>
                                        <input readOnly
                                            defaultValue={editItm?.nidOrPassportNumber}
                                            name='nidOrPassportNumber'
                                            type="text"
                                            className=' focus:outline-none pl-2 cursor-default bg-[transparent]'
                                        />
                                    </div>
                                </div>

                                <div className='space-y-4'>
                                    <div className='w-[400px] print-box-2 whitespace-nowrap print-data-show py-[14px] px-4 border border-black flex'>
                                        <p>Nationality : </p>
                                        <input readOnly
                                            defaultValue={editItm?.nationality}
                                            name='nationality'
                                            type="text"
                                            className='focus:outline-none pl-2 cursor-default bg-[transparent]'
                                        />
                                    </div>

                                    <div className='w-[400px] print-box-2 whitespace-nowrap print-data-show py-[14px] px-4 border gap-3 border-black flex'>
                                        <p>Gender: </p>
                                        <div className='flex justify-center items-center gap-2'>
                                            <p>{editItm?.gendar}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* project details input fields*/}
                            <div className='w-full h-[55px] print-mt-header-3 print-bar print-mt-sm bg-cover bg-[#A20E27] mt-[40px!important] flex items-center pl-4' style={{ backgroundImage: "url(https://i.ibb.co/1LdyZhT/Rectangle-58.png)" }}>
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
                            <div className='w-full h-[55px] print-bar print-mt-header-4 bg-cover bg-[#A20E27] mt-[40px!important] flex items-center pl-4' style={{ backgroundImage: "url(https://i.ibb.co/1LdyZhT/Rectangle-58.png)" }}>
                                <p className='text-[20px] text-[white]'>Payment Information</p>
                            </div>

                            <div className='flex justify-between print-mt-header-4 print-mt-header-3'>
                                <div className=' print-single-box w-[400px] whitespace-nowrap print-data-show py-[14px] px-4 border border-black flex'>
                                    <p>Total Share Price : </p>
                                    <input readOnly
                                        defaultValue={editItm?.totalSharePrice}
                                        name='totalSharePrice'
                                        type="text"
                                        className='focus:outline-none pl-2 cursor-default bg-[transparent]'
                                    />
                                </div>

                                <div className='print-box  w-[820px] print-single-box-2 whitespace-nowrap print-data-show py-[14px] px-4 border border-black flex'>
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
                                <div className='whitespace-nowrap print-single-box print-box print-data-show w-[400px] py-[14px] px-4 border border-black flex'>
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
                                <div className='w-[400px] whitespace-nowrap print-single-box print-box print-data-show py-[14px] px-4 border border-black flex'>
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
                            <div className='flex justify-between print-mt-sm mt-[50px!important] print-mt-header-3'>
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
                </div >
            </div>
            <div className='flex items-center justify-center'>
                <button onClick={handlePrint} className='px-4 py-2 mt-8 mb-16 mx-auto bg-[#912424] text-[white] rounded shadow'>
                    Print
                </button>
            </div>
        </div>
    );
};

export default EditView;