import createError from "http-errors";

export const verifications = {
  verifyAccess: (resolver) => async (parent, args, context, info) => {
    if (!context.user) throw createError(401, "Unauthorized Access");
    return resolver(parent, args, context, info);
  },

  verifyRole: (roles) => (resolver) => async (parent, args, context, info) => {
    if (!context.user) throw createError(401, "Unauthorized Role");
    console.log("User Role:", context.user.role);
    console.log("Allowed Roles:", roles);
    if (!roles.includes(context.user.role)) throw createError(403, "Forbidden");
    return resolver(parent, args, context, info);
  },
};
