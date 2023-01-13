import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../UI/Card";
import "./Home.css";
import { Button, NavLink, Spinner } from "reactstrap";
import { Link, Navigate, redirect } from "react-router-dom";
import { axiosPost } from "../../helperFunctions/AxiosFunctions";
import AuthContext from "../../store/auth-context";
import Login from "../Login";

function Home() {
  const ctx = useContext(AuthContext);

  return (
    <>
      {!ctx.isLoading ? (
        <div>
          {ctx.isLoggedIn ? (
            <>
              <h3>Welcome {ctx.user.userName}</h3>
            </>
          ) : (
            <>
              <p className="text-center">All your lists in one place.</p>
              <Login />
            </>
          )}
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center mt-5 pt-5">
          <Spinner />
        </div>
      )}
    </>
  );
}

export default Home;
