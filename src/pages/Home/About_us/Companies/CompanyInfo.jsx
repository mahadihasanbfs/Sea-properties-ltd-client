

const CompanyInfo = ({data}) => {
    const { site, companyName, companyInfo} = data;
    return (
        <div>
            <a href={site} className="text-[#337AB7] leading-6">{companyName}</a>
            <p className="text-black leading-6">{companyInfo}</p>
        </div>
    );
};

export default CompanyInfo;