import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import { Link } from "react-router-dom";
import { clearAccessToken } from "../../state/accessTokenSlice";
import { clearUsername } from "../../state/userSlice";
import api from "../../utils/AxiosInstance";
import useErrorPopup from "../../hooks/useErrorPopup";
import type { AxiosError } from "axios";
import ErrorPopup from "../ErrorPopup";

const Header = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();

  const {
    errorText: errorPopUpText,
    setErrorText: setErrorPopUpText,
    clearError,
  } = useErrorPopup();

  const handleLogOut = async () => {
    try {
      await api.delete("/auth/logout");
      dispatch(clearAccessToken());
      dispatch(clearUsername());
    } catch (err) {
      const error = err as AxiosError<{ error?: string }>;
      const errorMsg =
        error?.response?.data?.error ||
        "Something went wrong. Please try again.";

      setErrorPopUpText(errorMsg);
      console.error(error);
    }
  };

  return (
    <>
      {errorPopUpText && (
        <ErrorPopup text={errorPopUpText} onClose={clearError} />
      )}

      <header>
        <Link to="/notes">
          <h1>NoteNest</h1>
        </Link>
        <div className="flex gap-3 lg:gap-7 items-center">
          <span className="truncate max-w-25 md:max-w-100 block">
            Hi <b>{username}</b>
          </span>
          <nav className="space-x-2 lg:space-x-4">
            <button
              type="button"
              onClick={handleLogOut}
              className="header-btn bg-black text-white btn-hover transition-animation"
            >
              Log Out
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
