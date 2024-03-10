import Title from "../../../components/sharedComponent/Title";

const NewsLetter = () => {
    return (
        <div>
            <div className="container mt-12 mb-16">
                <Title text="News Letter" position="center" />
                <p className="mt-3 text-center md:w-[500px] mx-auto">
                    Sed ut perspiciatis undmnis is iste natus error sit amet voluptatem totam rem aperiam.
                    Sed ut perspiciatis undmnis is iste natus error sit amet voluptatem totam rem aperiam.
                </p> <br />
                <form action="" className="flex  items-center gap-4 justify-center">
                    <input type="email" className="border-2 border-gray-400 rounded-xl  py-2 md:w-[500px] w-full px-2" placeholder="Email" /> <button className="px-10 rounded-lg py-2 bg-[#A20E27] text-white">Submit</button>
                </form> <br />
                <p className="mt-3 text-center md:w-[460px] mx-auto">
                    Sed ut perspiciatis undmnis is iste natus error sit amet voluptatem totam rem aperiam.
                </p>
            </div>
        </div>
    );
};

export default NewsLetter;