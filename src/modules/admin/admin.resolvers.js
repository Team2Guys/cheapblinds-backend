import { adminServices } from "./admin.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handleAsync } = commonUtils;
const { verifyAccess, verifyRole } = verifications;

export const adminResolvers = {
  Query: {
    getAdmins: verifyRole(["SUPER_ADMIN"])(
      verifyAccess(handleAsync(async () => adminServices.getAdmins())),
    ),

    getAdminById: verifyRole(["SUPER_ADMIN"])(
      verifyAccess(handleAsync(async (_parent, { input }) => adminServices.getAdminById(input))),
    ),
  },

  Mutation: {
    signinSuperAdmin: handleAsync(async (_parent, { input }) =>
      adminServices.signinSuperAdmin(input),
    ),

    signinAdmin: handleAsync(async (_parent, { input }) => adminServices.signinAdmin(input)),

    createAdmin: handleAsync(
      verifyRole(["SUPER_ADMIN"])(
        verifyAccess(async (_parent, { input }) => adminServices.createAdmin(input)),
      ),
    ),

    updateAdminById: handleAsync(
      verifyRole(["SUPER_ADMIN"])(
        verifyAccess(async (_parent, { input }) => adminServices.updateAdminById(input)),
      ),
    ),

    removeAdminById: handleAsync(
      verifyRole(["SUPER_ADMIN"])(
        verifyAccess(async (_parent, { input }) => adminServices.removeAdminById(input)),
      ),
    ),
  },
};
