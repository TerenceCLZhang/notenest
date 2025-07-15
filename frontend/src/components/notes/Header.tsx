import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";

const Header = () => {
  const username = useSelector((state: RootState) => state.user.username);

  return (
    <header>
      <a href="/notes">
        <h1>NoteNest</h1>
      </a>
      <div className="flex gap-3 lg:gap-7">
        <span className="truncate max-w-25 md:max-w-100 block">
          Hi <b>{username}</b>
        </span>
        <nav className="space-x-2 lg:space-x-4">
          <a
            href="/"
            className="header-btn bg-black text-white btn-hover transition-animation"
          >
            Log Out
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
