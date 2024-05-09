import Title from "../../../../components/sharedComponent/Title";
import { IoSearchOutline } from "react-icons/io5";

const Actions = ({ onSearch, onStatus, onType }) => {
    return (
        <div className="flex md:flex-row flex-col md:justify-between justify-center items-center lg:px-6">
            <Title text="OUR PROJECTS " />

            <div className="flex md:flex-row flex-col md:justify-between justify-center items-center gap-3">
                <div className="flex md:w-auto w-full items-center gap-2 border px-3 py-2 rounded-full border-gray-500">
                    <input onChange={(e) => onSearch(e.target.value)} className="outline-none" placeholder="Type the project name or location " />
                    <IoSearchOutline />
                </div>

                <div className="px-3 py-2 rounded-full border-gray-500 outline-none  pb-2 flex items-center gap-2 border  md:w-auto w-full">
                    <select
                        onChange={(e) => onStatus(e.target.value)}
                        className="outline-none w-full bg-[transparent]" name="projectStatus">
                        <option value=''>Project Status</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="outline-none  pb-2 flex items-center gap-2 border px-3 py-2 rounded-full border-gray-500 md:w-auto w-full">
                    <select
                        onChange={(e) => onType(e.target.value)}
                        className="outline-none w-full bg-[transparent]" name="projectStatus">
                        <option value=''>Project Type</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                    </select>
                </div>

            </div>
        </div>
    );
};

export default Actions;