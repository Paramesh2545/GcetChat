import React, { useEffect, useState } from "react";
import "../styles/auth.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const [login, setLogin] = useState(true);
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth();
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <div className="container">
      {login ? (
        <>
          <Signin setLogin={setLogin} />
        </>
      ) : (
        <>
          <Signup setLogin={setLogin} />
        </>
      )}
    </div>
  );
};

export default Authentication;
