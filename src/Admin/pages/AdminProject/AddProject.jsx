import { useRef, useState } from "react";
import AdminTitle from "../../Component/AdminTitle";
import useImageUpload from "../../../hooks/useUploadImg";

const AddProject = () => {
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

    // banner img show and upload
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleDeleteImage = () => {
        setImage(null);
        fileInputRef.current.value = '';
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file)
        if (file && file.type.startsWith('image/')) {
            setImage(URL.createObjectURL(file));
        } else {
            alert('Please select a valid image file.');
        }
    };
    // end banner img 



    // upload image 
    const { uploadImage } = useImageUpload();

    // form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            bannerImg : imageFile
        }
        console.log(data, 'image....')
    }
    return (
        <form
            className="bg-[white] p-6"
            onSubmit={handleSubmit}>
            <AdminTitle title='Add project' />
            <br />
            <div className='border border-gray-500 p-4 rounded flex flex-col gap-2'>
                <div>
                    <input
                        required

                        type="file"
                        accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/heic"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        name='bannerimg'
                        className='hidden'
                    />
                    <div className='w-full h-[250px] border-[1px] border-dashed border-gray-400 rounded-xl'>
                        {!image &&
                            <div onClick={handleButtonClick} className='w-full h-full text-gray-700   flex flex-col justify-center items-center gap-2 hover:cursor-pointer'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                    </svg>
                                </div>
                                <h3 className='text-xl font-medium'>Upload Banner Picture</h3>
                                <p>Upload only image type file</p>
                            </div>
                        }
                        {image &&
                            <div className='relative w-full px-10 py-5 h-[250px] mx-auto'>
                                <img src={image} alt="Uploaded" className=' w-full h-full object-cover  rounded-xl' />
                                <div onClick={handleDeleteImage} className='absolute top-2  text-gray-100 right-2   -translate-x-1/2 z-50 bg-gray-900 hover:bg-gray-500  h-10 w-10 flex items-center justify-center rounded-full hover:cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <button className="dashboard_form_btn">Submit</button>
        </form>
    );
};

export default AddProject;