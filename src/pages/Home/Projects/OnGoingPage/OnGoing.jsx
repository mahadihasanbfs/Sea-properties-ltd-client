import { useEffect, useState } from "react";
import OnGoingCard from "./OnGoingCard";

const OnGoing = () => {
    const [type, setType] = useState('all');
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/src/pages/Home/ProjectDetails/projectInfo.json');
                const data = await response.json();
                if (type === 'all') {
                    setData(data);
                } else {
                    const projectData = data.filter(item => item?.type === type);
                    setData(projectData);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [type])

    return (
        <div className="">
            {/* banner */}
            <div className="max-w-[1366px] mx-auto flex justify-between items-center pt-[200px] pb-[150px] px-[60px] bg-white">
                <div className="text-[#AAB0B2]">
                    <p className="text-[14px] uppercase">ongoing</p>
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
                <div className="max-w-[1366px] mx-auto px-[50px] grid grid-cols-3 pb-20">
                    {
                        data?.map((item, index) => <OnGoingCard
                            key={index}
                            item={item}
                        ></OnGoingCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default OnGoing;