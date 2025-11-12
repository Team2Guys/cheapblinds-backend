import { categoryServices } from "./category.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { asyncHandler } = commonUtils;
const { verifyAccessToken, verifyAuthRole } = verifications;

export const categoryResolvers = {
  Query: {
    getCategories: asyncHandler(async () => categoryServices.getCategories()),

    getCategoryById: asyncHandler(async (_parent, { input }) =>
      categoryServices.getCategoryById(input),
    ),
  },

  Mutation: {
    createCategory: asyncHandler(
      verifyAccessToken(
        verifyAuthRole(["ADMIN"])(async (_parent, { input }) =>
          categoryServices.createCategory(input),
        ),
      ),
    ),

    updateCategoryById: asyncHandler(
      verifyAccessToken(
        verifyAuthRole(["ADMIN"])(async (_parent, { input }) =>
          categoryServices.updateCategoryById(input),
        ),
      ),
    ),

    removeCategoryById: asyncHandler(
      verifyAccessToken(
        verifyAuthRole(["ADMIN"])(async (_parent, { input }) =>
          categoryServices.removeCategoryById(input),
        ),
      ),
    ),
  },
};
