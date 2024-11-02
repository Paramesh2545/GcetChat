import React, { useEffect, useRef, useState } from "react";
import "../styles/verifyEmail.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/AuthStore";
const VerificationEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const { isVerifyingEmail, verifyEmail, tempMail, checkAuth, user } =
    useAuthStore();
  const navigate = useNavigate();
  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    console.log(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmpty = otp.some((value) => value === "");

    if (hasEmpty) {
      toast.error("Enter full OTP");
    } else {
      const otp2 = parseInt(otp.join(""), 10);
      try {
        const res = await verifyEmail(otp2, tempMail);
        toast.success("Email verified successfully!");
        navigate("/");
      } catch (error) {
        toast.error(error.response.data.message);
        toast.error("unsuccessfull verification try again");
      }
    }
  };

  const checkAuthentication = async () => {
    try {
      const res = await checkAuth();
      if (user.isVerified) {
        navigate("/page not found");
      }
    } catch (err) {}
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <div className="containerv">
      <form className="formv">
        <div className="formContainerv">
          <div className="heading">
            <h3>Enter 6 digit OTP</h3>
            <p>(we have sended an otp to your Email)</p>
          </div>
          <div className="numinp">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                type="number"
                className="otp-input"
                id={index + 1}
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="verify-btn"
            onClick={(e) => handleSubmit(e)}
          >
            Verify
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerificationEmail;
