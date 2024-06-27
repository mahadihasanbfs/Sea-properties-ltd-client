import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import bg from '../../../assets/contact.jpg';

const Land = () => {
    const [projectData, setProjectData] = useState([]);
    const [type, setType] = useState('all');
    const filterPath = useLocation();
    const [projectStatus, setProjectStatus] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        const text = filterPath?.hash;
        const result = text ? text.replace('#', '').toLowerCase() : '';
        const capitalizedResult = result.charAt(0).toUpperCase() + result.slice(1);
        setTitle(capitalizedResult);
        setProjectStatus(result);
    }, [filterPath]);

    const { data: responseData, isLoading } = useQuery({
        queryKey: ["PData"],
        queryFn: async () => {
            const res = await fetch(`https://backend.seapropertiesltd.com.bd/api/v1/admin/land/lands`);
            const data = await res.json();
            return data?.data;
        },
    });

    useEffect(() => {
        if (responseData) {
            const filteredData = responseData.filter(project => {
                const projectStatusLowerCase = project?.project_status?.toLowerCase();
                const projectTypeLowerCase = project?.project_type?.toLowerCase();

                const matchesStatus = projectStatus === "" || projectStatusLowerCase === projectStatus;
                const matchesType = type === "all" || projectTypeLowerCase === type.toLowerCase();
                return matchesStatus && matchesType;
            });

            setProjectData(filteredData);
        }
    }, [responseData, projectStatus, type]);


    return (
        <div className="">
            <Helmet>
                <title>Land | SEA Properties Ltd.</title>
            </Helmet>

            {/* banner */}
            <div style={{ backgroundImage: `linear-gradient(30deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url('${bg}')`, backgroundAttachment: '' }} className=" mx-auto flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0 pt-[200px] pb-[100px] xl:pb-[150px] px-[60px] bg-cover object-cover bg-white">
                <div className="flex justify-between max-w-[1366px] m-auto  w-full">
                    <div className="text-[#fff] ">
                        <h3 className="text-[37px] uppercase">{filterPath?.hash?.slice(1)} Our Land </h3>
                    </div>
                    <div>
                        {/* <img src="https://i.ibb.co/jzV8h9n/Rectangle-46.png" alt="" /> */}
                    </div>
                </div>
            </div>

            {/* filter nav */}
            <div className="bg-[#F9F9F9] pt-12">


                {isLoading ? (
                    <div className='h-[50vh] flex flex-col gap-3 items-center justify-center'>
                        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-[red]"></div>
                        <p className="text-center">Loading...</p>
                    </div>
                ) : (
                    <div className="max-w-[1366px] mx-auto px-6 xl:px-[50px] pb-20">
                        {!projectData?.length ? (
                            <div className='h-[10vh]  w-full flex flex-col gap-3 items-center justify-center'>
                                <h1 className="text-2xl font-bold  opacity-[0.3]">Land Not Found</h1>
                            </div>
                        ) : (
                            <div className="grid gap-10 md:grid-cols-3">
                                {responseData?.map(item => (
                                    <Link key={item?._id} to={`/land_detail/${item?.sku}`}>
                                        {/* <div

                                            className={`${item?.status ? ' border-[3px] border-[#f34444]' : 'border-[green]'} relative xl:w-[423px] rounded-lg duration-200 hover:shadow-lg   xl:h-[423px] justify-self-center overflow-hidden hover:cursor-pointer`}>
                                            {item?.status && <span className="bg-[red] absolute text-[16px] text-[white] w-[100px] h-[30px] flex items-center justify-center  rounded-br-2xl z-[100]">SOLD OUT</span>}
                                           
                                        </div> */}
                                        <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-md">
                                            <div className="relative">
                                                <img className="w-full h-full hover:scale-110 transition-transform duration-1000 ease-in-out object-cover" src={item?.banner_img} alt="" />
                                                <div className="w-full h-[70px]  px-6 bg-[#000000ac] flex justify-center items-center flex-col absolute bottom-20">
                                                    <h3 className="text-[18px] text-xl text-[white]">{item?.name}</h3>
                                                    <h3 className="text-[18px] text-sm text-[white]">{item?.details?.info?.address}</h3>
                                                </div>

                                                {item?.status && <div className="absolute top-0 right-0">
                                                    <div className="w-32 h-8 absolute top-4 -right-8">
                                                        <div
                                                            className="h-full w-full bg-[red] text-[white] text-xs text-center leading-8 font-semibold transform rotate-45">
                                                            SOLD OUT</div>
                                                    </div>
                                                </div>}
                                            </div>

                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Land;
