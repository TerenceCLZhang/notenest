import main from "../../images/landing/main.jpg";
import fastCapture from "../../images/landing/fast_capture.jpg";
import smartOrganization from "../../images/landing/smart_organization.jpg";
import accessAnywhere from "../../images/landing/access_anywhere.jpg";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <main>
      <div className="text-center font-bold">
        <h2 className="heading-main">Capture. Organize.</h2>
        <span className="subheading-main">Your ideas in one place.</span>
        <Link
          to="/auth?mode=register"
          className="block m-auto mt-5 black-btn btn-hover transition-animation"
        >
          Get Started Today
        </Link>
      </div>

      <div className="h-50 w-full rounded-2xl mb-5 overflow-hidden relative md:h-100">
        <img
          src={main}
          alt=""
          className="object-cover w-full h-full object-center"
        />
      </div>

      <div className="flex flex-col gap-7 w-full md:flex-row">
        <div className="landing-card">
          <div className="card-img">
            <img src={fastCapture} alt="" />
          </div>
          <h3>Fast capture.</h3>
          <p>Quickly jot down ideas and never lose a thought.</p>
        </div>

        <div className="landing-card">
          <div className="card-img">
            <img src={smartOrganization} alt="" />
          </div>
          <h3>Smart organization.</h3>
          <p>Structure and sort notes visually for easy searching later.</p>
        </div>

        <div className="landing-card">
          <div className="card-img">
            <img src={accessAnywhere} alt="" />
          </div>
          <h3>Access anywhere.</h3>
          <p>Visual notes always at your fingertips across any device.</p>
        </div>
      </div>

      <div className="text-center pb-5 pt-13 top-border lg:px-[20%] lg:mb-10 ">
        <div className="font-bold mb-8 lg:mb-15">
          <h4 className="heading-main">Stay Productive</h4>
          <span className="subheading-main">
            Register for free to start organizing your ideas today.
          </span>
        </div>
        <Link
          to="/auth?mode=register"
          className="black-btn btn-hover transition-animation"
        >
          Register an Account
        </Link>
      </div>
    </main>
  );
};

export default Main;
