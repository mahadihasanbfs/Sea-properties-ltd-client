import { Helmet } from "react-helmet";
import Banner from "./Banner/Banner";
import Gellary from "./Gellary/Gellary";
import HeroSection from "./HeroSection/HeroSection";
import Location from "./Location/Location";
import NewsLetter from "./NewsLetter";
import ShowCase from "./ShowCase/ShowCase";
import SocialDemo from "./SocialDemo/SocialDemo";
import Testimonials from "./Testimonials/Testiminials";


const Home = () => {
    return (
        <div className="pb-20">
            <Helmet>
                <title>
                    Sea Properties ltd
                </title>
            </Helmet>
            <HeroSection />
            <Banner />
            <Gellary />
            <Testimonials />
            <Location />
            <SocialDemo />
            <NewsLetter />
        </div>
    );
};

export default Home;