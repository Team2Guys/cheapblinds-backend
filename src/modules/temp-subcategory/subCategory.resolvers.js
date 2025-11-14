import { subcategoryServices } from "./subcategory.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { asyncHandler } = commonUtils;
const { verifyAccessToken, verifyAuthRole } = verifications;

export const subcategoryResolvers = {
  Query: {
    getAllSubcategories: asyncHandler(async () => subcategoryServices.getAllSubCategories()),

    getSubcategoryById: asyncHandler(async (_parent, { input }) =>
      subcategoryServices.getSubcategoryById(input),
    ),
  },

  Mutation: {
    createSubcategory: asyncHandler(
      verifyAccessToken(
        verifyAuthRole(["ADMIN, SUPER_ADMIN"])(async (_parent, { input }) =>
          subcategoryServices.createSubcategory(input),
        ),
      ),
    ),

    updateSubcategoryById: asyncHandler(
      verifyAccessToken(
        verifyAuthRole(["ADMIN, SUPER_ADMIN"])(async (_parent, { input }) =>
          subcategoryServices.updateSubcategoryById(input),
        ),
      ),
    ),

    removeSubcategoryById: asyncHandler(
      verifyAccessToken(
        verifyAuthRole(["ADMIN, SUPER_ADMIN"])(async (_parent, { input }) =>
          subcategoryServices.removeSubcategoryById(input),
        ),
      ),
    ),
  },
};
