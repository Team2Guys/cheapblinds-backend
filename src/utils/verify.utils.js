import createError from "http-errors";

export const verifications = {
  verifyAccessToken: (resolver) => async (parent, args, context, info) => {
    console.log("context.user:", context.user);
    if (!context.user) throw createError(401, "Unauthorized");
    return resolver(parent, args, context, info);
  },
};
