import Dashboard from "../Admin/Dashboard";
import AddBlog from "../Admin/pages/AdminBlog/AddBlog";
import ManageBlog from "../Admin/pages/AdminBlog/BlogManagement";
import AddProject from "../Admin/pages/AdminProject/AddProject";
import EditProject from "../Admin/pages/AdminProject/EditProject";
import ManageProject from "../Admin/pages/AdminProject/ManageProject";
import BookingManagement from "../Admin/pages/BookingManagement/BookingManagement";
import AddInstallment from "../Admin/pages/Installment/AddInstallment";
import ManageInstallment from "../Admin/pages/Installment/ManageInstallment";
import NewsLetterManagement from "../Admin/pages/NewsLetter/NewsLetterManagement";
import UserHistory from "../Admin/pages/UserHistory/UserHistory";
import IsAdmin from "./IsAdmin";

const adminPath = [
  {
    path: "/admin/",
    element: (
      <IsAdmin>
        <Dashboard />
      </IsAdmin>
    ),
  },
  {
    path: "/admin/user-history",
    element: <UserHistory />,
  },
  {
    path: "/admin/manage-project",
    element: <ManageProject />,
  },
  {
    path: "/admin/booking-management",
    element: <BookingManagement />,
  },
  {
    path: "/admin/add-project",
    element: <AddProject />,
  },
  {
    path: "/admin/edit-project/:id",
    element: <EditProject />,
  },
  {
    path: "/admin/add-blog",
    element: <AddBlog />,
  },
  {
    path: "/admin/blog-management",
    element: <ManageBlog />,
  },
  {
    path: "/admin/add-installment",
    element: <AddInstallment />,
  },
  {
    path: "/admin/manage-installment",
    element: <ManageInstallment />,
  },
  {
    path: "/admin/newsLetter-management",
    element: <NewsLetterManagement />,
  },
];

export default adminPath;
