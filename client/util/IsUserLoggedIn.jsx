import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

const IsUserLoggedIn = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  if (!user) {
    navigate("/auth");
  }
};

export default IsUserLoggedIn;
