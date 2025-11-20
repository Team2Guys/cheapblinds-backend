import { adminServices } from "./admin.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handleAsync } = commonUtils;
const { verifyAccess } = verifications;

export const adminResolvers = {
  Query: {
    getAdminList: handleAsync(async () => adminServices.getAdminList()),

    getAdminById: handleAsync(async (_parent, { input }) => adminServices.getAdminById(input)),
  },

  Mutation: {
    createAdmin: handleAsync(
      verifyAccess(async (_parent, { input }) => adminServices.createAdmin(input)),
    ),

    updateAdminById: handleAsync(
      verifyAccess(async (_parent, { input }) => adminServices.updateAdminById(input)),
    ),

    removeAdminById: handleAsync(
      verifyAccess(async (_parent, { input }) => adminServices.removeAdminById(input)),
    ),
  },
};
