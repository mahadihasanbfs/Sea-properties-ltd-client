import TotalUser from "./TotalUser";
import TotalProjects from "./TotalProjects";
import TotalOrders from "./TotalOrders";

const DashboardCart = () => {
  return (
    <div className="grid md:grid-cols-3 lg:gap-4 md:gap-2 gap-1 mt-4">
      <TotalUser />
      <TotalProjects />
      <TotalOrders />
    </div>
  );
};

export default DashboardCart;
