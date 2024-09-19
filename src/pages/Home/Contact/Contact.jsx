import { Helmet } from "react-helmet";
import PrimaryBanner from "../../../components/common/PrimaryBanner";
import SecondaryTitle from "../../../components/common/SecondaryTitle";
import useContextApi from "../../../hooks/useContextApi";
import ContactMap from "./ContactMap";
import { useState } from "react";
import Swal from "sweetalert2";
import { DB_URL } from "../../../const";
import ss from '../../..//assets/contact.jpg';
import con2 from '../../../assets/con2.jpg';


const Contact = () => {
      const { ContactPageImg } = useContextApi();
      const { bannerImg, contactImg } = ContactPageImg;
      const [loading, setLoading] = useState(false);

      const contactInfo = {
            title: "Contact Us",
            companyName: "SEA Properties Limited",

            phone: [
                  //every phone item create new line.
                  "Cell: +8801894-440111",
                  "Email: info@seapropertiesltd.com.bd",
            ],
      };

      const { title, companyName, phone } = contactInfo;

      const handleSubmit = (event) => {
            event.preventDefault();
            const form = event.target;
            const name = form.name.value;
            const email = form.email.value;
            const phone = form.phone.value;
            const message = form.message.value;

            const data = {
                  name,
                  email,
                  phone,
                  message,
                  date: new Date(),
            };


            fetch(`${DB_URL}/user/contact/add`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        setLoading(false);
                        form.reset();

                        Swal.fire("Thanks for contacting us. We will get back to you shortly", "", "success");
                  });
      };
      return (
            <div>
                  <Helmet>
                        <title>Contact | SEA Properties Ltd.</title>
                  </Helmet>
                  {/* Contact banner section */}
                  <PrimaryBanner
                        title={"Get in touch"}
                        subTitle={"Contact"}
                        bannerImg={ss}
                        opacity={30}
                  ></PrimaryBanner>

                  {/* Contact Info */}
                  <div className="grid md:grid-cols-2">
                        <figure>
                              <img src={con2} className="w-full h-[390px] object-cover" />
                        </figure>
                        <div className="space-y-6 pl-6 md:pl-[50px] lg:pl-[100px] my-auto py-6 md:py-0">
                              <SecondaryTitle text={title} position="text-left" />
                              <p className="text-[24px]">{companyName}</p>

                              <div>
                                    <h1 className="md:text-[24px] text-[20px]"> Our Address:</h1>

                                    <p className="md:text-[24px] md:block hidden text-[20px]" >
                                          100 North Kalshi,
                                          Gate No - 01,
                                          Mirpur DOHS <br /> Dhaka, Bangladesh
                                    </p>

                                    <p className="md:text-[24px] md:hidden block text-[20px]" >
                                          100 North Kalshi,
                                          Gate No - 01,
                                          Mirpur DOHS,  Dhaka, Bangladesh
                                    </p>

                              </div>

                              <div>
                                    {phone?.map((item, index) => (
                                          <p className="md:text-[24px] text-[20px]" key={index}>{item}</p>
                                    ))}
                              </div>
                        </div>
                  </div>

                  {/* Contact form */}
                  <div className="bg-[#768f9b] py-[80px] lg:py-[105px]">
                        <div className="max-w-[1366px] mx-auto px-6 md:px-[90px] lg:px-[260px] text-white">
                              <h2 className="text-[27px] md:text-[37px] uppercase">
                                    Book A Free Appointment
                              </h2>
                              <form onSubmit={handleSubmit} className="space-y-4 mt-10">
                                    <div>
                                          <p>Name*</p>
                                          <input
                                                type="text"
                                                name="name"
                                                required
                                                autoComplete="off"
                                                className="w-full md:w-[500px] bg-[#78909C] focus:outline-none pt-3 px-1 border-b-[1px] border-[#FFFFFF40] text-white font-roboto font-light"
                                          />
                                    </div>
                                    <div>
                                          <p>Enter your Email</p>
                                          <input
                                                type="text"
                                                name="email"
                                                autoComplete="off"
                                                className="w-full md:w-[500px] bg-[#78909C] focus:outline-none pt-3 px-1 border-b-[1px] border-[#FFFFFF40] text-white font-roboto font-light"
                                          />
                                    </div>
                                    <div>
                                          <p>Phone Number*</p>
                                          <input
                                                type="text"
                                                name="phone"
                                                required
                                                autoComplete="off"
                                                className="w-full md:w-[500px] bg-[#78909C] focus:outline-none pt-3 px-1 border-b-[1px] border-[#FFFFFF40] text-white font-roboto font-light"
                                          />
                                    </div>
                                    <div>
                                          <p>Message</p>
                                          <input
                                                type="text"
                                                name="message"
                                                required
                                                autoComplete="off"
                                                className="w-full md:w-[500px] bg-[#78909C] focus:outline-none pt-10 px-1 border-b-[1px] border-[#FFFFFF40] text-white font-roboto font-light"
                                          />
                                    </div>

                                    <div className="pt-6">
                                          <input
                                                type="submit"
                                                value={loading ? "Sending" : "Submit"}
                                                className="py-[9px] px-[28px] border-[3px] border-white hover:cursor-pointer  hover:bg-[#a20e0e] hover:text-light"
                                          />
                                    </div>
                              </form>
                        </div>
                  </div>

                  {/* location */}
                  <div className="w-full h-[550px] lg:h-[600px] pb-20">
                        <ContactMap />
                  </div>
            </div>
      );
};

export default Contact;
