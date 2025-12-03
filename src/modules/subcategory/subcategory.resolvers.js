import { subcategoryServices } from "./subcategory.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handleAsync } = commonUtils;
const { verifyAccess, verifyRole } = verifications;

export const subcategoryResolvers = {
  Query: {
    getSubcategoryList: handleAsync(() => subcategoryServices.getSubcategoryList()),

    getSubcategoryById: handleAsync((_parent, { id }) =>
      subcategoryServices.getSubcategoryById(id),
    ),

    getSubcategoryBySlugs: handleAsync((_parent, { input }) =>
      subcategoryServices.getSubcategoryBySlugs(input),
    ),
  },

  Mutation: {
    createSubcategory: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])((_parent, { input }) =>
          subcategoryServices.createSubcategory(input),
        ),
      ),
    ),

    updateSubcategoryById: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])((_parent, { id, input }) =>
          subcategoryServices.updateSubcategoryById(id, input),
        ),
      ),
    ),

    removeSubcategoryById: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])((_parent, { id }) =>
          subcategoryServices.removeSubcategoryById(id),
        ),
      ),
    ),
  },
};
