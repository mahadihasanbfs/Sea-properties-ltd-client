import Banner from "../../../../components/common/Banner";
import useContextApi from "../../../../hooks/useContextApi";
import CompanyInfo from "./CompanyInfo";

const Companies = () => {
    const { AboutUs_CompaniesImg } = useContextApi();
    const { bannerImg } = AboutUs_CompaniesImg;

    const companies = [
        {
            id: 1,
            companyName: "Shanta Lifestyle",
            site: "#",
            companyInfo: "was established with an aim to cater to the rising interior design and home decor needs of Bangladeshi consumers searching for luxury and exclusivity.",
            companyLogo: "https://i.ibb.co/7Kqggkx/seaproperties-Logo.png"
        },
        {
            id: 2,
            companyName: "Shanta Securities Ltd and Shanta Asset Management Ltd",
            site: "#",
            companyInfo: "subsidiaries of SHL, were established with the aim of setting higher standards in the financial services sector.",
            companyLogo: "https://i.ibb.co/7Kqggkx/seaproperties-Logo.png"
        },
        {
            id: 3,
            companyName: "Shanta Multiverse",
            site: "#",
            companyInfo: "marked SHL'’s entry into the fast-growing F&B sector of Bangladesh. It owns “The White Canary Café”.",
            companyLogo: "https://i.ibb.co/7Kqggkx/seaproperties-Logo.png"
        },
        {
            id: 4,
            companyName: "Shanta Equity Ltd",
            site: "#",
            companyInfo: "is an innovative full-fledged merchant bank offering a range of investment banking, corporate advisory and portfolio management solutions.",
            companyLogo: "https://i.ibb.co/7Kqggkx/seaproperties-Logo.png"
        }
    ];

    return (
        <div className="bg-[#E0F2F1]">
            {/* AboutUs_Companies banner section */}
            <Banner
                title={'Companies'}
                subTitle={'About us'}
                bannerImg={bannerImg}
                opacity={30}
            ></Banner>

            <div className="max-w-[1366px] mx-auto px-6 lg:px-[60px] py-[90px] grid md:grid-cols-2 gap-9 md:gap-6">
                <div className="flex flex-col gap-6">
                    {
                        companies.map((item) => <CompanyInfo
                            key={item.id}
                            data={item}
                        ></CompanyInfo>)

                    }
                </div>

                <div className="h-fit grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        companies.map(item => <img key={item.id} src={item.companyLogo} className=" lg:w-[160px] lg:h-[160px] xl:w-[188px] xl:h-[188px] object-cover" alt="" />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Companies;