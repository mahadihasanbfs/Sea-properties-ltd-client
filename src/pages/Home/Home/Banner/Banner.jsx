import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerCart from "./BannerCart";
import { useEffect, useState } from "react";
import Actions from "../Location/Actions";

import { SwiperSlide, Swiper } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';



const Banner = () => {
      const [data, setData] = useState([]);
      const [projectStatus, setProjectStatus] = useState('');
      const [projectType, setProjectType] = useState('all');
      const [searchTerm, setSearchTerm] = useState('');

      useEffect(() => {
            fetch('https://backend.seapropertiesltd.com.bd/api/v1/admin/project/projects')
                  .then(res => res.json())
                  .then(data => setData(data?.data))
      }, [])

      let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 1,
            responsive: [
                  {
                        breakpoint: 1024,
                        settings: {
                              slidesToShow: 3,
                              slidesToScroll: 3,
                              initialSlide: 1,

                        }
                  },
                  {
                        breakpoint: 768,
                        settings: {
                              slidesToShow: 2,
                              slidesToScroll: 2,
                              initialSlide: 1,

                        }
                  },
                  {
                        breakpoint: 480,
                        settings: {
                              slidesToShow: 1,
                              slidesToScroll: 1,
                              initialSlide: 1,

                        }
                  }
            ]
      };

      // const filterData = projectStatus === '' || projectType === '' ? data : data.filter(itm =>
      //     (itm?.project_status && itm.project_status.toLowerCase() === projectStatus.toLowerCase()) ||
      //     (itm?.project_type && itm.project_type.toLowerCase() === projectType.toLowerCase())
      // );

      const [filterData, setFilterData] = useState([]);
      useEffect(() => {
            if (data) {
                  const filteredData = data?.filter(project => {
                        const projectStatusLowerCase = project?.project_status?.toLowerCase();
                        const projectTypeLowerCase = project?.project_type?.toLowerCase();

                        const matchesPosition = projectStatus === "" || projectStatusLowerCase === projectStatus;
                        const matchesType = projectType === "all" || projectTypeLowerCase === projectType.toLowerCase();
                        return matchesPosition && matchesType;
                  });
                  setFilterData(filteredData);
            }
      }, [data, projectStatus, projectType]);

      // Search functionality
      let searchData;
      if (searchTerm === '') {
            searchData = filterData; // If search term is empty, show all filtered data
      } else {
            searchData = filterData.filter(item =>
                  Object.values(item).some(value =>
                        typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
                  )
            );
      }



      return (
            <div>
                  <div className="max-w-[1366px] mx-auto py-12 mt-4 px-6 xl:px-4  ">
                        <Actions onSearch={setSearchTerm} onStatus={setProjectStatus} onType={setProjectType} />
                        <div className="slider-container mt-12  mr-5 w-[98%] mx-auto">

                              <Swiper slidesPerView={3}
                                    // spaceBetween={70}
                                    autoplay={true} navigation={false} modules={[Navigation, Autoplay]} className="mySwiper"
                                    breakpoints={{
                                          // When window width is <= 640px (small devices), set slidesPerView to 1
                                          300: {
                                                slidesPerView: 1,

                                          },
                                          320: {
                                                slidesPerView: 1,

                                          },
                                          // When window width is <= 768px (medium devices), set slidesPerView to 2
                                          768: {
                                                slidesPerView: 2,

                                          },
                                          // When window width is <= 1024px (large devices), set slidesPerView to 3
                                          1024: {
                                                slidesPerView: 3,
                                                spaceBetween: 30
                                          },
                                          1200: {
                                                slidesPerView: 3,
                                                spaceBetween: 30
                                          },
                                          1280: {
                                                slidesPerView: 3,
                                                spaceBetween: 30
                                          },
                                    }}>
                                    {
                                          searchData?.map(itm => <SwiperSlide className="pb-12 m-auto" key={itm?._id}>
                                                <BannerCart key={itm?._id} itm={itm} />
                                          </SwiperSlide>)
                                    }
                              </Swiper>
                        </div>
                  </div>
            </div>
      );
};

export default Banner;
