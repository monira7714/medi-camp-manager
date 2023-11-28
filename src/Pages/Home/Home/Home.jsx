import Banner from "../Banner/Banner";
import Newsletter from "../Newsletter/Newsletter";
import PopularCamps from "../PopularCamp/PopularCamps";
import Testimonials from "../Testimonials/Testimonials";
import UpComing from "../UpComing/UpComing";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularCamps></PopularCamps>
            <Testimonials></Testimonials>
            <UpComing></UpComing>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;