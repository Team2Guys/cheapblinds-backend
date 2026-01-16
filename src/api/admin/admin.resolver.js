import { adminServices } from './admin.service.js';
import { verificationUtils, commonUtils } from '#lib/index.js';
import { createAdminSchema, updateAdminSchema } from './admin.validation.js';
import { validate } from '#lib/validation.lib.js';

const { handlePromise } = commonUtils;
const { verifyAccess, verifyRole } = verificationUtils;

export const adminResolvers = {
  Query: {
    adminList: handlePromise(
      verifyRole(['ADMIN', 'SUPER_ADMIN'])(
        verifyAccess(() => adminServices.getAdminList())
      )
    ),

    adminById: handlePromise(
      verifyRole(['ADMIN', 'SUPER_ADMIN'])(
        verifyAccess((_parent, { id }) => adminServices.getAdminById(id))
      )
    )
  },

  Mutation: {
    createAdmin: handlePromise(
      verifyRole(['ADMIN', 'SUPER_ADMIN'])(
        verifyAccess((_parent, { input }) => {
          const validated = validate(createAdminSchema, input);
          return adminServices.createAdmin(validated);
        })
      )
    ),

    updateAdminById: handlePromise(
      verifyRole(['ADMIN', 'SUPER_ADMIN'])(
        verifyAccess((_parent, { id, input }) => {
          const validated = validate(updateAdminSchema, input);
          return adminServices.updateAdminById(id, validated);
        })
      )
    ),

    removeAdminById: handlePromise(
      verifyRole(['ADMIN', 'SUPER_ADMIN'])(
        verifyAccess((_parent, { id }) => adminServices.removeAdminById(id))
      )
    )
  }
};
