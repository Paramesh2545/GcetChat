import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplate.js";
import { mailTrapClient } from "./mailtrap.config.js";
import { sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email address",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email verification",
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log(error, "error in sending mail");
    throw new Error("Error sendin email", error);
  }
};

export const sendWelcomeEmail = async (email, uName) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "194bd928-2e00-4ea0-90e7-311872df6bb4",
      template_variables: {
        name: uName,
        company_info_name: "ChatApp",
      },
    });
    console.log("welcome email sent successfully");
  } catch (error) {
    console.log(error, "error in sending welcome email");
    throw new Error("Error sending welcome email", error);
  }
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email address",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "Password reset",
    });
    console.log("password reset email sent successfully");
  } catch (error) {
    console.log(error, "error in sending password reset email");
    throw new Error("Error sending password reset email", error);
  }
};

export const sendPasswordChangedEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password changed",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password change",
    });
  } catch (error) {
    console.log(error, "error in sending password changed email");
    throw new Error("Error sending password changed email", error);
  }
};
