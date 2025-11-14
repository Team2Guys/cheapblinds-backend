import { GraphQLJSON } from "graphql-type-json";
import { productServices } from "./product.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handleAsync } = commonUtils;
const { verifyAccess, verifyRole } = verifications;

export const productResolvers = {
  JSON: GraphQLJSON,

  Query: {
    getAllProducts: handleAsync(async () => productServices.getAllProducts()),

    getProductById: handleAsync(async (_parent, { input }) =>
      productServices.getProductById(input),
    ),
  },

  Mutation: {
    createProduct: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN, SUPER_ADMIN"])(async (_parent, { input }) =>
          productServices.createProduct(input),
        ),
      ),
    ),

    updateProductById: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN, SUPER_ADMIN"])(async (_parent, { input }) =>
          productServices.updateProductById(input),
        ),
      ),
    ),

    removeProductById: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN, SUPER_ADMIN"])(async (_parent, { input }) =>
          productServices.removeProductById(input),
        ),
      ),
    ),
  },
};
