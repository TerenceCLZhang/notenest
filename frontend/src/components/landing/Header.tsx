import { Link } from "react-router-dom";
import ChangeThemeBtn from "../ChangeThemeBtn";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>NoteNest</h1>
      </Link>
      <div className="flex gap-2 md:gap-5 items-center">
        <ChangeThemeBtn />
        <nav className="flex gap-1 lg:gap-3">
          <Link
            className="header-btn bg-black text-white btn-hover transition-animation dark:bg-white dark:text-gray-950"
            to="/auth?mode=register"
          >
            Register
          </Link>
          <Link
            className="header-btn bg-gray-300 dark:bg-gray-800 btn-hover transition-animation"
            to="/auth?mode=log in"
          >
            Login In
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
