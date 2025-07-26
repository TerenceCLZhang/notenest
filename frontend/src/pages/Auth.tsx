import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import UserForm from "../components/auth/UserForm";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";

const useQuery = () => new URLSearchParams(useLocation().search);

const Auth = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.accessToken.token);

  const [mode, setMode] = useState<"register" | "login">("login");

  // Set initial mode from URL on mount
  useEffect(() => {
    const urlMode = query.get("mode");
    if (urlMode === "register") setMode("register");
    else setMode("login");
  }, [query]);

  // Change mode and refresh page
  const handleChangeMode = () => {
    const newMode = mode === "register" ? "login" : "register";
    setMode(newMode);
    navigate(`/auth?mode=${encodeURIComponent(newMode)}`);
  };

  // If the user is logged in redirect to /notes
  if (token) return <Navigate to={"/notes"} />;

  return (
    <div className="lg:flex">
      <div className="bg-[url(/images/auth/auth.jpg)] bg-cover bg-no-repeat bg-center h-[35vh] lg:min-h-screen lg:w-[40%]"></div>

      <div className="py-10 p-5 lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-[60%]">
        <header className="flex flex-col gap-4 mb-4">
          <h1 className="m-auto text-4xl lg:text-5xl xl:text-6xl">
            <Link to="/">NoteNest</Link>
          </h1>
          <span className="text-2xl font-semibold">
            {mode
              .split(" ")
              .map((word) => word[0].toUpperCase() + word.slice(1))
              .join(" ")}
          </span>
        </header>
        <main className="lg:w-[75%] xl:w-[50%]">
          <UserForm mode={mode} />
        </main>

        <footer className="mt-7">
          <button
            type="button"
            className="text-gray-800 hover:text-gray-500 transition-animation dark:text-gray-300 dark:hover:text-gray-100"
            onClick={handleChangeMode}
          >
            {mode === "register" ? (
              <>
                Already have an account? <strong>Log in</strong>
              </>
            ) : (
              <>
                Don't have an account? <strong>Register</strong>
              </>
            )}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Auth;
