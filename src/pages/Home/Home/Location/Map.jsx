
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
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7688.411418598435!2d90.37320637217408!3d23.837568124644218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70003cb6d75%3A0x8cc76155358e2b2a!2sSEA%20Properties%20Ltd!5e0!3m2!1sen!2sbd!4v1713820075424!5m2!1sen!2sbd"
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