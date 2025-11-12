import { userServices } from "./user.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { asyncHandler } = commonUtils;
const { verifyAccessToken } = verifications;

export const userResolvers = {
  Query: {
    getUsers: asyncHandler(async (_parent, { input }) => userServices.getUsers(input)),

    getUserById: asyncHandler(async (_parent, { input }) => userServices.getUserById(input)),
  },

  Mutation: {
    updateUserById: asyncHandler(
      verifyAccessToken(async (_parent, { input }) => userServices.updateUserById(input)),
    ),

    removeUserById: asyncHandler(
      verifyAccessToken(async (_parent, { input }) => userServices.removeUserById(input)),
    ),
  },
};
