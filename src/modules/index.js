import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

import { userTypeDefs, userResolvers } from "./user/index.js";
import { authTypeDefs, authResolvers } from "./auth/index.js";
import { emailTypeDefs, emailResolvers } from "./email/index.js";
import { categoryTypeDefs, categoryResolvers } from "./category/index.js";
import { subcategoryTypeDefs, subcategoryResolvers } from "./subcategory/index.js";
import { productTypeDefs, productResolvers } from "./product/index.js";
import { commonTypeDefs } from "./common.typeDefs.js";

export const typeDefs = mergeTypeDefs([
  authTypeDefs,
  categoryTypeDefs,
  emailTypeDefs,
  subcategoryTypeDefs,
  productTypeDefs,
  userTypeDefs,
  commonTypeDefs,
]);

export const resolvers = mergeResolvers([
  authResolvers,
  categoryResolvers,
  emailResolvers,
  subcategoryResolvers,
  productResolvers,
  userResolvers,
]);

export { authRoutes } from "./auth/index.js";
export { adminRoutes } from "./admin/index.js";
export { categoryRoutes } from "./category/index.js";
export { subcategoryRoutes } from "./subcategory/index.js";
export { productRoutes } from "./product/index.js";
