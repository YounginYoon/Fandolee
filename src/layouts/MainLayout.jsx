import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import NavBar from "../components/nav/NavBar";

const MainLayout = () => {
  return (
    <>
      <Header />

      <NavBar />

      <div>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
