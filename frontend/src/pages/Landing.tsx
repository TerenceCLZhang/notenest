import { useSelector } from "react-redux";
import Footer from "../components/landing/Footer";
import Header from "../components/landing/Header";
import Main from "../components/landing/Main";
import "../styles/landing.css";
import type { RootState } from "../state/store";
import { Navigate } from "react-router-dom";

const Landing = () => {
  const token = useSelector((state: RootState) => state.accessToken.token);

  // If the user is logged in redirect to /notes
  if (token) return <Navigate to={"/notes"} />;

  return (
    <div className="reg-page-layout">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Landing;
