import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../state/store";

const NotFound = () => {
  const accessToken = useSelector(
    (state: RootState) => state.accessToken.token
  );

  return (
    <div className="reg-page-layout">
      <header>
        <Link to={accessToken ? "/notes" : "/"}>
          <h1>NoteNest</h1>
        </Link>
      </header>
      <main>
        <h2 className="text-4xl">404 - Page Not Found</h2>
        <p>Sorry, the page you’re looking for doesn’t exist.</p>
        <Link
          to={accessToken ? "/notes" : "/"}
          className="black-btn btn-hover transition-animation"
        >
          Back to {accessToken ? "Notes" : "Home"}
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
