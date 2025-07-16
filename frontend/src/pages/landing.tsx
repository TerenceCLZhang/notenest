import Footer from "../components/landing/Footer";
import Header from "../components/landing/Header";
import Main from "../components/landing/Main";
import "../styles/landing.css";

const Landing = () => {
  return (
    <div className="reg-page-layout">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Landing;
