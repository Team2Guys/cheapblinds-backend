import createError from "http-errors";

export const verifications = {
  verifyAccessToken: (resolver) => async (parent, args, context, info) => {
    if (!context.user) throw createError(401, "Unauthorized");
    return resolver(parent, args, context, info);
  },

  verifyAuthRole: (roles) => (resolver) => async (parent, args, context, info) => {
    if (!context.user) throw createError(401, "Unauthorized");
    if (!roles.includes(context.user.role)) throw createError(403, "Forbidden");
    return resolver(parent, args, context, info);
  },
};
