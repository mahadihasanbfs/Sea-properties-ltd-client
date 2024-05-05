import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const OnGoingProject = () => {
    const [projectData, setProjectData] = useState([]);
    const [type, setType] = useState('all');
    const filterPath = useLocation();
    const [projectStatus, setProjectStatus] = useState('');

    useEffect(() => {
        const text = filterPath?.hash;
        const result = text ? text.replace('#', '').toLowerCase() : '';
        setProjectStatus(result);
    }, [filterPath]);

    const { data: responseData, isLoading } = useQuery({
        queryKey: ["PData"],
        queryFn: async () => {
            const res = await fetch(`https://sea-properties-server.vercel.app/api/v1/admin/project/projects`);
            const data = await res.json();
            return data;
        },
    });

    useEffect(() => {
        if (responseData?.data) {
            const filteredData = responseData.data.filter(project => {
                const projectStatusLowerCase = project?.project_status?.toLowerCase();
                const projectTypeLowerCase = project?.project_type?.toLowerCase();

                const matchesPosition = projectStatus === "" || projectStatusLowerCase === projectStatus;
                const matchesType = type === "all" || projectTypeLowerCase === type.toLowerCase();
                return matchesPosition && matchesType;
            });
            setProjectData(filteredData);
        }
    }, [responseData, projectStatus, type]);

    return (
        <div className="">
            <Helmet>
                <title>
                    On Going Project | Sea Properties ltd
                </title>
            </Helmet>
            {/* banner */}
            <div className="max-w-[1366px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0 pt-[200px] pb-[100px] xl:pb-[150px] px-[60px] bg-white">
                <div className="text-[#AAB0B2]">
                    <p className="text-[14px] uppercase">{filterPath.hash.slice(1)}</p>
                    <h3 className="text-[37px] uppercase">Projects in progress</h3>
                </div>
                <div>
                    <img src="https://i.ibb.co/jzV8h9n/Rectangle-46.png" alt="" />
                </div>
            </div>

            {/* filter nav */}
            <div className="bg-[#F9F9F9]">
                <div className="max-w-[1366px] mx-auto h-[80px] space-x-10 px-[50px] flex items-center">
                    <button className={`${type === "all" && 'text-[#ACA100]'}`} onClick={() => setType('all')}>All</button>
                    <button className={`${type === "Residential" && 'text-[#ACA100]'}`} onClick={() => setType('Residential')}>Residential</button>
                    <button className={`${type === "Commercial" && 'text-[#ACA100]'}`} onClick={() => setType('Commercial')}>Commercial</button>
                </div>

                {isLoading ? (
                    <div className='h-[50vh] flex flex-col gap-3 items-center justify-center'>
                        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-[red]"></div>
                        <p className="text-center">Loading...</p>
                    </div>
                ) : (
                    <div className="max-w-[1366px] mx-auto px-6 xl:px-[50px] pb-20">
                        {!projectData.length ? (
                            <div className='h-[10vh]  w-full flex flex-col gap-3 items-center justify-center'>
                                <h1 className="text-2xl font-bold  opacity-[0.3]">Project Not Found</h1>
                            </div>
                        ) : (
                            <div className="grid gap-10 md:grid-cols-3">
                                {projectData.map(item => (
                                    <Link key={item?._id} to={`/project-details/${item?._id}`}>
                                        <div className="relative xl:w-[423px] rounded-lg duration-200 hover:shadow-lg border border-[#80808051] xl:h-[423px] justify-self-center overflow-hidden hover:cursor-pointer">
                                            <img className="w-full h-full hover:scale-110 transition-transform duration-1000 ease-in-out object-cover" src={item?.project_photo} alt="" />
                                            <div className="w-full h-[70px]  px-6 bg-[#00000080] flex justify-center items-center flex-col absolute bottom-20">
                                                <h3 className="text-[18px] text-[white]">{item?.name}</h3>
                                                <p className="text-[#C7C3C3]">{item?.details?.info?.address}</p>
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

export default OnGoingProject;
