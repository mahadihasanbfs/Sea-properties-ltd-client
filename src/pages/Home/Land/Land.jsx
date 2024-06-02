import { useState } from "react";
import SecondaryTitle from "../../../components/common/SecondaryTitle";
import Slider from "../../../components/common/Slider";
import { DB_URL } from "../../../const";

const Land = () => {
    const [loading, setLoading] = useState(false);

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
        console.log(data);

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
                console.log(data);
                Swal.fire("Thanks for contacting us. We will get back to you shortly", "", "success");
            });
    };
    return (
        <div>
            <div className="max-w-[1366px] mx-auto py-10 px-4 md:px-8 xl:px-20  gap-6 md:gap-0 bg-white">

                {/* project features */}
                <div className="bg-black">
                    <div className="max-w-[1366px] mx-auto py-20 px-4 md:px-8 xl:px-20 grid md:grid-cols-2 gap-6 md:gap-0">
                        <div className="">
                            <SecondaryTitle
                                text='Features & Amenities'
                                position="text-left"
                            />
                            <figure className="justify-self-end md:mt-0 mt-8 md:hidden flex items-center">
                                <img className="w-[465px] h-[490px] object-cover" src="" alt="" />
                            </figure>

                            <div className="space-y-5 md:mt-[60px] mt-4 text-white">
                                <p >kdsjkjsdahihu</p>
                            </div>
                            {/* <button className="py-[9px] px-[32px] text-white border-[3px] border-white  mt-6">
                                Explore
                            </button> */}
                        </div>
                        <figure className="justify-self-end md:flex hidden items-center">
                            <img className="w-[465px] h-[490px] object-cover" src='' alt="" />
                        </figure>
                    </div>
                </div>

                {/* Contact form */}

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

        </div>
    );
};

export default Land;