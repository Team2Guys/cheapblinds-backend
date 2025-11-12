import { subcategoryServices } from "./subcategory.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { asyncHandler } = commonUtils;
const { verifyAccessToken } = verifications;

export const subcategoryResolvers = {
  Query: {
    getSubCategories: asyncHandler(async () => subcategoryServices.getSubCategories()),

    getSubcategoryById: asyncHandler(async (_parent, { input }) =>
      subcategoryServices.getSubcategoryById(input),
    ),
  },

  Mutation: {
    createSubcategory: asyncHandler(
      verifyAccessToken(async (_parent, { input }) => subcategoryServices.createSubcategory(input)),
    ),

    updateSubcategoryById: asyncHandler(
      verifyAccessToken(async (_parent, { input }) =>
        subcategoryServices.updateSubcategoryById(input),
      ),
    ),

    removeSubcategoryById: asyncHandler(
      verifyAccessToken(async (_parent, { input }) =>
        subcategoryServices.removeSubcategoryById(input),
      ),
    ),
  },
};
