import { commonUtils } from "#utils/index.js";
import { authServices } from "./auth.services.js";

const { asyncHandler } = commonUtils;

export const authResolvers = {
  Query: {
    _empty: () => "This is a placeholder",
  },

  Mutation: {
    signup: asyncHandler(async (_parent, { input }) => authServices.signup(input)),

    signin: asyncHandler(async (_parent, { input }) => authServices.signin(input)),

    requestPasswordReset: asyncHandler(async (_parent, { input }) =>
      authServices.requestPasswordReset(input),
    ),

    updatePassword: asyncHandler(async (_parent, { input }) => authServices.updatePassword(input)),
  },
};
