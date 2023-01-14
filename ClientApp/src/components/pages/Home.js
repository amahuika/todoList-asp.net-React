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
    <div>
      <h3>Welcome {ctx.user.userName}</h3>
    </div>
  );
}

export default Home;
