import React, { useContext, useRef, useState } from "react";
import Card from "./UI/Card";
import "./pages/Home.css";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { axiosPost } from "../helperFunctions/AxiosFunctions";
import AuthContext from "../store/auth-context";

function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isValid, setIsValid] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const ctx = useContext(AuthContext);

  function submitHandler(e) {
    e.preventDefault();
    // if (emailInput === "") return;
    const data = { Email: emailInput, Password: passwordInput };
    ctx.onLogin(data);
    setEmailInput("");
    setPasswordInput("");
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-4">
        {ctx.isLoggedIn && <h2>Welcome {ctx.user.userName}</h2>}

        <Card>
          <h4>Login</h4>
          <hr />
          <form className="needs-validation">
            <label className="form-label mb-0">Email</label>
            <input
              className="form-control mb-2"
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              autoComplete="on"
              required
            />
            <label className="form-label mb-0">Password</label>
            <input
              className="form-control mb-3"
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoComplete="on"
            />
            <div className="d-inline-flex align-items-center">
              <button
                type="submit"
                onClick={submitHandler}
                className="btn btn-primary me-4"
              >
                Login
              </button>
              <NavLink tag={Link} to="/register" className="registerTag">
                Sign up
              </NavLink>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Login;
