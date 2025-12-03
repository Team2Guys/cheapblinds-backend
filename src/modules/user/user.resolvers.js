import { userServices } from "./user.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handleAsync } = commonUtils;
const { verifyAccess } = verifications;

export const userResolvers = {
  Query: {
    getUserList: handleAsync(() => userServices.getUserList()),

    getUserById: handleAsync((_parent, { id }) => userServices.getUserById(id)),
  },

  Mutation: {
    updateUserById: handleAsync(
      verifyAccess((_parent, { id, input }) => userServices.updateUserById(id, input)),
    ),

    removeUserById: handleAsync(verifyAccess((_parent, { id }) => userServices.removeUserById(id))),
  },
};
