import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
const ProtectiveRoute = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuthStore.getState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [user, isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectiveRoute;
