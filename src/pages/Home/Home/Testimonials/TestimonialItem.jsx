/* eslint-disable react/prop-types */

const TestimonialItem = ({ itm }) => {
    return (
        <div className="m-3 ">
            <div className="ring-1 ring-gray-400 md:h-[240px] h-[400px] rounded p-6 flex-col flex justify-between">
                <p className=" text-justify   ">
                    {itm?.description.split(" ").slice(0, 50).join(" ")}
                </p>
                <div className="flex items-center gap-3">
                    <img src={itm?.photo} alt="n" className="w-12 h-12 ring-1 ring-gray-500 rounded-full object-cover" />

                    <div>
                        <h4 className="font-semibold capitalize">
                            {itm?.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                            {itm?.position}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialItem;