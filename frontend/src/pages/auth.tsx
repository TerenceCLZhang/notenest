import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserForm from "../components/auth/UserForm";

const useQuery = () => new URLSearchParams(useLocation().search);

const Auth = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"register" | "login">("login");

  // Set initial mode from URL on mount
  useEffect(() => {
    const urlMode = query.get("mode");
    if (urlMode === "register") setMode("register");
    else setMode("login");
  }, [query]);

  const handleChangeMode = () => {
    const newMode = mode === "register" ? "login" : "register";
    setMode(newMode);
    navigate(`/auth?mode=${encodeURIComponent(newMode)}`);
  };

  return (
    <div className="lg:flex">
      <div className="bg-[url(../images/auth/auth.jpg)] bg-cover h-[35vh] bg bg-no-repeat lg:h-screen lg:w-[40%] lg:bg-bottom"></div>

      <div className="py-10 p-5 lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-[60%]">
        <header className="flex flex-col gap-4">
          <h1 className="m-auto text-4xl lg:text-6xl">
            <a href="/">NoteNest</a>
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
            className="text-gray-800 hover:text-gray-500 transition-animation"
            onClick={handleChangeMode}
          >
            {mode === "register"
              ? "Already have an account? Log in"
              : "Don't have an account? Register"}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Auth;
