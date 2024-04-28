import { useRef, useState } from 'react';
import logo from '../../../assets/logo.png';
import useImageUpload from '../../../hooks/useUploadImg';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const LandRegistrationForm = () => {
    // this section is used to handle banner img
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
    // this section is used to hand form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        // setLoading(true);
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
            submitData: submitDate
        }


        console.log(data, '<<<<<<<<<<++++>>>>>>>>>>')
        // console.log(data, '++++++++++++++++');

        // fetch("https://sea-properties-server.vercel.app/api/v1/admin/add-land-registration", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(data),
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setLoading(false);
        //         Swal.fire("Your form has been submitted", "", "");
        //         // navigate('/admin/project-management');
        //     });
    }


    // Fetch data using custom hook
    const { data: serialNumber = [], refetch } = useQuery({
        queryKey: ["serialNumber"],
        queryFn: async () => {
            const res = await fetch(`https://sea-properties-server.vercel.app/api/v1/admin/serial-number`);
            const data = await res.json();
            return data;
        },
    });

    console.log(serialNumber, '--NO--');
    return (
        <div>
            <div
                style={{
                    backgroundImage: 'url(https://i.ibb.co/D4z4S2h/Rectangle-55.png)'
                }}
                className="max-w-[1366px] mx-auto bg-cover bg-center h-fit p-[60px] mt-[70px] relative">
                {/* social links */}
                <ul className="space-y-2 absolute">
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

                {/* logo */}
                <div className='flex justify-end items-center'>

                    <div className='flex flex-col items-center mr-[170px]'>
                        <img className='w-[180px] h-[90px] object-contain' src={logo} alt="" />
                        <h2 className='text-[40px] font-medium text-center'>Land <br /> Registration Form</h2>
                    </div>

                    {/* img upload and date */}
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
                                <div onClick={handleButtonClick} className='w-full h-full text-gray-700 flex flex-col justify-center items-center gap-2 hover:cursor-pointer'>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                        </svg>
                                    </div>
                                    <h3 className='text-xl font-medium'>Upload Your Image</h3>
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

                        <div className='w-[294px] h-[40px] border border-[#A20E27] mt-4 relative flex items-center'>
                            <img className='absolute top-0 left-1/2 -translate-x-1/2' src="https://i.ibb.co/bWL9pwN/Group-384.png" alt="" />
                            <p className='absolute left-[28px] text-xl tracking-[10px]'>{date.getDate().toString()}</p>
                            <p className='absolute  left-[97px] tracking-[10px] text-xl'>{date.getMonth().toString().padStart(2, "0")}</p>
                            <p className='absolute  left-[165px] tracking-[18px] text-xl'>{date.getFullYear()}</p>
                        </div>
                        <p className='text-[14px] tracking-[10px] mr-[20px] mt-2'>D D M M Y Y Y Y</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    {/* serial no */}
                    <div className='flex gap-2 items-end'>
                        <p>Serial no</p>
                        <input
                            type="text"
                            name='serialNumber'
                            className='focus:outline-none border-b-[1px] border-black'
                        />
                    </div>

                    <div className='w-full h-[55px] bg-cover bg-[#A20E27] mt-10 flex items-center pl-4' style={{ backgroundImage: "url(https://i.ibb.co/1LdyZhT/Rectangle-58.png)" }}>
                        <p className='text-[20px] text-white'>Client Information</p>
                    </div>

                    {/* client information input field */}
                    <div className='w-full py-[14px] px-4 border border-black flex'>
                        <p>Applicant’s Name in English : </p>
                        <input
                            name='englishName'
                            type="text"
                            className='w-[800px] focus:outline-none pl-2 bg-transparent'
                        />
                    </div>
                    <div className='w-full py-[14px] px-4 border border-black flex'>
                        <p>Applicant’s Name in Bangla : </p>
                        <input
                            name='banglaName'
                            type="text"
                            className='w-[800px] focus:outline-none pl-2 bg-transparent'
                        />
                    </div>
                    <div className='w-full py-[14px] px-4 border border-black flex'>
                        <p>Father/Husband’s Name in English : </p>
                        <input
                            name='fatherOrHusbandsEnglishName'
                            type="text"
                            className='w-[800px] focus:outline-none pl-2 bg-transparent'
                        />
                    </div>
                    <div className='w-full py-[14px] px-4 border border-black flex'>
                        <p>Father/Husband’s Name in Bangla : </p>
                        <input
                            name='fatherOrHusbandsBanglaName'
                            type="text"
                            className='w-[800px] focus:outline-none pl-2 bg-transparent'
                        />
                    </div>
                    <div className='w-full py-[14px] px-4 border border-black flex'>
                        <p>Mother’s Name in English : </p>
                        <input
                            name='motherEnglishName'
                            type="text"
                            className='w-[800px] focus:outline-none pl-2 bg-transparent'
                        />
                    </div>
                    <div className='w-full py-[14px] px-4 border border-black flex'>
                        <p>Mother’s Name in Bangla : </p>
                        <input
                            name='motherBanglaName'
                            type="text"
                            className='w-[800px] focus:outline-none pl-2 bg-transparent'
                        />
                    </div>
                    <div className='w-full py-[14px] px-4 border border-black flex'>
                        <p>Permanent Address in Bangla : </p>
                        <input
                            name='address'
                            type="text"
                            className='w-[800px] focus:outline-none pl-2 bg-transparent'
                        />
                    </div>

                    <div className='flex justify-between'>
                        <div className='space-y-4'>
                            <div className='w-[400px] py-[14px] px-4 border border-black flex justify-between'>
                                <p>Date of birth : </p>
                                <input
                                    name='birthDate'
                                    type="date"
                                    className='w-[250px] focus:outline-none pl-2 bg-transparent'
                                />
                            </div>
                            <div className='w-[400px] py-[14px] px-4 border border-black flex'>
                                <p>NID/Passport : </p>
                                <input
                                    name='nidOrPassportNumber'
                                    type="text"
                                    className=' focus:outline-none pl-2 bg-transparent'
                                />
                            </div>
                        </div>

                        <div className='space-y-4'>
                            <div className='w-[400px] py-[14px] px-4 border border-black flex'>
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
                    <div className='w-full h-[55px] bg-cover bg-[#A20E27] mt-[40px!important] flex items-center pl-4' style={{ backgroundImage: "url(https://i.ibb.co/1LdyZhT/Rectangle-58.png)" }}>
                        <p className='text-[20px] text-white'>Project Details</p>
                    </div>

                    <div className='w-full py-[14px] px-4 border border-black flex'>
                        <p>Name of the project : </p>
                        <input
                            name='projectName'
                            type="text"
                            className='w-[800px] focus:outline-none pl-2 bg-transparent'
                        />
                    </div>

                    <div className='w-full py-[14px] px-4 border border-black flex'>
                        <p>Project Address : </p>
                        <input
                            name='projectAddress'
                            type="text"
                            className='w-[800px] focus:outline-none pl-2 bg-transparent'
                        />
                    </div>


                    {/* payment information input fields */}
                    <div className='w-full h-[55px] bg-cover bg-[#A20E27] mt-[40px!important] flex items-center pl-4' style={{ backgroundImage: "url(https://i.ibb.co/1LdyZhT/Rectangle-58.png)" }}>
                        <p className='text-[20px] text-white'>Payment Information</p>
                    </div>

                    <div className='flex justify-between'>
                        <div className='w-[400px] py-[14px] px-4 border border-black flex'>
                            <p>Total Share Price : </p>
                            <input
                                name='totalSharePrice'
                                type="text"
                                className='focus:outline-none pl-2 bg-transparent'
                            />
                        </div>

                        <div className='w-[820px] py-[14px] px-4 border border-black flex'>
                            <p>In Word : </p>
                            <input
                                name='totalSharePriceInWord'
                                type="text"
                                className='w-[500px] focus:outline-none pl-2 bg-transparent'
                            />
                        </div>
                    </div>

                    <div className='flex justify-between'>
                        <div className='w-[400px] py-[14px] px-4 border border-black flex'>
                            <p>Booking Money : </p>
                            <input
                                name='bookingMoney'
                                type="text"
                                className='focus:outline-none pl-2 bg-transparent'
                            />
                        </div>

                        <div className='w-[820px] py-[14px] px-4 border border-black flex'>
                            <p>In Word : </p>
                            <input
                                name='bookingMoneyInWord'
                                type="text"
                                className='w-[500px] focus:outline-none pl-2 bg-transparent'
                            />
                        </div>
                    </div>

                    <div className='flex justify-between'>
                        <div className='w-[400px] py-[14px] px-4 border border-black flex'>
                            <p>Due Amount : </p>
                            <input
                                name='dueAmount'
                                type="text"
                                className='focus:outline-none pl-2 bg-transparent'
                            />
                        </div>

                        <div className='w-[820px] py-[14px] px-4 border border-black flex'>
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
                            <input name='authorizedSignature' type="text" className='border-b text-center focus:outline-none bg-transparent border-black px-2' />
                            <p>Authorized Signature</p>
                        </div>
                        < div className='flex flex-col items-center'>
                            <input name='sharersSignature' type="text" className='border-b text-center focus:outline-none bg-transparent border-black px-2' />
                            <p>Sharer’s Signature</p>
                        </div>
                    </div>

                    <div className='text-center'>
                        {!loading ?
                            <button type='submit' className='border-2 border-[#A20E27] px-4 py-2 font-medium uppercase rounded'>
                                Submit
                            </button>
                            :
                            <button type='button' disabled className='border-2 border-[#A20E27] px-4 py-2 font-medium uppercase rounded'>
                                Submit...
                            </button>}
                    </div>
                    <div className='w-full h-[118px] bg-cover bg-center bg-no-repeat bg-[#A20E27] mt-[40px!important] flex items-center pl-4' style={{ backgroundImage: "url(https://i.ibb.co/hsytgwT/Rectangle-58-1.png)" }}>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LandRegistrationForm;