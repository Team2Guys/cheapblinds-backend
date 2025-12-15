import { env } from '#config/index.js';
import { commonUtils } from '#lib/index.js';
import { authServices } from './auth.service.js';

const { handlePromise } = commonUtils;
const { NODE_ENV } = env;

export const authResolvers = {
  Mutation: {
    signup: handlePromise((_parent, { input }) => authServices.signup(input)),

    signin: handlePromise(async (_parent, { input }, { res }) => {
      const resBody = await authServices.signin(input);
      const { accessToken } = resBody;

      res.cookie('accessToken', accessToken, {
        httpOnly: true, // cannot be read by JS
        secure: NODE_ENV === 'production', // only over HTTPS
        sameSite: NODE_ENV === 'production' ? 'none' : 'lax', // CSRF protection
        maxAge: 10 * 60 * 60 * 1000 // 10 hours
      });

      return { ...resBody, accessToken: undefined };
    }),

    signout: handlePromise((_parent, _args, { res }) => {
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production' ? 'none' : 'lax' // CSRF protection
      });

      return { status: 'success', message: 'Logged out successfully' };
    }),

    requestPasswordReset: handlePromise((_parent, { input }) =>
      authServices.requestPasswordReset(input)
    ),

    updatePassword: handlePromise((_parent, { input }) =>
      authServices.updatePassword(input)
    )
  }
};
