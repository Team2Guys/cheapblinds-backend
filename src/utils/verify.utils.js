import createError from "http-errors";

import { tokenUtils } from "#utils/index.js";

export const verifications = {
  graphql: {
    verifyAccess: (resolver) => async (parent, args, context, info) => {
      if (!context.user) throw createError(401, "Unauthorized Access");
      return resolver(parent, args, context, info);
    },

    verifyRole: (roles) => (resolver) => async (parent, args, context, info) => {
      if (!context.user) throw createError(401, "Unauthorized Role");
      if (!roles.includes(context.user.role)) throw createError(403, "Forbidden");
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

    verifyRole: (authorizedRole) => (req, _res, next) => {
      if (!req.user) {
        throw createError(401, "Authentication required.");
      }

      if (req.user.role !== authorizedRole) {
        throw createError(403, `Access denied: ${authorizedRole} role required.`);
      }

      next();
    },
  },
};
