import { commonUtils } from "#utils/index.js";
import { emailServices } from "./email.services.js";

const { handlePromise } = commonUtils;

export const emailResolvers = {
  Query: {
    _empty: () => "This is a placeholder",
  },

  Mutation: {
    checkVerificationToken: handlePromise((_parent, { input }) =>
      emailServices.checkVerificationToken(input),
    ),

    sendVerificationToken: handlePromise((_parent, { input }) =>
      emailServices.sendVerificationToken(input),
    ),

    sendNewsletterEmail: handlePromise((_parent, { input }) =>
      emailServices.sendNewsletterEmail(input),
    ),
  },
};
