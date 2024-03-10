

const SecondaryTitle = ({ text, position='text-center md:text-left'}) => {
    return (
        <h2 className={`text-[#8C8E91] text-[30px] md:text-[35px] md:leading-[44px] ${position} uppercase`}>
            { text }
        </h2>
    );
};

export default SecondaryTitle;