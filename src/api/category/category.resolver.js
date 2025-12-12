import { categoryServices } from './category.service.js';
import { verificationUtils, commonUtils } from '#lib/index.js';

const { handlePromise } = commonUtils;
const { verifyAccess, verifyRole } = verificationUtils;

export const categoryResolvers = {
  Query: {
    categoryList: handlePromise(() => categoryServices.getCategoryList()),

    categoryById: handlePromise((_parent, { id }) =>
      categoryServices.getCategoryById(id)
    ),

    categoryBySlug: handlePromise((_parent, { input }) =>
      categoryServices.getCategoryBySlug(input)
    )
  },

  Mutation: {
    createCategory: handlePromise(
      verifyAccess(
        verifyRole(['ADMIN', 'SUPER_ADMIN'])((_parent, { input }) =>
          categoryServices.createCategory(input)
        )
      )
    ),

    updateCategoryById: handlePromise(
      verifyAccess(
        verifyRole(['ADMIN', 'SUPER_ADMIN'])((_parent, { id, input }) =>
          categoryServices.updateCategoryById(id, input)
        )
      )
    ),

    removeCategoryById: handlePromise(
      verifyAccess(
        verifyRole(['ADMIN', 'SUPER_ADMIN'])((_parent, { id }) =>
          categoryServices.removeCategoryById(id)
        )
      )
    )
  }
};
