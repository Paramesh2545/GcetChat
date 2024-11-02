import { create } from "zustand";
import axios from "axios";
import { Navigate } from "react-router-dom";

const API_URL = "http://localhost:8000/api/auth";
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: false,
  isLoading: false,
  isCheckingAuth: false,
  isVerifyingEmail: false,
  tempMail: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true, // Allow Axios to send cookies
        }
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error, isLoading: false });
      throw error;
    }
  },

  signup: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/signup`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      set({
        user: response.data.user,
        tempMail: response.data.user._doc.email,
        isLoading: false,
        isVerifyingEmail: true,
      });
      return response;
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (otp, mail) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, {
        code: otp,
        email: mail,
      });
      set({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      console.log(error);
      set({
        error: error.response.data.message || "Error in verifing email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axios.get(`${API_URL}/check-auth`, {
        withCredentials: true,
      });
      set({
        user: res.data.user,
        isCheckingAuth: false,
        isAuthenticated: true,
      });
      return res;
    } catch (error) {
      set({
        user: "not found the user",
        isCheckingAuth: false,
        isAuthenticated: false,
      });
    }
  },
}));
