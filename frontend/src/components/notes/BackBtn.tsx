import { Link } from "react-router-dom";

const BackBtn = () => {
  return (
    <div className="w-full lg:w-[75%]">
      <Link to={"/"} className="btn-hover transition-animation">
        Back to Home
      </Link>
    </div>
  );
};

export default BackBtn;
