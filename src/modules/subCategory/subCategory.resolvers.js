import { subCategoryServices } from "./subCategory.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { asyncHandler } = commonUtils;
const { verifyAccessToken, verifyAuthRole } = verifications;

export const subCategoryResolvers = {
  Query: {
    getSubCategories: asyncHandler(async () => subCategoryServices.getSubCategories()),

    getSubCategoryById: asyncHandler(async (_parent, { input }) =>
      subCategoryServices.getSubCategoryById(input),
    ),
  },

  Mutation: {
    createSubCategory: asyncHandler(
      verifyAccessToken(
        verifyAuthRole(["ADMIN"])(async (_parent, { input }) =>
          subCategoryServices.createSubCategory(input),
        ),
      ),
    ),

    updateSubCategoryById: asyncHandler(
      verifyAccessToken(
        verifyAuthRole(["ADMIN"])(async (_parent, { input }) =>
          subCategoryServices.updateSubCategoryById(input),
        ),
      ),
    ),

    removeSubCategoryById: asyncHandler(
      verifyAccessToken(
        verifyAuthRole(["ADMIN"])(async (_parent, { input }) =>
          subCategoryServices.removeSubCategoryById(input),
        ),
      ),
    ),
  },
};
