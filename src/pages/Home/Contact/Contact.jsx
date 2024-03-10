import PrimaryBanner from "../../../components/common/PrimaryBanner";
import SecondaryTitle from "../../../components/common/SecondaryTitle";
import useContextApi from "../../../hooks/useContextApi";
import ContactMap from "./ContactMap";

const Contact = () => {
    const { ContactPageImg } = useContextApi();
    const { bannerImg, contactImg } = ContactPageImg;

    const contactInfo = {
        title: 'Contact Us',
        companyName: 'Shanta Holdings Limited',
        address: [ //every address item create new address line.
            'Forum, East Tower, Level 20 - 22',
            '187-188/B, Bir Uttam Mir Shawkat Sarak',
            'Tejgaon, Dhaka 1208.'
        ],
        phone: [ //every phone item create new line.
            'Hotline: 16634',
            'Cell:+88 01678 666444',
            'Email: info@shantaholdings.com'
        ]
    }

    const { title, companyName, address, phone } = contactInfo;

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
            message
        }
        console.log(data);
        form.reset()
    }
    return (
        <div>
            {/* Contact banner section */}
            <PrimaryBanner
                title={'Get in touch'}
                subTitle={'Contact'}
                bannerImg={bannerImg}
                opacity={30}
            ></PrimaryBanner>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2">
                <figure>
                    <img src={contactImg} className="w-full h-[350px] object-cover" />
                </figure>
                <div className="space-y-6 pl-6 md:pl-[50px] lg:pl-[100px] my-auto py-6 md:py-0">
                    <SecondaryTitle
                        text={title}
                        position="text-left"
                    />
                    <p>{companyName}</p>

                    <div>
                        {
                            address?.map((item, index) => <p key={index}>{item}</p>)
                        }
                    </div>

                    <div>
                        {
                            phone?.map((item, index) => <p key={index}>{item}</p>)
                        }
                    </div>
                </div>
            </div>

            {/* Contact form */}
            <div className="bg-[#78909C] py-[80px] lg:py-[105px]">
                <div className="max-w-[1366px] mx-auto px-6 md:px-[90px] lg:px-[260px] text-white">
                    <h2 className="text-[27px] md:text-[37px] uppercase">Book A Free Appointment</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-10">
                        <div>
                            <p>Name*</p>
                            <input
                                type="text" name="name"
                                required
                                autoComplete="off"
                                className="w-full md:w-[330px] bg-[#78909C] focus:outline-none pt-3 px-1 border-b-[1px] border-[#FFFFFF40] text-white font-roboto font-light"
                            />
                        </div>
                        <div>
                            <p>Enter your Email</p>
                            <input
                                type="text" name="email"
                                autoComplete="off"
                                className="w-full md:w-[330px] bg-[#78909C] focus:outline-none pt-3 px-1 border-b-[1px] border-[#FFFFFF40] text-white font-roboto font-light"
                            />
                        </div>
                        <div>
                            <p>Phone Number*</p>
                            <input
                                type="text" name="phone"
                                required
                                autoComplete="off"
                                className="w-full md:w-[330px] bg-[#78909C] focus:outline-none pt-3 px-1 border-b-[1px] border-[#FFFFFF40] text-white font-roboto font-light"
                            />
                        </div>
                        <div>
                            <p>Message</p>
                            <input
                                type="text" name="message"
                                required
                                autoComplete="off"
                                className="w-full md:w-[330px] bg-[#78909C] focus:outline-none pt-10 px-1 border-b-[1px] border-[#FFFFFF40] text-white font-roboto font-light"
                            />
                        </div>

                        <div className="pt-6">
                            <input type="submit" value="Submit" className="py-[9px] px-[28px] border-[3px] border-white hover:cursor-pointer" />
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