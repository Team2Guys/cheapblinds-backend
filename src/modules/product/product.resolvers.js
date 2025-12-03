import { productServices } from "./product.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handleAsync } = commonUtils;
const { verifyAccess, verifyRole } = verifications;

export const productResolvers = {
  Query: {
    getProductList: handleAsync(() => productServices.getProductList()),

    getProductById: handleAsync((_parent, { id }) => productServices.getProductById(id)),

    getProductBySlugs: handleAsync((_parent, { input }) =>
      productServices.getProductBySlugs(input),
    ),
  },

  Mutation: {
    createProduct: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])((_parent, { input }) =>
          productServices.createProduct(input),
        ),
      ),
    ),

    updateProductById: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])((_parent, { id, input }) =>
          productServices.updateProductById(id, input),
        ),
      ),
    ),

    removeProductById: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])((_parent, { id }) =>
          productServices.removeProductById(id),
        ),
      ),
    ),
  },
};
