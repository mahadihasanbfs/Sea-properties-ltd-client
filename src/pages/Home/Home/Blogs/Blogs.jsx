import React from 'react';
import useGetData from '../../../../hooks/useGetData';
import { Link } from 'react-router-dom';

const Blogs = () => {
    // Your component logic here
    const data = useGetData('api/v1/admin/blog/blogs');

    console.log(data, 'blogsssssss');
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
                    <div className="grid grid-cols-3 -mx-4">

                        {
                            data?.data?.map(itm => <Link to={`/blogs/blogs-details/${itm?._id}`} key={itm?._id}>
                                <div className="w-full  px-4">
                                    <div className="max-w-[370px] mx-auto mb-10">
                                        <div className="rounded overflow-hidden mb-8">
                                            <img
                                                src={itm?.photo}
                                                alt="image"
                                                className="w-full h-[240px] object-cover"
                                            />
                                        </div>
                                        <div>
                                            {itm?.date && <span
                                                className=" bg-primary rounded inline-block text-center py-1 px-4 text-xs leading-loose font-semibold text-white mb-5 "
                                            >
                                                {itm?.date}
                                            </span>}
                                            <h3>
                                                <a
                                                    href="javascript:void(0)"
                                                    className="font-semiboldtext-xl sm:text-2xl lg:text-xl xl:text-2xl mb-4 inline-block text-dark hover:text-primary font-semibold capitalize
                  "
                                                >
                                                    {itm?.name}
                                                </a>
                                            </h3>

                                        </div>
                                    </div>
                                </div>
                            </Link>)
                        }


                    </div>
                </div>
            </section>

        </div>
    );
}

export default Blogs; // Ensure that you export your component as default
