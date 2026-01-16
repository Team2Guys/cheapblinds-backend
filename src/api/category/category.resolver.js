import { categoryServices } from './category.service.js';
import { verificationUtils, commonUtils } from '#lib/index.js';
import {
  createCategorySchema,
  updateCategorySchema,
  getCategoryByPathSchema
} from './category.validation.js';
import { validate } from '#lib/validation.lib.js';

const { handlePromise } = commonUtils;
const { verifyAccess, verifyRole } = verificationUtils;

export const categoryResolvers = {
  Query: {
    categoryList: handlePromise(() => categoryServices.getCategoryList()),

    categoryById: handlePromise((_parent, { id }) =>
      categoryServices.getCategoryById(id)
    ),

    categoryByPath: handlePromise((_parent, { input }) => {
      const validated = validate(getCategoryByPathSchema, input);
      return categoryServices.getCategoryByPath(validated);
    })
  },

  Mutation: {
    createCategory: handlePromise(
      verifyAccess(
        verifyRole(['ADMIN', 'SUPER_ADMIN'])((_parent, { input }) => {
          const validated = validate(createCategorySchema, input);
          return categoryServices.createCategory(validated);
        })
      )
    ),

    updateCategoryById: handlePromise(
      verifyAccess(
        verifyRole(['ADMIN', 'SUPER_ADMIN'])((_parent, { id, input }) => {
          const validated = validate(updateCategorySchema, { id, ...input });
          return categoryServices.updateCategoryById(id, validated);
        })
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
