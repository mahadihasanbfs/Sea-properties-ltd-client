import SignIn from "../components/Authentication/SignIn";
import SignUp from "../components/Authentication/SignUp";
import OurStory from "../pages/About_us/Our_Story/OurStory";
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
        path: 'sign-up',
        element:<SignUp />
    },
    {
        path: 'sign-in',
        element: <SignIn />
    }
]

export default commonPath;