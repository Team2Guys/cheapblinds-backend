import { userServices } from "./user.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handleAsync } = commonUtils;
const { verifyAccess } = verifications;

export const userResolvers = {
  Query: {
    getAllUsers: handleAsync(async () => userServices.getAllUsers()),

    getUserById: handleAsync(async (_parent, { input }) => userServices.getUserById(input)),
  },

  Mutation: {
    updateUserById: handleAsync(
      verifyAccess(async (_parent, { input }) => userServices.updateUserById(input)),
    ),

    removeUserById: handleAsync(
      verifyAccess(async (_parent, { input }) => userServices.removeUserById(input)),
    ),
  },
};
