import React, { useEffect, useState } from "react";
import IsUserLoggedIn from "../util/IsUserLoggedIn";
import { Outlet, Router, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import Cookies from "js-cookie";
import "../styles/Home.css";
import Navbar from "../components/Navbar";
const Home = () => {
  const { isAuthenticated, checkAuth, user } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div className="HomeOuterWrapper">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Home;
