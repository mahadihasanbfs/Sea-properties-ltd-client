import DashboardCart from "./Component/DashboardCart";

const Dashboard = () => {
    return (
        <div>
            <div className="grid md:grid-cols-3 lg:gap-4 md:gap-2 gap-1 mt-4">
                <DashboardCart />
                <DashboardCart />
                <DashboardCart />
            </div>
        </div>
    );
};

export default Dashboard;