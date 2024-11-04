import express from "express";
import {
  signup,
  login,
  logout,
  verifyEmail,
  sendPasswordReset,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { profile } from "../controllers/profile.controller.js";
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", sendPasswordReset);

router.post("/reset-password/:token", resetPassword);

router.get("/check-auth", verifyToken, checkAuth);

router.get("/profile", profile)
export default router;
