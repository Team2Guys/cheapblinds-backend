import { commonUtils } from "#utils/index.js";
import { otpServices } from "./otp.services.js";

const { handleAsync } = commonUtils;

export const otpResolvers = {
  Query: {
    _empty: () => "This is a placeholder",
  },

  Mutation: {
    sendOtp: handleAsync(async (_parent, { input }) => otpServices.sendOtp(input)),

    verifyOtp: handleAsync(async (_parent, { input }) => otpServices.verifyOtp(input)),
  },
};
