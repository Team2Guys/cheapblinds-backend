import createError from "http-errors";

import { tokenUtils } from "#utils/index.js";

export const verifications = {
  graphql: {
    verifyAccess: (resolver) => async (parent, args, context, info) => {
      if (!context.user) throw createError(401, "Missing access token.");
      return resolver(parent, args, context, info);
    },

    verifyRole: (authorizedRoles) => (resolver) => async (parent, args, context, info) => {
      if (!context.user) throw createError(401, "Authentication required.");
      if (!authorizedRoles.includes(context.user.role))
        throw createError(
          403,
          `Access denied: one of ${authorizedRoles.join(", ")} role required.`,
        );
      return resolver(parent, args, context, info);
    },
  },
  rest: {
    verifyAccess: (req, _res, next) => {
      const accessToken = req.cookies.accessToken;

      if (!accessToken) {
        throw createError(401, "Missing access token.");
      }

      const decodedToken = tokenUtils.decode(accessToken);

      req.user = decodedToken;

      next();
    },

    verifyRole: (authorizedRoles) => (req, _res, next) => {
      if (!req.user) {
        throw createError(401, "Authentication required.");
      }

      if (!authorizedRoles.includes(req.user.role)) {
        throw createError(
          403,
          `Access denied: one of ${authorizedRoles.join(", ")} role required.`,
        );
      }

      next();
    },
  },
};
