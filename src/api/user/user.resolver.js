import { userServices } from './user.service.js';
import { verificationUtils, commonUtils } from '#lib/index.js';
import { updateUserSchema } from './user.validation.js';
import { validate } from '#lib/validation.lib.js';

const { handlePromise } = commonUtils;
const { verifyAccess } = verificationUtils;

export const userResolvers = {
  Query: {
    userList: handlePromise(() => userServices.getUserList()),

    userById: handlePromise((_parent, { id }) => userServices.getUserById(id))
  },

  Mutation: {
    updateUserById: handlePromise(
      verifyAccess((_parent, { id, input }) => {
        const validated = validate(updateUserSchema, input);
        return userServices.updateUserById(id, validated);
      })
    ),

    removeUserById: handlePromise(
      verifyAccess((_parent, { id }) => userServices.removeUserById(id))
    )
  }
};
