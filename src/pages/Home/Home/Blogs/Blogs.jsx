import { useQuery } from '@tanstack/react-query';
import useGetData from '../../../../hooks/useGetData';
import { Link } from 'react-router-dom';

const Blogs = () => {
    // Your component logic here
    const { data: data = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch(`https://backend.seapropertiesltd.com.bd/api/v1/admin/blog/blogs`);
            const data = await res.json();
            return data;
        },
    });

    if (isLoading) {
        return <div className='bg-[white] h-screen flex flex-col gap-3 items-center justify-center'>
            <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-[red]"></div>
            <p className="text-center">Loading...</p>
        </div>;
    }

    if (!data || !data?.data.length) {
        return <div>No data available</div>;
    }

    return (
        <div>
            <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
                <div className="container">
                    <div className="flex flex-wrap justify-center -mx-4">
                        <div className="w-full px-4">
                            <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
                                <span className="font-semibold text-lg text-primary mb-2 block">
                                    Our Blogs
                                </span>
                                <h2
                                    className=" font-bold text-3xl sm:text-4xl md:text-[40px] text-dark mb-4"
                                >
                                    Our Recent News
                                </h2>
                                <p className="text-base text-body-color">
                                    There are many variations of passages of Lorem Ipsum available but
                                    the majority have suffered alteration in some form.
                                </p>
                            </div>
                        </div>
                    </div>
                    {data && data.length ?

                        <div className="md:grid text-[transparent] grid-cols-3 gap-14">
                            <div className="p-6 rounded-md  shadow-md mx-auto  bg-[#657287] ">
                                <div className="animate-pulse">
                                    {/* Product Image Skeleton */}
                                    <div className="w-[100%] lg:h-52 md:h-52 h-48 rounded-lg bg-[#9FADC2] mb-6 text-[transparent]">. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae, ex facilis quibusdam libero tempora, itaque ratione atque totam animi magni illum enim, praesentium numquam temporibus doloremque. Quaerat omnis aut possimus!</div>
                                    {/* Product Title Skeleton */}
                                    <div className="w-[97%] h-4 rounded-lg bg-[#9FADC2] mb-4"></div>
                                    {/* Product Heading Skeleton */}
                                    <div className="w-[94%] h-4 rounded-lg bg-[#9FADC2] mb-4"></div>

                                </div>
                            </div>  <div className="p-6 rounded-md  shadow-md mx-auto  bg-[#657287] ">
                                <div className="animate-pulse">
                                    {/* Product Image Skeleton */}
                                    <div className="w-[100%] lg:h-52 md:h-52 h-48 rounded-lg bg-[#9FADC2] mb-6 text-[transparent]">. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae, ex facilis quibusdam libero tempora, itaque ratione atque totam animi magni illum enim, praesentium numquam temporibus doloremque. Quaerat omnis aut possimus!</div>
                                    {/* Product Title Skeleton */}
                                    <div className="w-[97%] h-4 rounded-lg bg-[#9FADC2] mb-4"></div>
                                    {/* Product Heading Skeleton */}
                                    <div className="w-[94%] h-4 rounded-lg bg-[#9FADC2] mb-4"></div>

                                </div>
                            </div>  <div className="p-6 rounded-md  shadow-md mx-auto  bg-[#657287] ">
                                <div className="animate-pulse">
                                    {/* Product Image Skeleton */}
                                    <div className="w-[100%] lg:h-52 md:h-52 h-48 rounded-lg bg-[#9FADC2] mb-6 text-[transparent]">. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae, ex facilis quibusdam libero tempora, itaque ratione atque totam animi magni illum enim, praesentium numquam temporibus doloremque. Quaerat omnis aut possimus!</div>
                                    {/* Product Title Skeleton */}
                                    <div className="w-[97%] h-4 rounded-lg bg-[#9FADC2] mb-4"></div>
                                    {/* Product Heading Skeleton */}
                                    <div className="w-[94%] h-4 rounded-lg bg-[#9FADC2] mb-4"></div>

                                </div>
                            </div>
                        </div>
                        :
                        <div className="grid md:grid-cols-3 -mx-4">
                            {data?.data?.map(itm => <Link to={`/blogs/blogs-details/${itm?._id}`} key={itm?._id}>
                                <div className="w-full  px-4">
                                    <div className="max-w-[370px] p-3 group rounded mx-auto mb-10">
                                        <div className="rounded overflow-hidden mb-8">
                                            <img
                                                src={itm?.photo}
                                                alt="image"
                                                className="w-full group-hover:scale-[1.2] duration-300 h-[240px] object-cover"
                                            />
                                        </div>
                                        <div>
                                            {/* {itm?.date && <span
                                                className=" bg-primary rounded inline-block text-center pt-1 px-4 text-xs leading-loose font-semibold text-white mb-5 "
                                            >
                                                {itm?.date}
                                            </span>} */}
                                            <h3>
                                                <a
                                                    href="javascript:void(0)"
                                                    className="font-semiboldtext-xl sm:text-2xl lg:text-xl xl:text-2xl mb-4 inline-block text-dark hover:text-primary font-semibold capitalize
                  "
                                                >
                                                    {itm?.name}
                                                </a>
                                            </h3>
                                            <p>
                                                {new DOMParser()
                                                    .parseFromString(itm?.description, "text/html")
                                                    .body.textContent.split(" ")
                                                    .slice(0, 5)
                                                    .join(" ")}
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </Link>)}



                        </div>
                    }

                </div>
            </section>

        </div>
    );
}

export default Blogs; // Ensure that you export your component as default
