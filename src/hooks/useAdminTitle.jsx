const AdminTitle = ({color, position, size, title}) => {
    return (
        <h1 className={`text-[${color}] text-${position} text-[${size}] font-semibold`}> 
            {title}
        </h1>
    );
};

export default AdminTitle;