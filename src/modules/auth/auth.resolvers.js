import { commonUtils } from "#utils/index.js";
import { authServices } from "./auth.services.js";

const { handleAsync } = commonUtils;

export const authResolvers = {
  Query: {
    _empty: () => "This is a placeholder",
  },

  Mutation: {
    signup: handleAsync(async (_parent, { input }) => authServices.signup(input)),

    signin: handleAsync(async (_parent, { input }) => authServices.signin(input)),

    requestPasswordReset: handleAsync(async (_parent, { input }) =>
      authServices.requestPasswordReset(input),
    ),

    updatePassword: handleAsync(async (_parent, { input }) => authServices.updatePassword(input)),
  },
};
