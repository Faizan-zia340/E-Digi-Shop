import Layout from "../../components/layout/Layout";
import Herosection from "../../components/herosection/Herosection"
import Category from "../../components/./category/Category"
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import Loader from "../../components/loader/Loader";



const HomePage = () => {
  
    return(
        <Layout>
            <Herosection/>
            <Category/>
            <HomePageProductCard/>
           <Track/>
           <Testimonial/>
         <Loader/>
            </Layout>

    );
};
export default HomePage;        