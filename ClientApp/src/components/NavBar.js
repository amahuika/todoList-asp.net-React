import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";

function NavBar(props) {
  const ctx = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3 shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          My Lists
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
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          {ctx.isLoggedIn && (
            <>
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/todo-list">
                    My Lists
                  </Link>
                </li>
              </ul>
              <button
                onClick={ctx.onLogout}
                className="btn btn-sm btn-primary align-item-end"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
