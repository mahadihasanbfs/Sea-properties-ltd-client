import { useContext, useRef, useState } from 'react';
import logo from '../../../assets/Logo_light.png';
import useImageUpload from '../../../hooks/useUploadImg';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { reload } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import { AiOutlineGlobal } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { MdOutlineCall } from 'react-icons/md';
import bg from '../../../assets/bg-form.png';
const LandRegistrationForm = () => {
    const { user } = useContext(AuthContext);
    // this section is used to handle banner img
    const { data: SN = [], relaod } = useQuery({
        queryKey: ["SN"],
        queryFn: async () => {
            const res = await fetch('https://backend.seapropertiesltd.com.bd/api/v1/admin/serial-number');
            const data = await res.json();
            return data?.data;
        },
    });

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const date = new Date();
    const fileInputRef = useRef(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);
        } else {
            alert('Please select a valid image file.');
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleDeleteImage = () => {
        reload();
        setImage(null);
        fileInputRef.current.value = '';
    };


    // this section is use to handle single checkbox functionalities
    const [checkboxes, setCheckboxes] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false
    });

    // Function to handle checkbox change
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        const updatedCheckboxes = { ...checkboxes };

        // Uncheck all checkboxes
        Object.keys(updatedCheckboxes).forEach((key) => {
            updatedCheckboxes[key] = false;
        });

        // Check the clicked checkbox
        updatedCheckboxes[name] = checked;

        setCheckboxes(updatedCheckboxes);
    };

    const { uploadImage } = useImageUpload();
    const navigate = useNavigate()
    // this section is used to hand form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const submitDate = date.getDate().toString() + date.getMonth().toString().padStart(2, "0") + date.getFullYear();
        const form = event.target;
        let gendar = '';
        if (checkboxes.checkbox1) {
            gendar = 'male'
        }
        else if (checkboxes.checkbox2) {
            gendar = 'female'
        }
        else if (checkboxes.checkbox3) {
            gendar = 'others'
        }

        const data = {
            email: user?.email,
            SN: SN,
            img: await uploadImage(image),
            englishName: form.englishName.value,
            banglaName: form.banglaName.value,
            fatherOrHusbandsEnglishName: form.fatherOrHusbandsEnglishName.value,
            fatherOrHusbandsBanglaName: form.fatherOrHusbandsBanglaName.value,
            motherEnglishName: form.motherEnglishName.value,
            motherBanglaName: form.motherBanglaName.value,
            address: form.address.value,
            birthDate: form.birthDate.value,
            nidOrPassportNumber: form.nidOrPassportNumber.value,
            nationality: form.nationality.value,
            projectName: form.projectName.value,
            projectAddress: form.projectAddress.value,
            totalSharePrice: form.totalSharePrice.value,
            totalSharePriceInWord: form.totalSharePriceInWord.value,
            bookingMoney: form.bookingMoney.value,
            bookingMoneyInWord: form.bookingMoneyInWord.value,
            dueAmount: form.dueAmount.value,
            dueAmountInWord: form.dueAmountInWord.value,
            authorizedSignature: form.authorizedSignature.value,
            sharersSignature: form.sharersSignature.value,
            gendar: gendar,
            submitData: submitDate,
            timestamp: new Date().getTime(),
        }

        console.log(data, '++++++++++++++++');
        fetch("https://backend.seapropertiesltd.com.bd/api/v1/admin/add-land-registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                Swal.fire("Your form has been submitted", "", "success");
                form.reset();
                navigate('/user/land-report');
                // navigate('/admin/project-management');
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div
                style={{
                    backgroundImage: `url(${bg})`,
                }}

                className="max-w-[1366px] w-[1366px] mx-auto bg-cover bg-center h-fit mt-[70px] relative">
                {/* social links */}
                <div className=" p-[60px]">
                    <div className="grid grid-cols-3">
                        <div className="">
                            <ul className="space-y-2 absolute">
                                <li className='flex gap-2 font-semibold'>
                                    <a href="" className="w-5 h-5 rounded-[50%] text-[white] bg-[#A20E27] flex justify-center items-center">
                                        <MdOutlineCall className='text-xs' />
                                    </a>
                                    <small>+88 01894440111</small>
                                </li>
                                <li className='flex gap-2 font-semibold'>
                                    <a href="" className="w-5 h-5 rounded-[50%] text-[white] bg-[#A20E27] flex justify-center items-center">
                                        <AiOutlineGlobal />
                                    </a>
                                    <small>https://seapropertiesltd.com.bd</small>
                                </li>
                                <li className='flex gap-2 font-semibold'>
                                    <a href="" className="w-5 h-5 rounded-[50%] text-[white] bg-[#A20E27] flex justify-center items-center">
                                        <HiOutlineMail />
                                    </a>
                                    <small>info.seapropertiesltd@gmail.com</small>
                                </li>
                                <li className='flex gap-2 font-semibold'>
                                    <a href="" className="w-5 h-5 rounded-[50%] text-[white] bg-[#A20E27] flex justify-center items-center">
                                        <FaFacebookF className='text-xs' />
                                    </a>
                                    <small>fb.com/seapropertiesltd.com.bd</small>
                                </li>
                                <li className='flex gap-2  font-semibold  '>
                                    <span className="bg-[#A20E27] text-[white]  w-5 h-5 rounded-full  flex items-center justify-center">
                                        <IoLocationOutline />
                                    </span>
                                    <small className='print-text-xs'>
                                        100 North Kalshi, Gate No - 01, <br /> Mirpur DOHS,
                                        Dhaka, Bangladesh
                                    </small>
                                </li>
                                <li>
                                    <div className="space-y-2">
                                        <div className='flex gap-2 items-end'>
                                            <p>Refarance :</p>
                                        </div>
                                        <div className='flex gap-2 items-end'>
                                            <p>Serial No</p>
                                            <input
                                                value={SN}
                                                type="text"
                                                name='serialNumber'
                                                className='focus:outline-none border-b-[1px] border-black'
                                            />
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                        <div className="flex justify-center">
                            <div className='flex  flex-col items-center '>
                                {/* <span className="ring-1 ring-[black] px-2 py-1 text-sm mb-3 rounded-full">CUSTOMER COPY</span> */}
                                <img className='w-[270px] mt-3 object-contain' src={logo} alt="" />
                                <h2 className='text-[40px] font-[900] text-center mt-4'>BOOKING FORM</h2>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <div className='flex flex-col items-end w-fit'>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    name='test'
                                    className='hidden'
                                />
                                <div className='w-[188px] h-[208px] border-[1px] border-[#A20E27]'>
                                    {!image &&
                                        <div onClick={handleButtonClick} className='w-full h-full text-gray-700 flex flex-col justify-center items-center  hover:cursor-pointer gap-0'>
                                            <h3 className='text-xl font-bold text-[#575656]'>UPLOAD</h3>
                                            <span className="text-xs font-bold text-[#595959]">PASSPORT SIZE PHOTO</span>
                                        </div>
                                    }
                                    {image &&
                                        <div className='relative w-full h-full mx-auto'>
                                            <img src={URL.createObjectURL(image)} alt="Uploaded" className='w-full h-full object-cover object-center' />
                                            <div onClick={handleDeleteImage} className='text-red-700 absolute left-full bottom-full hover:cursor-pointer'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    }
                                </div>

                                <div className=' whitespace-nowrap border border-[#A20E27] text-[#A20E27] px-1 py-1 mt-1 text-sm font-semibold'>
                                    Date:   {
                                        new Date().toLocaleString(new Date())
                                    }
                                </div>
                            </div>
                        </div>
                    </div>




                    {/* logo */}
                    <div className='flex justify-end items-center'>



                        {/* img upload and date */}

                    </div>

                    <div className='space-y-4'>
                        {/* Serial No */}


                        <div className='w-full h-[40px] bg-cover bg-[#A20E27] mt-10 flex items-center pl-4' >
                            <p className='text-[20px] text-white font-bold text-[white]'>Client Information</p>
                        </div>


                        {/* client information input field */}
                        <div className='w-full py-[10px] px-4 border border-black flex'>
                            <p>Applicant’s Name in English : </p>
                            <input
                                name='englishName'
                                type="text"
                                className='w-[800px] focus:outline-none pl-2 bg-transparent'
                            />
                        </div>
                        <div className='w-full py-[10px] px-4 border border-black flex'>
                            <p>Applicant’s Name in Bangla : </p>
                            <input
                                name='banglaName'
                                type="text"
                                className='w-[800px] focus:outline-none pl-2 bg-transparent'
                            />
                        </div>
                        <div className='w-full py-[10px] px-4 border border-black flex'>
                            <p>Father/Husband’s Name in English : </p>
                            <input
                                name='fatherOrHusbandsEnglishName'
                                type="text"
                                className='w-[800px] focus:outline-none pl-2 bg-transparent'
                            />
                        </div>
                        <div className='w-full py-[10px] px-4 border border-black flex'>
                            <p>Father/Husband’s Name in Bangla : </p>
                            <input
                                name='fatherOrHusbandsBanglaName'
                                type="text"
                                className='w-[800px] focus:outline-none pl-2 bg-transparent'
                            />
                        </div>
                        <div className='w-full py-[10px] px-4 border border-black flex'>
                            <p>Mother’s Name in English : </p>
                            <input
                                name='motherEnglishName'
                                type="text"
                                className='w-[800px] focus:outline-none pl-2 bg-transparent'
                            />
                        </div>
                        <div className='w-full py-[10px] px-4 border border-black flex'>
                            <p>Mother’s Name in Bangla : </p>
                            <input
                                name='motherBanglaName'
                                type="text"
                                className='w-[800px] focus:outline-none pl-2 bg-transparent'
                            />
                        </div>
                        <div className='w-full py-[10px] px-4 border border-black flex'>
                            <p>Permanent Address in Bangla : </p>
                            <input
                                name='address'
                                type="text"
                                className='w-[800px] focus:outline-none pl-2 bg-transparent'
                            />
                        </div>

                        <div className='flex justify-between'>
                            <div className='space-y-4'>
                                <div className='w-[400px] py-[10px] px-4 border border-black flex justify-between'>
                                    <p>Date of birth : </p>
                                    <input
                                        name='birthDate'
                                        type="date"
                                        className='w-[250px] focus:outline-none pl-2 bg-transparent'
                                    />
                                </div>
                                <div className='w-[400px] py-[10px] px-4 border border-black flex'>
                                    <p>NID/Passport : </p>
                                    <input
                                        name='nidOrPassportNumber'
                                        type="text"
                                        className=' focus:outline-none pl-2 bg-transparent'
                                    />
                                </div>
                            </div>

                            <div className='space-y-4'>
                                <div className='w-[400px] py-[10px] px-4 border border-black flex'>
                                    <p>Nationality : </p>
                                    <input
                                        name='nationality'
                                        type="text"
                                        className='focus:outline-none pl-2 bg-transparent'
                                    />
                                </div>

                                <div className='flex items-center gap-4'>
                                    <p>Gender: </p>
                                    <div className='flex justify-center items-center gap-2'>
                                        <p>Male</p>
                                        <input type="checkbox" checked={checkboxes.checkbox1} onChange={handleCheckboxChange} name='checkbox1' />
                                    </div>
                                    <div className='flex justify-center items-center gap-2'>
                                        <p>Female</p>
                                        <input type="checkbox" checked={checkboxes.checkbox2} onChange={handleCheckboxChange} name='checkbox2' />
                                    </div>
                                    <div className='flex justify-center items-center gap-2'>
                                        <p>Others</p>
                                        <input type="checkbox" checked={checkboxes.checkbox3} onChange={handleCheckboxChange} name='checkbox3' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* project details input fields*/}

                        <div className='w-full h-[40px] bg-cover bg-[#A20E27] mt-10 flex items-center pl-4' >
                            <p className='text-[20px] text-white font-bold text-[white]'>Project Details</p>
                        </div>

                        <div className='w-full py-[10px] px-4 border border-black flex'>
                            <p>Name of the project : </p>
                            <input
                                name='projectName'
                                type="text"
                                className='w-[800px] focus:outline-none pl-2 bg-transparent'
                            />
                        </div>

                        <div className='w-full py-[10px] px-4 border border-black flex'>
                            <p>Project Address : </p>
                            <input
                                name='projectAddress'
                                type="text"
                                className='w-[800px] focus:outline-none pl-2 bg-transparent'
                            />
                        </div>


                        {/* payment information input fields */}
                        <div className='w-full h-[40px] bg-cover bg-[#A20E27] mt-10 flex items-center pl-4' >
                            <p className='text-[20px] text-white font-bold text-[white]'>Payment Information</p>
                        </div>

                        <div className='flex justify-between'>
                            <div className='w-[400px] py-[10px] px-4 border border-black flex'>
                                <p>Total Share Price : </p>
                                <input
                                    name='totalSharePrice'
                                    type="text"
                                    className='focus:outline-none pl-2 bg-transparent'
                                />
                            </div>

                            <div className='w-[820px] py-[10px] px-4 border border-black flex'>
                                <p>In Word : </p>
                                <input
                                    name='totalSharePriceInWord'
                                    type="text"
                                    className='w-[500px] focus:outline-none pl-2 bg-transparent'
                                />
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <div className='w-[400px] py-[10px] px-4 border border-black flex'>
                                <p>Booking Money : </p>
                                <input
                                    name='bookingMoney'
                                    type="text"
                                    className='focus:outline-none pl-2 bg-transparent'
                                />
                            </div>

                            <div className='w-[820px] py-[10px] px-4 border border-black flex'>
                                <p>In Word : </p>
                                <input
                                    name='bookingMoneyInWord'
                                    type="text"
                                    className='w-[500px] focus:outline-none pl-2 bg-transparent'
                                />
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <div className='w-[400px] py-[10px] px-4 border border-black flex'>
                                <p>Due Amount : </p>
                                <input
                                    name='dueAmount'
                                    type="text"
                                    className='focus:outline-none pl-2 bg-transparent'
                                />
                            </div>

                            <div className='w-[820px] py-[10px] px-4 border border-black flex'>
                                <p>In Word : </p>
                                <input
                                    name='dueAmountInWord'
                                    type="text"
                                    className='w-[500px] focus:outline-none pl-2 bg-transparent'
                                />
                            </div>
                        </div>

                        {/* signature input fields */}
                        <div className='flex justify-center gap-[590px] mt-[110px!important]'>
                            < div className='flex flex-col items-center'>
                                <input name='authorizedSignature' type="text" readOnly className='border-b text-center focus:outline-none bg-transparent border-black px-2' />
                                <p>Authorized Signature</p>
                            </div>
                            < div className='flex flex-col items-center'>
                                <input name='sharersSignature' type="text" readOnly className='border-b text-center focus:outline-none bg-transparent border-black px-2' />
                                <p>Sharer’s Signature</p>
                            </div>
                        </div>
                        <div className='w-full h-[60px] bg-cover bg-center bg-no-repeat bg-[#A20E27] mt-[40px!important] flex items-center pl-4'>
                        </div>

                        <div className='text-center flex justify-center'>
                            {loading ? (
                                <button
                                    disabled
                                    type="submit"
                                    className="px-8 py-2 flex items-center gap-2 rounded bg-[#631f31] text-[white]"
                                >
                                    <div className="border-gray-300 h-[20px] w-[20px] animate-spin rounded-full border-[4px] border-t-[#c40424]" />
                                    Submitting...
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="px-8 py-2 rounded bg-[#b02449] text-[white]"
                                >
                                    Submit
                                </button>
                            )}
                        </div>


                    </div>


                </div>

            </div>
        </form>
    );
};

export default LandRegistrationForm;