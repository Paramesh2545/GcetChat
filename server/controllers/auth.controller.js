import { UserCred } from "../models/UserCred.js";
import bcryptjs from "bcryptjs";
import { generateVerficationCode } from "../utils/generateVerficationCode.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordChangedEmail,
  sendPasswordResetEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/email.js";
import crypto from "crypto";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    //to check if all fields are not empty
    if (!email || !password) {
      throw new Error("All fields are important");
    }

    // check if the email is already in use
    const userAlreadyExists = await UserCred.findOne({ email: email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }

    //as email is not registered proceed to creating a new account
    //first hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerficationCode();
    const user = new UserCred({
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires: Date.now() + 60 * 60 * 1000,
    });

    await user.save();

    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { ...user, password: undefined },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "error in:" + e });
  }
};

export const verifyEmail = async (req, res) => {
  const { code, email } = req.body;
  try {
    const user = await UserCred.findOne({
      verificationToken: code,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Verification failed" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { ...user, password: undefined },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "error in:" + error });
  }
};

export const login = async (req, res) => {
  try {
    console.log("request came to the server");
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    const user = await UserCred.findOne({ email });
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Methods", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", true);
    if (user) {
      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid password" });
      } else if (!user.isVerified) {
        return res
          .status(400)
          .json({ success: false, message: "Email not verified" });
      } else {
        const loginToken = generateTokenAndSetCookie(res, user._id);
        console.log(loginToken);
        return res.json({
          success: true,
          message: "Logged in successfully",
          user: { ...user, password: undefined },
          token: loginToken,
        });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
      success: false,
      message: "error in logging in try again after some time",
    });
  }
};
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const sendPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserCred.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email address", success: false });
    }

    const resetToken = await crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await UserCred.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        message: "Token expired or invalid",
        success: false,
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendPasswordChangedEmail(user.email);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: +e,
      error: e,
      success: false,
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await UserCred.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, user: user._doc, message: "User found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};
