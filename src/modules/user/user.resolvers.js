import { userServices } from "./user.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handlePromise } = commonUtils;
const { verifyAccess } = verifications;

export const userResolvers = {
  Query: {
    getUserList: handlePromise(userServices.getUserList),

    getUserById: handlePromise((_parent, { id }) => userServices.getUserById(id)),
  },

  Mutation: {
    updateUserById: handlePromise(
      verifyAccess((_parent, { id, input }) => userServices.updateUserById(id, input)),
    ),

    removeUserById: handlePromise(
      verifyAccess((_parent, { id }) => userServices.removeUserById(id)),
    ),
  },
};
