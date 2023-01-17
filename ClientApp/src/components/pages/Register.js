import { useContext, useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { CardText, NavLink } from "reactstrap";
import { axiosPost } from "../../helperFunctions/AxiosFunctions";
import {
  registerValidation,
  usernameValidation,
} from "../../helperFunctions/FormValidations";
import AuthContext from "../../store/auth-context";
import Card from "../UI/Card";

function Register(props) {
  const [passwordInput, setPasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();

    const data = {
      UserName: usernameInput,
      Email: emailInput,
      Password: passwordInput,
    };

    // returns true if valid returns error message if not valid
    const isValid = registerValidation(data);

    if (isValid === true) {
      axiosPost("users/register", data)
        .then((response) => {
          console.log(response);
          const data = { Email: emailInput, Password: passwordInput };
          ctx.onLogin(data);
          navigate("/");
        })
        .catch((error) => {
          console.log(error.response.data);
          setErrorMessage(error.response.data);
        });
    } else {
      setErrorMessage(isValid);
    }
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
              onChange={(e) => {
                setUsernameInput(e.target.value);
                setErrorMessage(null);
              }}
              autoComplete="on"
              required={true}
            />
            <label className="form-label mb-0">Email</label>
            <input
              className="form-control mb-2"
              type="email"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
                setErrorMessage(null);
              }}
              autoComplete="on"
              required={true}
            />
            <div className="mb-3">
              <label className="form-label mb-0">Password</label>
              <input
                className="form-control"
                type="text"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setErrorMessage(null);
                }}
                autoComplete="on"
                required={true}
              />
              <div>
                <small className="text-danger">{errorMessage}</small>
              </div>
            </div>
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
