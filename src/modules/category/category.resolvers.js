import { categoryServices } from "./category.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handleAsync } = commonUtils;
const { verifyAccess, verifyRole } = verifications;

export const categoryResolvers = {
  Query: {
    getAllCategories: handleAsync(async () => categoryServices.getAllCategories()),

    getCategoryById: handleAsync(async (_parent, { input }) =>
      categoryServices.getCategoryById(input),
    ),
  },

  Mutation: {
    createCategory: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN, SUPER_ADMIN"])(async (_parent, { input }) =>
          categoryServices.createCategory(input),
        ),
      ),
    ),

    updateCategoryById: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN, SUPER_ADMIN"])(async (_parent, { input }) =>
          categoryServices.updateCategoryById(input),
        ),
      ),
    ),

    removeCategoryById: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN, SUPER_ADMIN"])(async (_parent, { input }) =>
          categoryServices.removeCategoryById(input),
        ),
      ),
    ),
  },
};
