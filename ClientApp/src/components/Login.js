import React, { useContext, useRef, useState } from "react";
import Card from "./UI/Card";
import "./pages/Home.css";
import { NavLink, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { axiosPost } from "../helperFunctions/AxiosFunctions";
import AuthContext from "../store/auth-context";
import { emailValidation } from "../helperFunctions/FormValidations";

function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const ctx = useContext(AuthContext);

  function submitHandler(e) {
    e.preventDefault();
    if (emailInput === "" || passwordInput === "") {
      ctx.errorMessageHandler("*Email and Password are required");

      return;
    }
    if (!emailValidation(emailInput)) {
      ctx.errorMessageHandler("*Invalid email address");

      return;
    }
    const data = { Email: emailInput, Password: passwordInput };

    ctx.onLogin(data);
  }

  return (
    <div className="row justify-content-center">
      {!ctx.isLoading ? (
        <>
          <p className="text-center">All your lists in one place.</p>
          <div className="col-lg-4">
            <Card>
              <h4>Login</h4>
              <hr />
              <form action="post" className="needs-validation">
                <label className="form-label mb-0">Email</label>
                <input
                  className="form-control mb-2"
                  type="email"
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    ctx.errorMessageHandler(null);
                  }}
                  autoComplete="on"
                  required
                />
                <div className="mb-3">
                  <label className="form-label mb-0">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    autoComplete="on"
                    required
                  />

                  <div>
                    <small className="text-danger">{ctx.errorMessage}</small>
                  </div>
                </div>
                <div className="d-inline-flex align-items-center">
                  <input
                    type="submit"
                    onClick={submitHandler}
                    className="btn btn-primary me-4"
                    value="login"
                  />

                  <NavLink tag={Link} to="/register" className="registerTag">
                    Sign up
                  </NavLink>
                </div>
              </form>
            </Card>
          </div>
        </>
      ) : (
        <div className="vh-100 d-flex align-items-center justify-content-center flex-column pb-5">
          <Spinner color="primary" />
          <div className="mt-2">Loading...</div>
        </div>
      )}
    </div>
  );
}

export default Login;
