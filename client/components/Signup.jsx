import React, { useState } from "react";
import "../styles/auth.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import PasswordStrengthBar from "react-password-strength-bar";
import { useAuthStore } from "../store/AuthStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadinganimation from "../animations/loadingAnimation.json";
const Signup = (props) => {
  const [viewPass, setViewPass] = useState(false);
  const setLogin = props.setLogin;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading, tempMail } = useAuthStore();
  const [strengthcheck, setStrengthcheck] = useState(false);
  const emailRegexn =
    /^[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z0-9]{2}@gcet\.edu\.in$/;
  //for development we are not using college mail as we can't send mail to clg mail
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const hasCapitalLetter = () => {
    const regex = /[A-Z]/;
    return regex.test(password);
  };
  const hasSpecialLetter = () => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    return regex.test(password);
  };
  const hasNumber = () => {
    const regex = /[0-9]/;
    return regex.test(password);
  };
  const passwordStrength = () => {
    let strength = 0;
    if (password.length >= 8) {
      strength += 10;
    }
    if (hasCapitalLetter()) {
      strength += 20;
    }
    if (hasSpecialLetter()) {
      strength += 20;
    }
    if (hasNumber()) {
      strength += 20;
    }
    console.log(strength);
    if (strength >= 50) {
      setStrengthcheck(true);
    }
    return strength;
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailIsValid((prev) => emailRegex.test(email));
    console.log(emailRegex.test(email));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const clgmail = email.toLowerCase();
    if (strengthcheck === true && emailRegex.test(clgmail)) {
      try {
        const res = await signup(email, password);
        toast.success("Signup successful. Please enter otp now");
        navigate("/verify-email");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else if (!emailRegex.test(clgmail)) {
      console.log(emailRegex.test(clgmail));
      toast.error("Enter a valid college email");
    } else {
      toast.error("Enter a valid password");
    }
  };

  return (
    <form className="form" method="post">
      <div className="formcontainer signup">
        <h1 className="header">Signup</h1>
        <p className="welcomeNote">
          <center>Welcome!</center>
          Register to continue and chat
        </p>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="inputbox"
            placeholder="ex: Rollno@gcet.edu.in"
            name="email"
            required
            onChange={(e) => {
              handleEmail(e);
            }}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password:</label>
          <div className="passcontainer">
            <input
              type={viewPass ? "text" : "password"}
              className="inputbox"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
                passwordStrength();
              }}
              placeholder="ex: Password"
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
        </div>
        <div className="passSecure">
          <PasswordStrengthBar password={password} />
          <h5 className={password.length >= 10 ? "greenText" : "redText"}>
            1. Password must consist more that 10 characters
          </h5>
          <h5 className={hasSpecialLetter() ? "greenText" : "redText"}>
            2. Password must consist special characters
          </h5>
          <h5 className={hasNumber() ? "greenText" : "redText"}>
            3. Password must consist numbers
          </h5>
          <h5 className={hasCapitalLetter() ? "greenText" : "redText"}>
            4. Password must consist atleast one capital letter
          </h5>
        </div>
        <>
          {!isLoading ? (
            <>
              <button
                type="submit"
                className="login-btn"
                onClick={(e) => handleSignup(e)}
              >
                Signup
              </button>
            </>
          ) : (
            <>
              <div className="login-btn sending-animation">
                <Lottie
                  animationData={loadinganimation}
                  style={{ height: "100%", width: "30%" }}
                  loop={true}
                  className="loading-animation"
                />
              </div>
            </>
          )}
        </>
        <p>
          Already have an account?{" "}
          <span onClick={(e) => setLogin((prev) => !prev)} className="switch">
            Login
          </span>
        </p>
      </div>
    </form>
  );
};

export default Signup;
