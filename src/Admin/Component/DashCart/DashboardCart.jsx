import TotalUser from "./TotalUser";
import TotalProjects from "./TotalProjects";
import TotalBookings from "./Totalbooking";



const DashboardCart = () => {
  return (
    <div className="grid md:grid-cols-3 lg:gap-4 md:gap-2 gap-1 mt-4">
      <TotalUser />
      <TotalProjects />
      <TotalBookings />
    </div>
  );
};

export default DashboardCart;
