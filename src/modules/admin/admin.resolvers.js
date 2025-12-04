import { adminServices } from "./admin.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handlePromise } = commonUtils;
const { verifyAccess, verifyRole } = verifications;

export const adminResolvers = {
  Query: {
    getAdminList: handlePromise(
      verifyRole(["ADMIN", "SUPER_ADMIN"])(verifyAccess(() => adminServices.getAdminList)),
    ),

    getAdminById: handlePromise(
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
