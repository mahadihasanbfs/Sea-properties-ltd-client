import { useLoaderData, useParams } from 'react-router-dom';
import useGetData from '../../../../hooks/useGetData';

const BlogDetails = () => {
    const data = useLoaderData();
    const blog = data?.data;

    return (
        <div className='mt-[90px]'>
            <div className="max-w-[1366px] mx-auto px-4 md:px-[40px] ">
                <img src={blog?.photo} className='w-full rounded h-[330px] md:h-[500px] object-cover' alt="" />
                <h3 className="font-bold text-3xl capitalize mt-3">{blog?.name}</h3>
                <p className="text-gray-500">{blog?.date}</p>

                <div className='mt-5 text-[#535353]' dangerouslySetInnerHTML={{ __html: blog?.description }} />
            </div>
        </div>
    );
};

export default BlogDetails;