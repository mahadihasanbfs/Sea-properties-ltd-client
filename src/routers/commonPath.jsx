import SignIn from "../components/Authentication/SignIn";
import SignUp from "../components/Authentication/SignUp";
import OurStory from "../pages/Home/About_us/Our_Story/OurStory";
import VisionMision from "../pages/Home/About_us/Vision_Mision/VisionMision";
import Home from "../pages/Home/Home";

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
        path: 'sign-up',
        element:<SignUp />
    },
    {
        path: 'sign-in',
        element: <SignIn />
    }
]

export default commonPath;