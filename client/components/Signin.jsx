import React, { useEffect, useState } from "react";

import "../styles/auth.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import Toast from "react-hot-toast";
const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPass, setViewPass] = useState(false);
  const setLogin = props.setLogin;
  const navigate = useNavigate();
  const { login, user, isAuthenticated } = useAuthStore();
  const makeLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      Toast.success("logged in successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      Toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <form className="form" method="post">
      <div className="formcontainer">
        <h1 className="header">Login</h1>
        <p className="welcomeNote">
          <center>Welcome back!</center>
          log in to continue and chat
        </p>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="inputbox"
            placeholder="ex: Rollno@gcet.edu.in"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password:</label>
          <div className="passcontainer">
            <input
              type={viewPass ? "text" : "password"}
              className="inputbox"
              name="password"
              placeholder="ex: Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {viewPass ? (
              <>
                <FaEye
                  className="eye"
                  onClick={(e) => setViewPass((prev) => !prev)}
                />
              </>
            ) : (
              <>
                <FaEyeSlash
                  className="eye"
                  onClick={(e) => setViewPass((prev) => !prev)}
                />
              </>
            )}
          </div>
          <p>forgot password?</p>
        </div>
        <button className="login-btn" onClick={makeLogin}>
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <span onClick={(e) => setLogin((prev) => !prev)} className="switch">
            Signup
          </span>
        </p>
      </div>
    </form>
  );
};

export default Signin;
