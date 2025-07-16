import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>NoteNest</h1>
      </Link>
      <nav className="flex gap-2 lg:gap-3">
        <Link
          className="header-btn bg-black text-white btn-hover transition-animation"
          to="/auth?mode=register"
        >
          Register
        </Link>
        <Link
          className="header-btn bg-gray-300 btn-hover transition-animation"
          to="/auth?mode=log in"
        >
          Login In
        </Link>
      </nav>
    </header>
  );
};

export default Header;
