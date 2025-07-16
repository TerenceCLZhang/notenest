import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import { Link } from "react-router-dom";
import { clearAccessToken } from "../../state/accessTokenSlice";
import { clearUsername } from "../../state/userSlice";
import axios from "axios";

const Header = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await axios.delete("http://localhost:8080/auth/logout", {
        withCredentials: true,
      });

      dispatch(clearAccessToken());
      dispatch(clearUsername());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Link to="/notes">
        <h1>NoteNest</h1>
      </Link>
      <div className="flex gap-3 lg:gap-7">
        <span className="truncate max-w-25 md:max-w-100 block">
          Hi <b>{username}</b>
        </span>
        <nav className="space-x-2 lg:space-x-4">
          <Link
            to="/"
            onClick={handleLogOut}
            className="header-btn bg-black text-white btn-hover transition-animation"
          >
            Log Out
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
