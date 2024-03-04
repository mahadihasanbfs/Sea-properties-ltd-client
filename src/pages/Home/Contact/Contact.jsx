import PrimaryBanner from "../../../components/common/PrimaryBanner";
import SecondaryTitle from "../../../components/common/SecondaryTitle";
import P from "../../../components/sharedComponent/P";
import useContextApi from "../../../hooks/useContextApi";

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
            <div className="grid grid-cols-2">
                <figure>
                    <img src={contactImg} className="w-full h-[350px] object-cover" />
                </figure>
                <div className="space-y-6 pl-[100px] my-auto">
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
        </div>
    );
};

export default Contact;