import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header
      className="navbar sticky-top bg-white flex-md-nowrap p-0 shadow"
      id="navbar"
    >
      <Link to="/" className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6">
        Home
      </Link>
      <Link
        to="/add-note"
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6"
      >
        Add Note
      </Link>
      <Link
        to="/archived"
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6"
      >
        Archived Notes
      </Link>
      <Link
        to="/login"
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6"
        onClick={() => {
          localStorage.removeItem("access_token");
        }}
      >
        Logout
      </Link>
    </header>
  );
}

export default Navbar;
