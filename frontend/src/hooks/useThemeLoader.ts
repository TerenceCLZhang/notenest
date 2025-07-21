import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../state/store";
import { changeTheme } from "../state/themeSlice";

const useThemeLoad = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  // Load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (savedTheme === "light" || savedTheme === "dark") {
      dispatch(changeTheme(savedTheme));
    } else if (systemPrefersDark) {
      dispatch(changeTheme("dark"));
    } else {
      dispatch(changeTheme("light"));
    }
  }, [dispatch]);

  // Set theme and save to local storage
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
};

export default useThemeLoad;
