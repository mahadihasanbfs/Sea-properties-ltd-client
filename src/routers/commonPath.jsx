import SignIn from "../components/Authentication/SignIn";
import SignUp from "../components/Authentication/SignUp";
import BoardOfDirector from "../pages/Home/About_us/Board_of_Director/BoardOfDirector";
import CSR from "../pages/Home/About_us/CSR/CSR";
import Companies from "../pages/Home/About_us/Companies/Companies";
import ManagementTeam from "../pages/Home/About_us/Management_Team/ManagementTeam";
import OurClient from "../pages/Home/About_us/Our_Client/OurClient";
import OurStory from "../pages/Home/About_us/Our_Story/OurStory";
import VisionMision from "../pages/Home/About_us/Vision_Mision/VisionMision";
import Home from "../pages/Home/Home/Home";

const commonPath = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: 'our-story',
        element: <OurStory />
    },
    {
        path: 'vision-mision-values',
        element: <VisionMision />
    },
    {
        path: 'board-of-directors',
        element: <BoardOfDirector />
    },
    {
        path: 'management-team',
        element: <ManagementTeam />
    },
    {
        path: 'companies',
        element: <Companies />
    },
    {
        path: 'our-clients',
        element: <OurClient />
    },
    {
        path: 'csr',
        element: <CSR />
    },
    {
        path: 'sign-up',
        element:<SignUp />
    },
    {
        path: 'sign-in',
        element: <SignIn />
    }
]

export default commonPath;