import { categoryServices } from "./category.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { asyncHandler } = commonUtils;
const { verifyAccessToken, verifyAuthRole } = verifications;

export const categoryResolvers = {
  Query: {
    getAllCategories: asyncHandler(async () => categoryServices.getAllCategories()),

    getCategoryById: asyncHandler(async (_parent, { input }) =>
      categoryServices.getCategoryById(input),
    ),
  },

  Mutation: {
    createCategory: asyncHandler(
      verifyAccessToken(
        verifyAuthRole(["ADMIN, SUPER_ADMIN"])(async (_parent, { input }) =>
          categoryServices.createCategory(input),
        ),
      ),
    ),

    updateCategoryById: asyncHandler(
      verifyAccessToken(
        verifyAuthRole(["ADMIN, SUPER_ADMIN"])(async (_parent, { input }) =>
          categoryServices.updateCategoryById(input),
        ),
      ),
    ),

    removeCategoryById: asyncHandler(
      verifyAccessToken(
        verifyAuthRole(["ADMIN, SUPER_ADMIN"])(async (_parent, { input }) =>
          categoryServices.removeCategoryById(input),
        ),
      ),
    ),
  },
};
