/* eslint-disable react/prop-types */
const ShowContent = ({ setOpen, data }) => {
    console.log(data);
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#000000ee] flex items-center justify-center z-[2000] opacity-100">
            <button onClick={() => setOpen(false)} className="text-4xl text-gray-600 fixed right-6 top-4 float-right">
                x
            </button>
            <div className="">
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/7e90gBu4pas"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};


export default ShowContent