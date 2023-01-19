import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";

function NavBar(props) {
  const ctx = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm mb-3">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Listy list
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {ctx.isLoggedIn && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <span className="nav-link active" aria-current="page">
                  {ctx.user !== null && ctx.user.userName}
                </span>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link active pointer"
                  onClick={ctx.onLogout}
                  aria-current="page"
                >
                  Logout
                </span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
