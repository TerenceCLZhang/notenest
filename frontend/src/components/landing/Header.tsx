const Header = () => {
  return (
    <header>
      <a href="/">
        <h1>NoteNest</h1>
      </a>
      <nav className="flex gap-2 lg:gap-3">
        <a
          className="header-btn bg-black text-white btn-hover transition-animation"
          href="/auth?mode=register"
        >
          Register
        </a>
        <a
          className="header-btn bg-gray-300 btn-hover transition-animation"
          href="/auth?mode=log in"
        >
          Login In
        </a>
      </nav>
    </header>
  );
};

export default Header;
