import { commonUtils } from '#lib/index.js';
import { emailServices } from './email.service.js';
import {
  checkVerificationTokenSchema,
  sendVerificationTokenSchema
} from './email.validation.js';
import { validate } from '#lib/validation.lib.js';

const { handlePromise } = commonUtils;

export const emailResolvers = {
  Mutation: {
    checkVerificationToken: handlePromise((_parent, { input }) => {
      const validated = validate(checkVerificationTokenSchema, input);
      return emailServices.checkVerificationToken(validated);
    }),

    sendVerificationToken: handlePromise((_parent, { input }) => {
      const validated = validate(sendVerificationTokenSchema, input);
      return emailServices.sendVerificationToken(validated);
    })
  }
};
