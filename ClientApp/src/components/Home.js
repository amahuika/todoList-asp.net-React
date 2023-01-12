import React, { useState } from "react";
import Card from "./Layout/Card";
import "./Home.css";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";

function Home() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  console.log(emailInput);

  function submitHandler(e) {
    e.preventDefault();
    console.log("Login");
    console.log(emailInput);
    console.log(passwordInput);

    setEmailInput("");
    setPasswordInput("");
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-4">
        <Card>
          <h4>Login</h4>
          <hr />
          <form>
            <label className="form-label mb-0">Email</label>
            <input
              className="form-control mb-2"
              type="text"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              autoComplete="on"
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

export default Home;
