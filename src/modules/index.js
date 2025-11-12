import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

import { otpTypeDefs, otpResolvers } from "./otp/index.js";
import { userTypeDefs, userResolvers } from "./user/index.js";
import { authTypeDefs, authResolvers } from "./auth/index.js";
import { emailTypeDefs, emailResolvers } from "./email/index.js";
import { categoryTypeDefs, categoryResolvers } from "./category/index.js";
import { subCategoryTypeDefs, subCategoryResolvers } from "./subCategory/index.js";
import { productTypeDefs, productResolvers } from "./product/index.js";

export const typeDefs = mergeTypeDefs([
  authTypeDefs,
  categoryTypeDefs,
  subCategoryTypeDefs,
  emailTypeDefs,
  otpTypeDefs,
  userTypeDefs,
  productTypeDefs,
]);

export const resolvers = mergeResolvers([
  authResolvers,
  categoryResolvers,
  subCategoryResolvers,
  emailResolvers,
  otpResolvers,
  userResolvers,
  productResolvers,
]);
