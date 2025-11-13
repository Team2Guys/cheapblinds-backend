import { adminServices } from "./admin.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { asyncHandler } = commonUtils;
const { verifyAccessToken, verifyAuthRole } = verifications;

export const adminResolvers = {
  Query: {
    getAdmins: verifyAuthRole(["SUPER_ADMIN"])(
      asyncHandler(async (_parent, { input }) => adminServices.getAdmins(input)),
    ),

    getAdminById: verifyAuthRole(["SUPER_ADMIN"])(
      asyncHandler(async (_parent, { input }) => adminServices.getAdminById(input)),
    ),
  },

  Mutation: {
    superAdminLogin: asyncHandler(async (_parent, { input }) =>
      adminServices.superAdminLogin(input),
    ),

    adminLogin: asyncHandler(async (_parent, { input }) => adminServices.adminLogin(input)),

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
