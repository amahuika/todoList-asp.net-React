import React, { useContext } from "react";
import { redirect, Route, Routes } from "react-router-dom";
import { AppRoutes, UnauthorizedRoutes } from "./AppRoutes";
import { Layout } from "./components/Layout";
import Login from "./components/Login";
import Home from "./components/pages/Home";

import "./custom.css";
import AuthContext from "./store/auth-context";

export default function App() {
  const ctx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        {ctx.isLoggedIn
          ? AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })
          : UnauthorizedRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}

        <Route path="*" element={ctx.isLoggedIn ? <Home /> : <Login />} />
      </Routes>
    </Layout>
  );
}
