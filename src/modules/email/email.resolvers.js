import { commonUtils } from "#utils/index.js";
import { emailServices } from "./email.services.js";

const { asyncHandler } = commonUtils;

export const emailResolvers = {
  Query: {
    _empty: () => "This is a placeholder",
  },

  Mutation: {
    checkVerificationToken: asyncHandler(async (_parent, { input }) =>
      emailServices.checkVerificationToken(input),
    ),

    sendVerificationToken: asyncHandler(async (_parent, { input }) =>
      emailServices.sendVerificationToken(input),
    ),
  },
};
