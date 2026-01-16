import { subcategoryServices } from './subcategory.service.js';
import { verificationUtils, commonUtils } from '#lib/index.js';
import {
  createSubcategorySchema,
  updateSubcategorySchema,
  getSubcategoryByPathSchema
} from './subcategory.validation.js';
import { validate } from '#lib/validation.lib.js';

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

    subcategoryByPath: handlePromise((_parent, { input }) => {
      const validated = validate(getSubcategoryByPathSchema, input);
      return subcategoryServices.getSubcategoryByPath(validated);
    })
  },

  Mutation: {
    createSubcategory: handlePromise(
      verifyAccess(
        verifyRole(['ADMIN', 'SUPER_ADMIN'])((_parent, { input }) => {
          const validated = validate(createSubcategorySchema, input);
          return subcategoryServices.createSubcategory(validated);
        })
      )
    ),

    updateSubcategoryById: handlePromise(
      verifyAccess(
        verifyRole(['ADMIN', 'SUPER_ADMIN'])((_parent, { id, input }) => {
          const validated = validate(updateSubcategorySchema, { id, ...input });
          return subcategoryServices.updateSubcategoryById(id, validated);
        })
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
