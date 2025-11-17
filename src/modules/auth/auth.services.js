import createError from "http-errors";

import { tokenUtils, sendEmail, bcryptUtils } from "#utils/index.js";
import { repository } from "#repository/index.js";
import { env } from "#config/index.js";

const { write, read, update } = repository;
const { FRONTEND_URL, SUPER_ADMIN_ID, SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD } = env;

export const authServices = {
  signup: async (input) => {
    const { email, password, role, permissions } = input;

    // Hash password once
    const hashedPassword = await bcryptUtils.hash(password, { rounds: 12 });

    switch (role) {
      case "ADMIN": {
        const existingAdmin = await read.adminByEmail(email);
        if (existingAdmin) throw createError(400, "Admin already exists.");

        await write.admin({ ...input, password: hashedPassword, permissions });
        break;
      }

      default: {
        // regular user
        const existingUser = await read.userByEmail(email);
        if (existingUser) throw createError(400, "User already exists.");

        const newUser = await write.user({ ...input, password: hashedPassword });

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
      }
    }

    return {
      status: "success",
      message:
        role === "USER"
          ? "Signed up successfully. Check your email to verify your account."
          : "Signed up successfully.",
    };
  },

  signin: async (input) => {
    const { email, password, role } = input;
    let user;
    let accessToken;

    switch (role) {
      case "SUPER_ADMIN":
        if (email !== SUPER_ADMIN_EMAIL || password !== SUPER_ADMIN_PASSWORD)
          throw createError(401, "Invalid credentials.");

        accessToken = tokenUtils.generate({ id: SUPER_ADMIN_ID, role }, "accessToken");
        break;

      case "ADMIN":
        user = await read.adminByEmail(email);
        if (!user) throw createError(404, "Invalid credentials.");

        if (!bcryptUtils.validateValue(password, user.password))
          throw createError(401, "Invalid credentials.");

        accessToken = tokenUtils.generate({ id: user.id, role: "ADMIN" }, "accessToken");
        break;

      default: // regular user
        user = await read.userByEmail(email);
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

          throw createError(403, "Email not verified. A new verification link has been sent.");
        }

        if (!(await bcryptUtils.compare(password, user.password)))
          throw createError(401, "Invalid credentials.");

        accessToken = tokenUtils.generate({ id: user.id }, "accessToken");
    }

    if (!accessToken) throw createError(500, "Failed to generate access token.");

    return {
      status: "success",
      message: "Signed in successfully",
      data: {
        id: role === "SUPER_ADMIN" ? SUPER_ADMIN_ID : user.id,
        accessToken,
        role,
      },
    };
  },

  requestPasswordReset: async (input) => {
    const { email } = input;

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

  updatePassword: async (input) => {
    const { resetToken, password } = input;

    const { id } = tokenUtils.verify(resetToken);

    const existingUser = await read.userById(id);

    if (!existingUser) throw createError(404, "User not found.");

    const hashedPassword = await bcryptUtils.hash(password, { rounds: 12 });

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
