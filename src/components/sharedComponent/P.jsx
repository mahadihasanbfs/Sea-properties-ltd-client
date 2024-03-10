
const P = ({ text, size = 'text-[16px]', lineHeight = 'leading-[22px]' }) => {
    return (
        <p className={`text-[#000] font-medium ${size} ${lineHeight}`}>
            {text}
        </p>
    );
};

export default P;