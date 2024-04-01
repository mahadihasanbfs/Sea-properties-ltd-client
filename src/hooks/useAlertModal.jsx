import { RxCrossCircled } from "react-icons/rx";

export default function AlertModal({ title, on, setOn, size, children }) {
    return (
        <div>
            <div
                style={{
                    zIndex: '9000'
                }}
                onClick={() => setOn(false)} className={`fixed   flex items-center justify-center ${on ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}>


                <div onClick={(e_) => e_.stopPropagation()} className={`text- absolute w-[${size}] max-w-[97%] min-w-[300px] rounded-sm bg-[white] p-6 drop-shadow-lg dark:bg-black dark:text-white ${on ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}  `}>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">{title}</h2>
                        <button onClick={() => setOn(false)} className="   text-[gray]  text-4xl">
                            <RxCrossCircled />
                        </button>
                    </div>
                    <br />
                    <div className="max-h-[70vh] overflow-y-auto">
                        {children}
                    </div>
                    <div className="flex justify-between mt-3 ">
                        {/* <button onClick={() => setOn(false)} className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white">Ok</button> */}

                    </div>
                </div>
            </div>
        </div>
    )
}