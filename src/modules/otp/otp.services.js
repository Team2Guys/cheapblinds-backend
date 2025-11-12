import createError from "http-errors";
import bcrypt from "bcryptjs";

import { generateOTP, sendEmail } from "#utils/index.js";
import { repository } from "#repository/index.js";

const { write, read } = repository;

export const otpServices = {
  sendOtp: async ({ email }) => {
    const existingUser = await read.userByEmail(email);

    if (!existingUser) throw createError(404, "User not found.");

    const { rawOTP, hashedOTP, expiresAt } = await generateOTP();

    const otpData = {
      otpHash: hashedOTP,
      id: existingUser.id,
      expiresAt,
    };

    const isOTPSaved = await write.otp(otpData);

    if (!isOTPSaved) throw createError(500, "Saving OTP failed.");

    const sentEmail = await sendEmail("otp-email", {
      email,
      subject: "Here's your OTP",
      rawOTP,
    });

    if (!sentEmail) throw createError(500, "Sending email failed.");

    return {
      status: "success",
      message: "OTP sent successfully",
    };
  },

  verifyOtp: async ({ email, otp }) => {
    const existingUser = await read.userByEmail(email);

    if (!existingUser) throw createError(404, "User not found.");

    const existingOTPs = await read.otp(existingUser.id.toString());

    if (!existingOTPs || !existingOTPs.length) throw createError(400, "Invalid OTP");

    const comparisonResults = await Promise.all(
      existingOTPs.map((existingOTP) => bcrypt.compare(otp, existingOTP.otpHash)),
    );

    const isOTPValid = comparisonResults.some((result) => result === true);

    if (!isOTPValid) throw createError(400, "Invalid OTP.");

    return {
      status: "success",
      message: "OTP verified successfully",
    };
  },
};
