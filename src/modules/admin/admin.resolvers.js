import { adminServices } from "./admin.services.js";
import { verificationUtils, commonUtils } from "#utils/index.js";

const { handlePromise } = commonUtils;
const { verifyAccess, verifyRole } = verificationUtils;

export const adminResolvers = {
  Query: {
    adminList: handlePromise(
      verifyRole(["ADMIN", "SUPER_ADMIN"])(verifyAccess(() => adminServices.getAdminList())),
    ),

    adminById: handlePromise(
      verifyRole(["ADMIN", "SUPER_ADMIN"])(
        verifyAccess((_parent, { id }) => adminServices.getAdminById(id)),
      ),
    ),
  },

  Mutation: {
    createAdmin: handlePromise(
      verifyRole(["ADMIN", "SUPER_ADMIN"])(
        verifyAccess((_parent, { input }) => adminServices.createAdmin(input)),
      ),
    ),

    updateAdminById: handlePromise(
      verifyRole(["ADMIN", "SUPER_ADMIN"])(
        verifyAccess((_parent, { id, input }) => adminServices.updateAdminById(id, input)),
      ),
    ),

    removeAdminById: handlePromise(
      verifyRole(["ADMIN", "SUPER_ADMIN"])(
        verifyAccess((_parent, { id }) => adminServices.removeAdminById(id)),
      ),
    ),
  },
};
