import Title from "../../../../components/sharedComponent/Title";
import { IoSearchOutline } from "react-icons/io5";

const Actions = () => {
    return (
        <div className="flex md:flex-row flex-col md:justify-between justify-center items-center lg:px-6">
            <Title text="OUR PROJECTS " />

            <div className="flex md:flex-row flex-col md:justify-between justify-center items-center gap-3">
                <div className="flex md:w-auto w-full items-center gap-2 border px-3 py-2 rounded-full border-gray-500">
                    <input className="outline-none" placeholder="Type the project name or location " />
                    <IoSearchOutline />
                </div>

                <div className="flex items-center gap-2 border px-3 py-1 rounded-full border-gray-500 md:w-auto w-full ">
                    <select className="outline-none w-full pb-2" name="projectStatus">
                        <option selected>Project Status</option>
                        <option value="project 1">Ongoing</option>
                        <option value="project 2">Upcoming</option>
                        <option value="project 2">Completed</option>
                    </select>
                </div>

                <div className="flex items-center gap-2 border px-3 py-1 rounded-full border-gray-500 md:w-auto w-full ">
                    <select className="outline-none w-full pb-2" name="projectStatus">
                        <option selected>Project Type</option>
                        <option value="project 1">Residential</option>
                        <option value="project 2">Commercial</option>
                    </select>
                </div>

            </div>
        </div>
    );
};

export default Actions;