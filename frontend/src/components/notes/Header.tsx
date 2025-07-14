const Header = () => {
  return (
    <header>
      <a href="/notes">
        <h1>NoteNest</h1>
      </a>
      <div className="flex gap-3 lg:gap-7">
        <span>
          Hi <b>Terence</b>
        </span>
        <nav className="space-x-2 lg:space-x-4">
          <a
            href="/"
            className="header-btn bg-black text-white btn-hover transition-animation"
          >
            Log Out
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
