
import { useLoaderData, useParams } from "react-router-dom";
import PrimaryBanner from "../../../components/common/PrimaryBanner";
import { useEffect, useState } from "react";

import Slider from "../../../components/common/Slider";


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
            <div>
                  <div className="my-[120px] px-10 max-w-7xl mx-auto ">
                        <section class="">
                              <div class=" px-4 md:px-0  mx-auto">
                                    <div class="">
                                          <div class="">
                                                <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl">7 Best Growth Hacking Tips for Startups & SaaS</h1>
                                                <p class="mt-6 text-base font-medium text-gray-500">{new Date(date).toDateString()} </p>
                                          </div>
                                    </div>
                              </div>
                        </section>

                        <div className="  px-4 md:px-0 mx-auto">
                              <div dangerouslySetInnerHTML={{ __html: description }} className=" mx-auto pt-[60px] space-y-6"></div>


                        </div>

                        {/* news and event gallery section  */}
                        <div className=" grid grid-cols-2 md:grid-cols-3">
                              {
                                    galleryImg?.map((img, index) => <img
                                          key={index}
                                          src={img}
                                          onClick={() => openSlider(index)}
                                          className="w-full h-[170px] md:h-[215px] lg:w-[415px] mt-4 border rounded lg:h-[415px] object-cover hover:cursor-pointer hover:contrast-125 transition-all duration-500" />)
                              }
                        </div>

                        {/* gallery images slider view */}

                  </div>
                  {selectedImageIndex !== null && (
                        <Slider
                              images={galleryImg}
                              selectedIndex={selectedImageIndex}
                              setSelectedImageIndex={setSelectedImageIndex}
                              onClose={closeSlider}
                        />
                  )}
            </div>

      );
};

export default NewsEventReadMore;
