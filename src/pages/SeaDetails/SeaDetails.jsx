const SeaDetails = () => {
    return (
        <div>
            <img className={`md:h-[90vh] h-[500px] object-cover w-full`} src="https://hikmah-holdings-backend.vercel.app/api/v1/image/660cd9ce8ddf1450a6942c94.jpg" alt="" />
            <div className="max-w-[1366px] mx-auto  pt-[30px] grid-cols-1 text-white gap-12">
                <h1 className="md:text-4xl text-2xl font-semibold">WHY SEA Properties</h1> <br />
                <p className="text-gray-400">
                    SEA aims to provide a unique and luxurious living experience for its customers. Our focus is on prestige and elegant architecture that distinguishes us from others. We pay close attention to your housing needs and ensure they are met with precision. Each day we strive to perfect the art of luxury living and enhance our craftsmanship to suit your lifestyle. SEA continues to set high standards of excellence with every project, creating a lavish and comfortable living space for our clients.
                </p>
                <br />
                <p className="text-gray-400">
                    40% Less Cost
                </p>
                <p className="text-gray-400">
                    Through purchasing land shares at 40% lower cost,build your own flat.
                </p>

                <br />
                {/*-------------------*/}
                {/*        point 1    */}
                {/*-------------------*/}
                <div>
                    <h3 className="font-semibold text-xl text-black">
                        Prime Location
                    </h3>
                    <p className="text-gray-400">
                        We provide a range of prime locations throughout the city, carefully chosen with your needs in mind.
                    </p>
                </div>
                <br />
                {/*-------------------*/}
                {/*        point 2    */}
                {/*-------------------*/}
                <div>
                    <h3 className="font-semibold text-xl text-black">
                        Top Consultants
                    </h3>
                    <p className="text-gray-400">
                        We work with top consultants from various fields, both domestically and internationally, to ensure every aspect of a project is meticulously designed. Quality designs require expertise from the best professionals.
                    </p>
                </div>
                <br />
                {/*-------------------*/}
                {/*        point 3    */}
                {/*-------------------*/}
                <div>
                    <h3 className="font-semibold text-xl text-black">
                        Professional Management
                    </h3>
                    <p className="text-gray-400">
                        Our Facility Management team is dedicated to maintaining a safe, clean, and comfortable living environment for our community.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default SeaDetails;