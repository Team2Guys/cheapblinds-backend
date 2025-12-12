import { userServices } from './user.service.js';
import { verificationUtils, commonUtils } from '#lib/index.js';

const { handlePromise } = commonUtils;
const { verifyAccess } = verificationUtils;

export const userResolvers = {
  Query: {
    userList: handlePromise(() => userServices.getUserList()),

    userById: handlePromise((_parent, { id }) => userServices.getUserById(id))
  },

  Mutation: {
    updateUserById: handlePromise(
      verifyAccess((_parent, { id, input }) =>
        userServices.updateUserById(id, input)
      )
    ),

    removeUserById: handlePromise(
      verifyAccess((_parent, { id }) => userServices.removeUserById(id))
    )
  }
};
