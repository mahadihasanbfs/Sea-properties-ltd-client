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

    // useEffect(() => {
    // if (responseData) {
    //     const filteredData = responseData?.filter(project => {
    //         const projectStatusLowerCase = project?.project_status?.toLowerCase();
    //         const projectTypeLowerCase = project?.project_type?.toLowerCase();

    //         const matchesStatus = projectStatus === "" || projectStatusLowerCase === projectStatus;
    //         const matchesType = type === "all" || projectTypeLowerCase === type.toLowerCase();
    //         return matchesStatus && matchesType;
    //     });

    //     setProjectData(filteredData);
    // }
    // }, [responseData, projectStatus, type]);



    return (
        <div className="">
            <Helmet>
                <title>Our Land | SEA Properties Ltd.</title>
            </Helmet>

            {/* banner */}
            <div style={{ backgroundImage: `linear-gradient(30deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url('${bg}')`, backgroundAttachment: '' }} className="flex md:flex-row flex-col justify-between items-center gap-10 md:gap-0 bg-white bg-cover mx-auto px-[60px] pt-[200px] pb-[100px] xl:pb-[150px] h-[100vh] object-cover">
                <div className="flex justify-between m-auto w-full max-w-[1366px]">
                    <div className="text-[#fff]">
                        <h3 className="ml-4 text-[37px] uppercase">{filterPath?.hash?.slice(1)} Our Land </h3>
                    </div>
                    <div>
                        {/* <img src="https://i.ibb.co/jzV8h9n/Rectangle-46.png" alt="" /> */}
                    </div>
                </div>
            </div>

            {/* filter nav */}
            <div className="bg-[#F9F9F9] pt-12 h-screen">


                {isLoading ? (
                    <div className='flex flex-col justify-center items-center gap-3 h-[50vh]'>
                        <div className="border-[red] border-8 border-dotted rounded-full w-10 h-10 animate-[spin_2s_linear_infinite]"></div>
                        <p className="text-center">Loading...</p>
                    </div>
                ) : (
                    <div className="mx-auto px-6 xl:px-[50px] pb-20 max-w-[1366px]">
                        {!responseData?.length ? (
                            <div className='flex flex-col justify-center items-center gap-3 w-full h-[10vh]'>
                                <h1 className="opacity-[0.3] font-bold text-2xl">Land Not Found</h1>
                            </div>
                        ) : (
                            <div className="gap-10 grid md:grid-cols-3">
                                {responseData?.map(item => (
                                    <Link key={item?._id} to={`/land_detail/${item?.sku}`}>
                                        {/* <div

                                            className={`${item?.status ? ' border-[3px] border-[#f34444]' : 'border-[green]'} relative xl:w-[423px] rounded-lg duration-200 hover:shadow-lg   xl:h-[423px] justify-self-center overflow-hidden hover:cursor-pointer`}>
                                            {item?.status && <span className="z-[100] absolute flex justify-center items-center bg-[red] rounded-br-2xl w-[100px] h-[30px] text-[16px] text-[white]">SOLD OUT</span>}
                                           
                                        </div> */}
                                        <div className="bg-white shadow-md mx-auto rounded-lg overflow-hidden">
                                            <div className="relative">
                                                <img className="w-full h-full hover:scale-110 transition-transform duration-1000 ease-in-out object-cover" src={item?.banner_img} alt="" />
                                                <div className="bottom-20 absolute flex flex-col justify-center items-center bg-[#000000ac] px-6 w-full h-[70px]">
                                                    <h3 className="text-[18px] text-[white] text-xl">{item?.name}</h3>
                                                    <h3 className="text-[18px] text-[white] text-sm">{item?.details?.info?.address}</h3>
                                                </div>

                                                {item?.status && <div className="top-0 right-0 absolute">
                                                    <div className="top-4 -right-8 absolute w-32 h-8">
                                                        <div
                                                            className="bg-[red] w-full h-full font-semibold text-[white] text-center text-xs leading-8 transform rotate-45">
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
