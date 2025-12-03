import { adminServices } from "./admin.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handleAsync } = commonUtils;
const { verifyAccess, verifyRole } = verifications;

export const adminResolvers = {
  Query: {
    getAdminList: handleAsync(
      verifyRole(["ADMIN", "SUPER_ADMIN"])(verifyAccess(() => adminServices.getAdminList())),
    ),

    getAdminById: handleAsync(
      verifyRole(["ADMIN", "SUPER_ADMIN"])(
        verifyAccess((_parent, { id }) => adminServices.getAdminById(id)),
      ),
    ),
  },

  Mutation: {
    createAdmin: handleAsync(
      verifyRole(["ADMIN", "SUPER_ADMIN"])(
        verifyAccess((_parent, { input }) => adminServices.createAdmin(input)),
      ),
    ),

    updateAdminById: handleAsync(
      verifyRole(["ADMIN", "SUPER_ADMIN"])(
        verifyAccess((_parent, { id, input }) => adminServices.updateAdminById(id, input)),
      ),
    ),

    removeAdminById: handleAsync(
      verifyRole(["ADMIN", "SUPER_ADMIN"])(
        verifyAccess((_parent, { id }) => adminServices.removeAdminById(id)),
      ),
    ),
  },
};
