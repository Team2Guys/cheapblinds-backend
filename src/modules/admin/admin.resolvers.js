import { adminServices } from "./admin.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { asyncHandler } = commonUtils;
const { verifyAccessToken, verifyAuthRole } = verifications;

export const adminResolvers = {
  Query: {
    getAdmins: verifyAuthRole(["SUPER_ADMIN"])(
      verifyAccessToken(asyncHandler(async () => adminServices.getAdmins())),
    ),

    getAdminById: verifyAuthRole(["SUPER_ADMIN"])(
      verifyAccessToken(
        asyncHandler(async (_parent, { input }) => adminServices.getAdminById(input)),
      ),
    ),
  },

  Mutation: {
    signinSuperAdmin: asyncHandler(async (_parent, { input }) =>
      adminServices.signinSuperAdmin(input),
    ),

    signinAdmin: asyncHandler(async (_parent, { input }) => adminServices.signinAdmin(input)),

    createAdmin: asyncHandler(
      verifyAuthRole(["SUPER_ADMIN"])(
        verifyAccessToken(async (_parent, { input }) => adminServices.createAdmin(input)),
      ),
    ),

    updateAdminById: asyncHandler(
      verifyAuthRole(["SUPER_ADMIN"])(
        verifyAccessToken(async (_parent, { input }) => adminServices.updateAdminById(input)),
      ),
    ),

    removeAdminById: asyncHandler(
      verifyAuthRole(["SUPER_ADMIN"])(
        verifyAccessToken(async (_parent, { input }) => adminServices.removeAdminById(input)),
      ),
    ),
  },
};
