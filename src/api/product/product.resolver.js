import { productServices } from './product.service.js';
import { verificationUtils, commonUtils } from '#lib/index.js';

const { handlePromise } = commonUtils;
const { verifyAccess, verifyRole } = verificationUtils;

export const productResolvers = {
  Query: {
    productList: handlePromise(() => productServices.getProductList()),

    productById: handlePromise((_parent, { id }) =>
      productServices.getProductById(id)
    ),

    productByPath: handlePromise((_parent, { input }) =>
      productServices.getProductByPath(input)
    )
  },

  Mutation: {
    createProduct: handlePromise(
      verifyAccess(
        verifyRole(['ADMIN', 'SUPER_ADMIN'])((_parent, { input }) =>
          productServices.createProduct(input)
        )
      )
    ),

    updateProductById: handlePromise(
      verifyAccess(
        verifyRole(['ADMIN', 'SUPER_ADMIN'])((_parent, { id, input }) =>
          productServices.updateProductById(id, input)
        )
      )
    ),

    removeProductById: handlePromise(
      verifyAccess(
        verifyRole(['ADMIN', 'SUPER_ADMIN'])((_parent, { id }) =>
          productServices.removeProductById(id)
        )
      )
    )
  }
};
