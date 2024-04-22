import { Link } from "react-router-dom";

const CircleBox = () => {
    return (
        <div className="main-box duration-150  overflow-hidden">
            <div className="ring-1 relative  content-box ring-white w-[230px] md:w-[300px] h-[230px] md:h-[300px] rounded-full flex items-center justify-center z-[100]">
                <div className="bg-[#0000009c] text-[white] absolute top-0 left-0 right-0 m-auto bottom-0 content-box w-[150px] h-[150px] flex items-center justify-center rounded-full text-white z-[100] text-sm">setting standards</div>
            </div>
            {/* overlay  */}
            <div className="box-1  absolute md:top-[0px] top-[0px] left-0 right-0 bottom-0 m-auto md:w-[340px] w-[220px] h-[220px] md:h-[340px]  bg-[#a5a5a584] rounded-lg">
            </div>
            {/* link box */}
            {/* 
            




            */}
            <div className="box-2 absolute top-[0px] md:top-[-0px] left-0 right-0 bottom-0 m-auto w-0 h-0 overflow-hidden duration-150 text-[white] bg-[#a5a5a584] rounded-lg">
                <div className="relative w-full h-full">
                    <Link to="/project#onGoing" className="text-gray-900 font-bold text-xs md:tex-xl absolute right-[5px] rotate-[40deg] top-6">On going</Link>

                    <Link to="/project#upComing" className="text-gray-900 font-bold text-xs md:tex-xl absolute right-[4px] rotate-[135deg] bottom-[24px]">up comming
                    </Link>

                    <Link to="/project#completed" className="text-gray-900 font-bold text-xs md:tex-xl absolute left-2 rotate-[225deg] bottom-10">Completed</Link>

                    <Link to="/contact" className="text-gray-900 font-bold text-xs md:tex-xl absolute left-2 rotate-[-40deg] top-10">Contact us</Link>
                </div>
            </div>
        </div>
    );
};

export default CircleBox;