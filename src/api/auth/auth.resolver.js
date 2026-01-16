import { env } from '#config/index.js';
import { commonUtils } from '#lib/index.js';
import { authServices } from './auth.service.js';
import {
  signupSchema,
  signinSchema,
  passwordResetRequestSchema,
  passwordUpdateSchema
} from './auth.validation.js';
import { validate } from '#lib/validation.lib.js';

const { handlePromise } = commonUtils;
const { NODE_ENV } = env;

export const authResolvers = {
  Mutation: {
    signup: handlePromise((_parent, { input }) => {
      const validated = validate(signupSchema, input);
      return authServices.signup(validated);
    }),

    signin: handlePromise(async (_parent, { input }, { res }) => {
      const validated = validate(signinSchema, input);
      const resBody = await authServices.signin(validated);
      const { accessToken } = resBody;

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 10 * 60 * 60 * 1000
      });

      return { ...resBody, accessToken: undefined };
    }),

    signout: handlePromise((_parent, _args, { res }) => {
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production' ? 'none' : 'lax'
      });

      return { status: 'success', message: 'Logged out successfully' };
    }),

    requestPasswordReset: handlePromise((_parent, { input }) => {
      const validated = validate(passwordResetRequestSchema, input);
      return authServices.requestPasswordReset(validated);
    }),

    updatePassword: handlePromise((_parent, { input }) => {
      const validated = validate(passwordUpdateSchema, input);
      return authServices.updatePassword(validated);
    })
  }
};
