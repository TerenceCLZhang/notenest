import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="reg-page-layout">
      <header>
        <Link to="/">
          <h1>NoteNest</h1>
        </Link>
      </header>
      <main>
        <h2 className="text-4xl">404 - Page Not Found</h2>
        <p>Sorry, the page you’re looking for doesn’t exist.</p>
        <button
          onClick={() => navigate(-1)}
          className="black-btn btn-hover transition-animation"
        >
          Go Back
        </button>
      </main>
    </div>
  );
};

export default NotFound;
