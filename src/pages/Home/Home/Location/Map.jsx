
const Map = () => {
    return (
        <>
            {/* component */}
            <section className="text-gray-600 body-font relative mt-14 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gray-300">
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder={0}
                        marginHeight={0}
                        marginWidth={0}
                        title="map"
                        scrolling="no"
                        src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                        style={{}}
                    />
                </div>
                <div className="container px-5 py-24 mx-auto h-[200px] md:h-[500px] flex">

                </div>
            </section>
        </>

    );
};

export default Map;