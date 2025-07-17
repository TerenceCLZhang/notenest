import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="reg-page-layout">
      <header>
        <Link to={"/"}>
          <h1>NoteNest</h1>
        </Link>
      </header>
      <main className="text-center">
        <h2 className="text-4xl">404 - Page Not Found</h2>
        <p>Sorry, the page you’re looking for doesn’t exist.</p>
        <Link to={"/"} className="black-btn btn-hover transition-animation">
          Home
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
