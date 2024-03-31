import Dashboard from "../Admin/Dashboard";
import AddProject from "../Admin/pages/AdminProject/AddProject";
import ManageProject from "../Admin/pages/AdminProject/ManageProject";
import UserHistory from "../Admin/pages/UserHistory/UserHistory";

const adminPath = [
    {
        path : '/admin/',
        element: <Dashboard/>
    },{
        path : '/admin/user-history',
        element: <UserHistory/>
    },
    {
        path : '/admin/manage-project',
        element: <ManageProject/>
    },
    {
        path : '/admin/add-project',
        element: <AddProject/>
    },

]

export default adminPath;