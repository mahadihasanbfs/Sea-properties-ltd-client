/* eslint-disable react/prop-types */

const TestimonialItem = ({ itm }) => {
    return (
        <div className="m-3">
            <div className="ring-1 ring-gray-400 rounded p-6">
                <p className="text-sm">
                    {itm?.message}
                </p>
                <div className="flex items-center gap-3 mt-2">
                    <img src={itm?.img} alt="n" className="w-12 h-12 rounded-full object-cover" />

                    <div>
                        <h4 className="font-semibold">
                            {itm?.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                            {itm?.post}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialItem;