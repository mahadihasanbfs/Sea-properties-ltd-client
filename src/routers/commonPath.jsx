import SignIn from "../components/Authentication/SignIn";
import SignUp from "../components/Authentication/SignUp";
import BoardOfDirector from "../pages/Home/About_us/Board_of_Director/BoardOfDirector";
import CSR from "../pages/Home/About_us/CSR/CSR";
import Companies from "../pages/Home/About_us/Companies/Companies";
import ManagementTeam from "../pages/Home/About_us/Management_Team/ManagementTeam";
import OurClient from "../pages/Home/About_us/Our_Client/OurClient";
import OurStory from "../pages/Home/About_us/Our_Story/OurStory";
import VisionMision from "../pages/Home/About_us/Vision_Mision/VisionMision";
import Contact from "../pages/Home/Contact/Contact";
import BlogDetails from "../pages/Home/Home/Blogs/BlogDetails";
import MyBlogs from "../pages/Home/Home/Blogs/Blogs";
import Explore from "../pages/Home/Home/Gellary/Explore";
import Home from "../pages/Home/Home/Home";
import LandRegistrationForm from "../pages/Home/LandRegistrationForm/LandRegistrationForm";
import NewsEvent from "../pages/Home/News_Event/NewsEvent";
import NewsEventReadMore from "../pages/Home/News_Event/NewsEventReadMore";
import ProjectDetails from "../pages/Home/ProjectDetails/ProjectDetails";
import OnGoing from "../pages/Home/Projects/OnGoingPage/OnGoing";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsCondition from "../pages/TermsCondition";


const commonPath = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "our-story",
    element: <OurStory />,
  },
  {
    path: "vision-mision-values",
    element: <VisionMision />,
  },
  {
    path: "board-of-directors",
    element: <BoardOfDirector />,
  },
  {
    path: "management-team",
    element: <ManagementTeam />,
  },
  {
    path: "companies",
    element: <Companies />,
  },
  {
    path: "our-clients",
    element: <OurClient />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "csr",
    element: <CSR />,
  },
  {
    path: "news-and-events",
    element: <NewsEvent />,
  },
  {
    path: "news_events/:id",
    loader: async ({ params }) => {
      const id = params.id;
      const response = await fetch(
        `https://backend.seapropertiesltd.com.bd/api/v1/admin/get-news-events-by-id?id=${id}`
      );
      const data = await response.json();
      return data.data;
    },
    element: <NewsEventReadMore />,
  },
  {
    path: "blogs",
    element: <MyBlogs />,
  },
  {
    path: "blogs/blogs-details/:id",
    element: <BlogDetails />,
    loader: ({ params }) => {
      return fetch(
        `https://backend.seapropertiesltd.com.bd/api/v1/admin/blog/get-blog?blog_id=${params?.id}`
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
          console.error("Error fetching blog details:", error);
          // Handle error gracefully, such as displaying a friendly message to the user
          return null; // Return null or any default value as needed
        });
    },
  },
  {
    path: "project-details/:id",
    element: <ProjectDetails />,
  },
  {
    path: "project",
    element: <OnGoing />,
  },
  {
    path: "land-registration-form",
    element: <LandRegistrationForm />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "why-sea-properties",
    element: <Explore />,
  },

  {
    path: 'privacy-policy',
    element: <PrivacyPolicy />
  },
  {
    path: 'terms-condition',
    element: <TermsCondition />
  },
  {
    path: "*",
    element: <Home />,
  },
];

export default commonPath;
