import { adminServices } from "./admin.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handleAsync } = commonUtils;
const { verifyAccess, verifyRole } = verifications.graphql;

export const adminResolvers = {
  Query: {
    getAdminList: verifyRole(["SUPER_ADMIN"])(
      verifyAccess(handleAsync(async () => adminServices.getAdminList())),
    ),

    getAdminById: verifyRole(["SUPER_ADMIN"])(
      verifyAccess(handleAsync(async (_parent, { input }) => adminServices.getAdminById(input))),
    ),
  },

  Mutation: {
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
