import { productServices } from "./product.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handlePromise } = commonUtils;
const { verifyAccess, verifyRole } = verifications;

export const productResolvers = {
  Query: {
    getProductList: handlePromise(() => productServices.getProductList()),

    getProductById: handlePromise((_parent, { id }) => productServices.getProductById(id)),

    getProductBySlugs: handlePromise((_parent, { input }) =>
      productServices.getProductBySlugs(input),
    ),
  },

  Mutation: {
    createProduct: handlePromise(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])((_parent, { input }) =>
          productServices.createProduct(input),
        ),
      ),
    ),

    updateProductById: handlePromise(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])((_parent, { id, input }) =>
          productServices.updateProductById(id, input),
        ),
      ),
    ),

    removeProductById: handlePromise(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])((_parent, { id }) =>
          productServices.removeProductById(id),
        ),
      ),
    ),
  },
};
