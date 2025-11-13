import createError from "http-errors";

import { tokenUtils, sendEmail, passwordUtils } from "#utils/index.js";
import { repository } from "#repository/index.js";
import { env } from "#config/index.js";

const { write, read, update } = repository;
const { FRONTEND_URL } = env;

export const authServices = {
  signup: async (requestBody) => {
    const { email, password } = requestBody;

    const existingEmail = await read.userByEmail(email);

    if (existingEmail) throw createError(400, "User already exists.");

    const hashedPassword = await passwordUtils.hash(password, { rounds: 12 });

    const registrationData = {
      ...requestBody,
      password: hashedPassword,
    };

    const newUser = await write.user(registrationData);

    const verificationToken = tokenUtils.generate({ id: newUser.id }, "verificationToken");

    if (!verificationToken) throw createError(500, "Failed to generate verification token.");
    if (!FRONTEND_URL) throw createError(500, "FRONTEND_URL is not defined.");

    const sentEmail = await sendEmail("verification-email", {
      email,
      subject: "Welcome - Verify your email",
      FRONTEND_URL,
      verificationToken,
    });

    if (!sentEmail) throw createError(500, "Failed to send welcome email.");

    return {
      status: "success",
      message: "Signed up successfully. Please verify your email address.",
    };
  },

  signin: async (requestBody) => {
    const { email, password } = requestBody;

    const user = await read.userByEmail(email);

    if (!user) throw createError(401, "Invalid credentials.");

    if (!user.isEmailVerified) {
      const verificationToken = tokenUtils.generate({ id: user.id }, "verificationToken");

      if (!verificationToken) throw createError(500, "Failed to generate verification token.");
      if (!FRONTEND_URL) throw createError(500, "FRONTEND_URL is not defined.");

      const sentEmail = await sendEmail("verification-email", {
        email,
        subject: "Welcome - Please, verify your email",
        FRONTEND_URL,
        verificationToken,
      });

      if (!sentEmail) throw createError(500, "Failed to send verification email.");

      throw createError(
        403,
        "Email not verified. A new verification link has been sent to your email.",
      );
    }

    const isPasswordValid = await passwordUtils.compare(password, user.password);

    if (!isPasswordValid) throw createError(401, "Invalid credentials.");

    const accessToken = tokenUtils.generate({ id: user.id }, "accessToken");

    if (!accessToken) throw createError(500, "Failed to generate access token.");

    return {
      status: "success",
      message: "Signed in successfully.",
      data: {
        id: user.id,
        accessToken,
      },
    };
  },

  requestPasswordReset: async (requestBody) => {
    const { email } = requestBody;

    const existingUser = await read.userByEmail(email);

    if (!existingUser) throw createError(404, "User not found.");

    const resetToken = tokenUtils.generate({ id: existingUser.id }, "passwordResetToken");

    if (!resetToken) throw createError(500, "Failed to generate reset token.");

    const sentEmail = await sendEmail("reset-email", {
      email,
      subject: "Reset your password",
      resetToken,
      FRONTEND_URL,
    });

    if (!sentEmail) throw createError(500, "Failed to send reset password email.");

    return {
      status: "success",
      message: "Reset password email sent successfully.",
    };
  },

  updatePassword: async (requestBody) => {
    const { resetToken, password } = requestBody;

    const { id } = tokenUtils.verify(resetToken);

    const existingUser = await read.userById(id);

    if (!existingUser) throw createError(404, "User not found.");

    const hashedPassword = await passwordUtils.hash(password, { rounds: 12 });

    const isPasswordUpdated = await update.userById(id, {
      password: hashedPassword,
    });

    if (!isPasswordUpdated) throw createError(500, "Failed to update password.");

    return {
      status: "success",
      message: "Password updated successfully.",
    };
  },
};
