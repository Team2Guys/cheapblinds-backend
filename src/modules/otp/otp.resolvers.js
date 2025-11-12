import { commonUtils } from "#utils/index.js";
import { otpServices } from "./otp.services.js";

const { asyncHandler } = commonUtils;

export const otpResolvers = {
  Query: {
    _empty: () => "This is a placeholder",
  },

  Mutation: {
    sendOtp: asyncHandler(async (_parent, { input }) => otpServices.sendOtp(input)),

    verifyOtp: asyncHandler(async (_parent, { input }) => otpServices.verifyOtp(input)),
  },
};
