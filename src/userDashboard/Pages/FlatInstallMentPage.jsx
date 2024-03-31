import React from 'react';

const FlatInstallMentPage = () => {
    const tableItems = [
        {
            username: "Liam James",
            totalAmount: 450000,
            date: new Date().getTime(),
            due: 50000,
            remainingBalance: 400000
        },
        {
            username: "Liam James2",
            totalAmount: 450000,
            date: new Date().getTime(),
            due: 50000,
            remainingBalance: 400000
        },
        {
            username: "Liam James3",
            totalAmount: 450000,
            date: new Date().getTime(),
            due: 50000,
            remainingBalance: 400000
        },
    ]
    return (
        <div>
            <div className=" mx-auto px-4 md:px-4">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Flat Installment
                    </h3>

                </div>
                <div className="mt-6 shadow-sm border rounded overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-[#e4e4e4] text-[#0d1113] font-medium border-[#bab9b9] border-b">
                            <tr>
                                <th className="py-3 px-6">Username</th>
                                <th className="py-3 px-6">Total Amount</th>
                                <th className="py-3 px-6">Date</th>
                                <th className="py-3 px-6">Due</th>
                                <th className="py-3 px-6">Remaining balance</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {
                                tableItems.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.totalAmount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date().toLocaleString(item?.date)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.due}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.remainingBalance}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FlatInstallMentPage;