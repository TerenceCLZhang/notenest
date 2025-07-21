import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../state/store";
import { changeTheme } from "../state/themeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ChangeThemeBtn = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispath = useDispatch();

  const handleChangeTheme = () => {
    dispath(changeTheme(theme === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={handleChangeTheme}
      aria-label={`Change theme to ${
        theme === "light" ? "dark" : "light"
      } mode`}
      title={`Change theme to ${theme === "light" ? "dark" : "light"} mode`}
      className="bg-gray-300 rounded-full w-8 h-8 md:w-10 md:h-10 text-xl btn-hover transition-animation dark:bg-gray-800"
    >
      {theme === "light" ? (
        <FontAwesomeIcon icon={faMoon} />
      ) : (
        <FontAwesomeIcon icon={faSun} />
      )}
    </button>
  );
};

export default ChangeThemeBtn;
