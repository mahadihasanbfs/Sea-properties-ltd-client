import Dashboard from "../Admin/Dashboard";
import AddBanner from "../Admin/pages/AdminBanner/AddBanner";
import BannerManagement from "../Admin/pages/AdminBanner/BannerManagement";
import AddBlog from "../Admin/pages/AdminBlog/AddBlog";
import ManageBlog from "../Admin/pages/AdminBlog/BlogManagement";
import AddProject from "../Admin/pages/AdminProject/AddProject";
import EditProject from "../Admin/pages/AdminProject/EditProject";
import ManageProject from "../Admin/pages/AdminProject/ManageProject";
import AddTestimonials from "../Admin/pages/AdminTestimonials/AddTestimonial";
import ManageTestimonial from "../Admin/pages/AdminTestimonials/AdminTestimonials";
import BookingManagement from "../Admin/pages/BookingManagement/BookingManagement";
import ManageContact from "../Admin/pages/ContactManagement/ContactManagement";
import AddInstallment from "../Admin/pages/Installment/AddInstallment";
import ManageInstallment from "../Admin/pages/Installment/ManageInstallment";
import EditLandArea from "../Admin/pages/LandReportManagement/EditLandArea";
import LandReportManagement from "../Admin/pages/LandReportManagement/LandReportManagement";
import AddNewsEvent from "../Admin/pages/NewsEvent/AddNewsEvent";
import NewsEventManagement from "../Admin/pages/NewsEvent/NewsEventManagement";
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
    // loader: async ({ params }) => {
    //    const response = await fetch(
    //     `https://backend.seapropertiesltd.com.bd/api/v1/admin/project/get-project?project_id=${encodeURIComponent(params?.id)}}`
    //   );
    //   const data = await response.json();
    //   return data.data;
    // },
    loader: ({ params }) => {
      return fetch(
        `https://backend.seapropertiesltd.com.bd/api/v1/admin/project/get-project?project_id=${params?.id}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.error("Error fetching project:", error);
          // Handle error gracefully, such as displaying a friendly message to the user
          return null; // Return null or any default value as needed
        });
    },
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
    path: "/admin/add-testimonial",
    element: <AddTestimonials />,
  },
  {
    path: "/admin/testimonial-management",
    element: <ManageTestimonial />,
  },
  {
    path: "/admin/add-news-event",
    element: <AddNewsEvent />,
  },
  {
    path: "/admin/news-event-management",
    element: <NewsEventManagement
    />,
  },

  {
    path: "/admin/add-banner",
    element: <AddBanner />,
  },
  {
    path: "/admin/banner-management",
    element: <BannerManagement />,
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
  {
    path: "/admin/contact-management",
    element: <ManageContact />,
  }, {
    path: "/admin/land-report",
    element: <LandReportManagement />,
  },
  {
    path: "/admin/edit-land-area/:id",
    element: <EditLandArea />,
  },
];

export default adminPath;
