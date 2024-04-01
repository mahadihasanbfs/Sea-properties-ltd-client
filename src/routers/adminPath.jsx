import Dashboard from "../Admin/Dashboard";
import AddBlog from "../Admin/pages/AdminBlog/AddBlog";
import ManageBlog from "../Admin/pages/AdminBlog/BlogManagement";
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
    },  {
        path : '/admin/add-blog',
        element: <AddBlog/>
    }, {
        path : '/admin/blog-management',
        element: <ManageBlog />
    },

]

export default adminPath;