import { productServices } from './product.service.js';
import { verificationUtils, commonUtils } from '#lib/index.js';
import {
  createProductSchema,
  updateProductSchema,
  getProductByPathSchema
} from './product.validation.js';
import { validate } from '#lib/validation.lib.js';

const { handlePromise } = commonUtils;
const { verifyAccess, verifyRole } = verificationUtils;

export const productResolvers = {
  Query: {
    productList: handlePromise(() => productServices.getProductList()),

    productById: handlePromise((_parent, { id }) =>
      productServices.getProductById(id)
    ),

    productByPath: handlePromise((_parent, { input }) => {
      const validated = validate(getProductByPathSchema, input);
      return productServices.getProductByPath(validated);
    })
  },

  Mutation: {
    createProduct: handlePromise(
      verifyAccess(
        verifyRole(['ADMIN', 'SUPER_ADMIN'])((_parent, { input }) => {
          const validated = validate(createProductSchema, input);
          return productServices.createProduct(validated);
        })
      )
    ),

    updateProductById: handlePromise(
      verifyAccess(
        verifyRole(['ADMIN', 'SUPER_ADMIN'])((_parent, { id, input }) => {
          const validated = validate(updateProductSchema, { id, ...input });
          return productServices.updateProductById(id, validated);
        })
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
