import { subcategoryServices } from './subcategory.service.js';
import { verificationUtils, commonUtils } from '#lib/index.js';

const { handlePromise } = commonUtils;
const { verifyAccess, verifyRole } = verificationUtils;

export const subcategoryResolvers = {
  Query: {
    subcategoryList: handlePromise(() =>
      subcategoryServices.getSubcategoryList()
    ),

    subcategoryById: handlePromise((_parent, { id }) =>
      subcategoryServices.getSubcategoryById(id)
    ),

    subcategoryBySlugs: handlePromise((_parent, { input }) =>
      subcategoryServices.getSubcategoryBySlugs(input)
    )
  },

  Mutation: {
    createSubcategory: handlePromise(
      verifyAccess(
        verifyRole(['ADMIN', 'SUPER_ADMIN'])((_parent, { input }) =>
          subcategoryServices.createSubcategory(input)
        )
      )
    ),

    updateSubcategoryById: handlePromise(
      verifyAccess(
        verifyRole(['ADMIN', 'SUPER_ADMIN'])((_parent, { id, input }) =>
          subcategoryServices.updateSubcategoryById(id, input)
        )
      )
    ),

    removeSubcategoryById: handlePromise(
      verifyAccess(
        verifyRole(['ADMIN', 'SUPER_ADMIN'])((_parent, { id }) =>
          subcategoryServices.removeSubcategoryById(id)
        )
      )
    )
  }
};
