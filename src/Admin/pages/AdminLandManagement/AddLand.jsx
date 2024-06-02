import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import useImageUpload from '../../../hooks/useUploadImg';
import BrightAlert from 'bright-alert';

const AddLand = () => {
    const [loading, setLoading] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const navigate = useNavigate();

    const handleChange = (newValue, actionMeta) => {
        console.log('Selected Options:', newValue);
        console.log('Action Meta:', actionMeta);
        setSelectedOptions(newValue); // Optionally, you can set the selected options to state
    };

    const { uploadImage } = useImageUpload();


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedOptions);
        const gallery_img = e.target.gallery_img.files;

        const galleryImageUrls = [];
        for (let i = 0; i < gallery_img.length; i++) {
            const imageUrl = await uploadImage(gallery_img[i]);

            galleryImageUrls.push(imageUrl);
        }

        const data = {
            date: new Date(),
            features: selectedOptions,
            galleryImg: galleryImageUrls
        };
        console.log('+++++++++++++++', data);
        fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => res.json()).then((data) => {
            setLoading(false)
            BrightAlert('Land Successfully Added', '', 'success');
            navigate('/admin/lands');
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="border border-[#dbdbdb] mt-6 p-6 space-y-3">
                <h2 className="font-bold border-b  border-[gray] pb-3">Features</h2>
                <br />

                <div className="container">
                    <label>Features Info</label><br />
                    <CreatableSelect
                        isMulti
                        isClearable
                        onChange={handleChange}
                    // Replace 'options' with your actual options array
                    />
                </div>

                <div className="">
                    <label   >Features Img</label><br />
                    <input
                        type="file"
                        name="features_img"
                        className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                        placeholder="Enter feature img url" />
                </div>
            </div>


            {/*gallery  */}
            <div className="border border-[#dbdbdb] mt-6 p-6">
                <h2 className="font-bold border-b  border-[gray] pb-3">Project Gallery</h2>
                <br />
                <div className="">
                    <label   >Gallery Image</label><br />
                    <input
                        type="file"
                        multiple
                        name="gallery_img"
                        className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                        placeholder="Enter Project name" />
                </div>
            </div>
            <br /><br />
            <button
                type="submit"
                className="px-8 py-2 rounded bg-[#b02449] text-[white]"
            >
                +Add
            </button>
        </form>
    );
};

export default AddLand;