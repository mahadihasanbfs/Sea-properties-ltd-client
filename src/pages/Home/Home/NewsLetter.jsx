import Title from "../../../components/sharedComponent/Title";

const NewsLetter = () => {
    return (
        <div>
            <div className="container mt-12 mb-16">
                <Title text="News Letter" position="center" />
                <p className=" text-center md:w-[500px] mx-auto">
                    Get all the latest updates easily.
                </p> <br />
                <form action="" className="flex  items-center gap-4 justify-center">
                    <input type="email" className="border-2 border-gray-400 rounded-xl  py-2 md:w-[500px] w-full px-2" placeholder="Email" /> <button className="px-10 rounded-lg py-2 bg-[#A20E27] text-light">Subscribe </button>
                </form> <br />

            </div>
        </div>
    );
};

export default NewsLetter;