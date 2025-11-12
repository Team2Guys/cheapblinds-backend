import { GraphQLJSON } from "graphql-type-json";
import { productServices } from "./product.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { asyncHandler } = commonUtils;
const { verifyAccessToken, verifyAuthRole } = verifications;

export const productResolvers = {
  JSON: GraphQLJSON,

  Query: {
    getProducts: asyncHandler(async () => productServices.getProducts()),

    getProductById: asyncHandler(async (_parent, { input }) =>
      productServices.getProductById(input),
    ),
  },

  Mutation: {
    createProduct: asyncHandler(
      verifyAccessToken(
        verifyAuthRole(["ADMIN"])(async (_parent, { input }) =>
          productServices.createProduct(input),
        ),
      ),
    ),

    updateProductById: asyncHandler(
      verifyAccessToken(
        verifyAuthRole(["ADMIN"])(async (_parent, { input }) =>
          productServices.updateProductById(input),
        ),
      ),
    ),

    removeProductById: asyncHandler(
      verifyAccessToken(
        verifyAuthRole(["ADMIN"])(async (_parent, { input }) =>
          productServices.removeProductById(input),
        ),
      ),
    ),
  },
};
