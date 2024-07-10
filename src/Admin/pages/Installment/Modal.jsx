import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';

const Modal = ({ all_data, item, setItem, deleteInstallment, setOpenModal }) => {
    console.log(all_data, item);
    const filteredItems = all_data.filter((data) => data.email === item.email && data.project === item.project);
    console.log(filteredItems);
    const total_payment = filteredItems.reduce((acc, item) => acc + parseInt(item?.receiveAmount), 0);
    const total_share = filteredItems.filter((item) => item.isFirstPayment)[0].total
    return (<>
        {item && (
            <div className="fixed inset-0 overflow-y-auto z-[400]">
                <div className="flex bg-[#000000e6] items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div className="inline-block bg-[white] align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[90%] sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Installment Details</h3>
                                    <div className="overflow-x-auto border">
                                        <table className="w-full table-auto text-sm text-left">
                                            <thead className="bg-gray-200 text-gray-600 border-b">
                                                <tr>
                                                    <th className="py-2 px-4">Email</th>
                                                    <th className="py-2 px-4">Particular</th>
                                                    <th className="py-2 px-4">Check Number</th>
                                                    <th className="py-2 px-4">MR No</th>
                                                    <th className="py-2 px-4">Receive Amount</th>
                                                    <th className="py-2 px-4">Project Name</th>
                                                    <th className="py-2 px-4">Receive Date</th>
                                                    <th className="py-2 px-4">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-600 divide-y">
                                                {filteredItems.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td className="py-2 px-4">{item.email}</td>
                                                        <td className="py-2 px-4">{item.particular}</td>
                                                        <td className="py-2 px-4">{item.checkNumber ?? 'N/A'}</td>
                                                        <td className="py-2 px-4">{item.mrNo ?? 'N/A'}</td>
                                                        <td className="py-2 px-4">{item.receiveAmount ?? 'N/A'}</td>
                                                        <td className="py-2 px-4">{item.project ?? 'N/A'}</td>
                                                        <td className="py-2 px-4">{item.receiveDate ? new Date(item.receiveDate).toLocaleString() : 'N/A'}</td>
                                                        <td className="py-2 px-4">
                                                            <button onClick={() => deleteInstallment(item?._id)}>
                                                                <MdDeleteOutline className="text-2xl text-[red]" />
                                                            </button>
                                                            <button onClick={() => { setItem(item), setOpenModal(item) }}>
                                                                <TbEdit className="text-2xl text-[green]" />
                                                            </button>
                                                        </td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot className="bg-gray-100 border-t">
                                                <tr>
                                                    <td className="py-2 px-4 font-bold" colSpan="4">Total Price : {total_share}</td>
                                                    <td className="py-2 px-4 font-bold text-nowrap">
                                                        Total Pay: {total_payment}
                                                    </td>
                                                    <td className="py-2 px-4 font-bold text-nowrap">
                                                        Total Due: {parseInt(total_share) - parseInt(total_payment)}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-[white] bg-[#c90303] text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setItem(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
    );
};

export default Modal;