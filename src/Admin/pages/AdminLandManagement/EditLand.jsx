import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import useImageUpload from '../../../hooks/useUploadImg';
import BrightAlert from 'bright-alert';

const EditLand = ({ landData }) => {
    const initialData = {
        _id: 0,
        features: [
            { "label": "fdegtr", "value": "fdegtr", "__isNew__": true },
            { "label": "dfs", "value": "dfs", "__isNew__": true },
        ],
        galleryImg: ["https://backend.seapropertiesltd.com.bd/api/v1/image/665c2fafa8c28ab3c744598d.jpg", "https://backend.seapropertiesltd.com.bd/api/v1/image/665c2fafa8c28ab3c744598d.jpg"]
    };

    const [loading, setLoading] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(landData?.features || initialData.features);
    const [galleryImages, setGalleryImages] = useState(landData?.galleryImg || initialData.galleryImg);
    const navigate = useNavigate();

    const handleChange = (newValue) => {
        setSelectedOptions(newValue);
    };

    const { uploadImage } = useImageUpload();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const gallery_img = e.target.gallery_img.files;
        const galleryImageUrls = [];

        for (let i = 0; i < gallery_img.length; i++) {
            const imageUrl = await uploadImage(gallery_img[i]);
            galleryImageUrls.push(imageUrl);
        }

        const updatedData = {
            ...landData,
            features: selectedOptions,
            galleryImg: galleryImageUrls.length > 0 ? galleryImageUrls : galleryImages,
            date: new Date()
        };


        console.log("update++++++++", updatedData);
        // fetch(`your-api-endpoint/${landData._id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(updatedData),
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         setLoading(false);
        //         BrightAlert('Land Successfully Updated', '', 'success');
        //         navigate('/admin/lands');
        //     });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="border border-[#dbdbdb] mt-6 p-6 space-y-3">
                <h2 className="font-bold border-b  border-[gray] pb-3">Features</h2>
                <div className="container">
                    <label>Features Info</label><br />
                    <CreatableSelect
                        isMulti
                        isClearable
                        value={selectedOptions}
                        onChange={handleChange}
                    />
                </div>
                <div className="">
                    <label>Features Img</label><br />
                    <input
                        type="file"
                        name="features_img"
                        className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                        placeholder="Enter feature img url" />
                </div>
            </div>

            <div className="border border-[#dbdbdb] mt-6 p-6">
                <h2 className="font-bold border-b  border-[gray] pb-3">Project Gallery</h2>
                <div className="">
                    <label>Gallery Image</label><br />
                    <input
                        type="file"
                        multiple
                        name="gallery_img"
                        className="border mt-2 w-full p-2 rounded bg-[#f4f3f3]"
                        placeholder="Enter Project name" />
                </div>
            </div>
            <button
                type="submit"
                className="px-8 py-2 rounded bg-[#b02449] text-[white]"
                disabled={loading}
            >
                {loading ? 'Updating...' : '+Update'}
            </button>
        </form>
    );
};

export default EditLand;
