import React from 'react';
import image from '../../../../assets/explore.jpg';

const Explore = () => {
    return (
        <div>
            <div className="bg-gray-100 h-auto min-h-screen mt-20  flex lg:flex-row flex-col  justify-center py-10 px-10">
                <img className='lg:w-[50%] w-full  rounded object-cover' src={image} />
                <div className="lg:w-[50%] md:w-full mt-4 mx-auto lg:px-4">
                    {/* <img src={SEAImage} alt="SEA Logo" className="w-32 h-32 mx-auto mb-8" /> */}
                    <h1 className="text-3xl p-6 font-bold text-start">Why Choose SEA Properties?</h1>
                    <p className="text-gray-700 mb-4 p-6 pt-0 text-start">At SEA, we provide a unique and luxurious living experience for our customers. Our focus on prestige and elegant architecture sets us apart, ensuring a lavish and comfortable lifestyle for our clients.</p>
                    <div className=" flex flex-col ">
                        {/* Unique Living Experience */}
                        {/* <div className="bg-white p-6 ">
                        <h2 className="text-xl font-semibold mb-4">Unique Living Experience</h2>
                       
                    </div> */}
                        {/* 40% Less Cost */}
                        <div className="bg-white p-6 ">
                            <h2 className="text-xl font-semibold mb-4">40% Less Cost</h2>
                            <p className="text-gray-700 mb-4 basis-[60%] ">Through purchasing land shares at a 40% lower cost, you can build your own flat with SEA, making luxury living more affordable and accessible.</p>
                        </div>
                        {/* Prime Location */}
                        <div className="bg-white p-6 ">
                            <h2 className="text-xl font-semibold mb-4">Prime Location</h2>
                            <p className="text-gray-700 mb-4 basis-[60%] ">We provide a range of prime locations throughout the city, carefully chosen with your needs in mind to enhance your living experience.</p>
                        </div>
                        {/* Top Consultants */}
                        <div className="bg-white p-6 ">
                            <h2 className="text-xl font-semibold mb-4">Top Consultants</h2>
                            <p className="text-gray-700 mb-4 basis-[60%] ">We work with top consultants from various fields, both domestically and internationally, to ensure every aspect of our projects is meticulously designed and executed.</p>
                        </div>
                        {/* Top-tier Materials */}
                        <div className="bg-white p-6 ">
                            <h2 className="text-xl font-semibold mb-4">Highest Quality Materials</h2>
                            <p className="text-gray-700 mb-4 basis-[40%] ">We carefully select materials from around the world to improve the comfort and lifestyle of our clients. Quality, suitability, and durability are key factors in our material choices.</p>
                        </div>
                        {/* On-time Delivery */}
                        <div className="bg-white p-6 ">
                            <h2 className="text-xl font-semibold mb-4">On-time Delivery</h2>
                            <p className="text-gray-700 mb-4 basis-[60%] ">At SEA, our team of engineers and management professionals work together to deliver quality products on time, ensuring your satisfaction and peace of mind.</p>
                        </div>
                        {/* Professional Management */}
                        <div className="bg-white p-6 ">
                            <h2 className="text-xl font-semibold mb-4">Professional Management</h2>
                            <p className="text-gray-700 mb-4 basis-[30%] ">Our Facility Management team is dedicated to maintaining a safe, clean, and comfortable living environment for our community, ensuring your happiness and well-being.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Explore;