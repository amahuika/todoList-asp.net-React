import { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "reactstrap";
import Card from "../UI/Card";

function Register(props) {
  const [passwordInput, setPasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    console.log(emailInput);
    console.log(passwordInput);
    console.log(usernameInput);
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-4">
        <Card>
          <h4>Register</h4>
          <hr />
          <form>
            <label className="form-label mb-0">Username</label>
            <input
              className="form-control mb-2"
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              autoComplete="on"
            />
            <label className="form-label mb-0">Email</label>
            <input
              className="form-control mb-2"
              type="email"
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
              <button onClick={submitHandler} className="btn btn-primary me-4">
                Sign up
              </button>
              <Link to="/" className="registerTag">
                Already have a login?
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
export default Register;
