import { commonUtils } from '#lib/index.js';
import { emailServices } from './email.service.js';

const { handlePromise } = commonUtils;

export const emailResolvers = {
  Mutation: {
    checkVerificationToken: handlePromise((_parent, { input }) =>
      emailServices.checkVerificationToken(input)
    ),

    sendVerificationToken: handlePromise((_parent, { input }) =>
      emailServices.sendVerificationToken(input)
    )
  }
};
