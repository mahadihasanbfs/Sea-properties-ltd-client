
import { useLoaderData, useParams } from "react-router-dom";
import PrimaryBanner from "../../../components/common/PrimaryBanner";
import { useEffect, useState } from "react";

import Slider from "../../../components/common/Slider";
import { Helmet } from "react-helmet";


const NewsEventReadMore = () => {


      const [selectedImageIndex, setSelectedImageIndex] = useState(null);

      const news_events = useLoaderData()
      const { galleryImg, featureImg, title, description, date } = news_events


      const openSlider = (index) => {
            setSelectedImageIndex(index);
      };

      const closeSlider = () => {
            setSelectedImageIndex(null);
      };


      return (
            <div className='mt-[90px]'>
                  <Helmet>
                        <title>
                              {title}-News Event | SEA Properties Ltd.
                        </title>
                  </Helmet>
                  <div className="max-w-[1366px] mx-auto px-4 md:px-[40px] ">
                        <img src={featureImg} className='w-full rounded h-[330px] md:h-[500px] object-cover' alt="" />
                        <h3 className="font-bold text-3xl capitalize mt-3">{title}</h3>
                        <p className="text-gray-500">{new Date(date).toDateString()}</p>

                        <div className='mt-5 text-[#535353]' dangerouslySetInnerHTML={{ __html: description }} />

                        {galleryImg?.length ? <div className=" grid grid-cols-2 md:grid-cols-3 gap-4">
                              {
                                    galleryImg?.map((img, index) => <img
                                          key={index}
                                          src={img}
                                          onClick={() => openSlider(index)}
                                          className="w-full h-[170px] md:h-[215px] lg:w-[415px]  border rounded lg:h-[415px] object-cover hover:cursor-pointer hover:contrast-125 transition-all duration-500" />)
                              }
                        </div>
                              : ''}
                  </div>

                  {
                        selectedImageIndex !== null && (
                              <Slider
                                    images={galleryImg}
                                    selectedIndex={selectedImageIndex}
                                    setSelectedImageIndex={setSelectedImageIndex}
                                    onClose={closeSlider}
                              />
                        )
                  }
            </div >

      );
};

export default NewsEventReadMore;
