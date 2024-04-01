
const DetailShet = () => {
    return (
        <div>
            {/* <div className="bg-[#bbbabd2e]">
                <div className="max-w-[1366px] mx-auto px-6 lg:px-10 xl:px-20 py-6 md:py-[55px]">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <h1 className="font-bold text-xl">Project Name</h1>
                            <p className="">Dhaka,Mirpur</p>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="space-y-2">
                                <p className="font-[300]">Completion Date</p>
                                <h4 className="font-semibold">April 2026</h4>
                            </div>
                            <div className="space-y-2">
                                <p className="font-[300]">Status Updated</p>
                                <h4 className="font-semibold">March 2024</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="max-w-[1366px] mx-auto px-6 lg:px-10 xl:px-20 py-2">
                <div className="w-full mb-8 border border-[#c9c9c9] overflow-hidden  ">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full   ">
                            <thead>
                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100  uppercase  border-gray-600">
                                    <th className="px-4 border-r border-[#c9c9c9] py-3">SL. No</th>
                                    <th className="px-4 border-r border-[#c9c9c9] py-3 w-[500px]">Name of the work</th>
                                    <th className="px-4 py-3 w-[300px]">Progress details</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                    <td className="px-4 border-r border-[#c9c9c9] py-3 text-ms font-[400]">0</td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        Shore pile
                                    </td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        100% completed
                                    </td>
                                </tr>
                                <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                    <td className="px-4 border-r border-[#c9c9c9] py-3 text-ms font-[400]">1</td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        name
                                    </td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        30% Completed
                                    </td>
                                </tr> <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                    <td className="px-4 border-r border-[#c9c9c9] py-3 text-ms font-[400]">1</td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        name
                                    </td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        30% Completed
                                    </td>
                                </tr> <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                    <td className="px-4 border-r border-[#c9c9c9] py-3 text-ms font-[400]">1</td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        name
                                    </td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        30% Completed
                                    </td>
                                </tr> <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                    <td className="px-4 border-r border-[#c9c9c9] py-3 text-ms font-[400]">1</td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        name
                                    </td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        30% Completed
                                    </td>
                                </tr> <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                    <td className="px-4 border-r border-[#c9c9c9] py-3 text-ms font-[400]">1</td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        name
                                    </td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        30% Completed
                                    </td>
                                </tr> <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                    <td className="px-4 border-r border-[#c9c9c9] py-3 text-ms font-[400]">1</td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        name
                                    </td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        30% Completed
                                    </td>
                                </tr> <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                    <td className="px-4 border-r border-[#c9c9c9] py-3 text-ms font-[400]">1</td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        name
                                    </td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        30% Completed
                                    </td>
                                </tr> <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                    <td className="px-4 border-r border-[#c9c9c9] py-3 text-ms font-[400]">1</td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        name
                                    </td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        30% Completed
                                    </td>
                                </tr> <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                    <td className="px-4 border-r border-[#c9c9c9] py-3 text-ms font-[400]">1</td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        name
                                    </td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        30% Completed
                                    </td>
                                </tr> <tr className="text-gray-700 border-t border-[#c9c9c9]">
                                    <td className="px-4 border-r border-[#c9c9c9] py-3 text-ms font-[400]">1</td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        name
                                    </td>
                                    <td className="px-4 py-3 text-ms border-r border-[#c9c9c9] font-[400]">
                                        30% Completed
                                    </td>
                                </tr>
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailShet;