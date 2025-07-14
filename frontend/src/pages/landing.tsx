import Footer from "../components/landing/Footer";
import Header from "../components/landing/Header";
import Main from "../components/landing/Main";
import "../styles/landing.css";

const Landing = () => {
  return (
    <div className="px-5 pt-8 md:px-13 md:py-15 lg:w-[90vw] 2xl:w-[75vw] m-auto">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Landing;
