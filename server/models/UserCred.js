import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userCredSchema = new Schema(
  {
    uid: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpires: Date,
    loginToken:String,
  },
  { timestamps: true }
);

export const UserCred = mongoose.model(
  "userCred",
  userCredSchema,
  "usersCredentials"
);
// module.exports = UserCred;
