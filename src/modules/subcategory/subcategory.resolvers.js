import { subcategoryServices } from "./subcategory.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handlePromise } = commonUtils;
const { verifyAccess, verifyRole } = verifications;

export const subcategoryResolvers = {
  Query: {
    getSubcategoryList: handlePromise(() => subcategoryServices.getSubcategoryList),

    getSubcategoryById: handlePromise((_parent, { id }) =>
      subcategoryServices.getSubcategoryById(id),
    ),

    getSubcategoryBySlugs: handlePromise((_parent, { input }) =>
      subcategoryServices.getSubcategoryBySlugs(input),
    ),
  },

  Mutation: {
    createSubcategory: handlePromise(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])((_parent, { input }) =>
          subcategoryServices.createSubcategory(input),
        ),
      ),
    ),

    updateSubcategoryById: handlePromise(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])((_parent, { id, input }) =>
          subcategoryServices.updateSubcategoryById(id, input),
        ),
      ),
    ),

    removeSubcategoryById: handlePromise(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])((_parent, { id }) =>
          subcategoryServices.removeSubcategoryById(id),
        ),
      ),
    ),
  },
};
