/* eslint-disable react/prop-types */

const Title = ({ text, position }) => {
    return (
        <h2 className={`font-bold text-[40px]  text-${position}`}>
            {text}
        </h2>
    );
};

export default Title;