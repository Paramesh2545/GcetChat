import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "unauthorized- no token available" });
  }

  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "unauthorized-invalid-token" });

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("error in verifing token" + error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};
