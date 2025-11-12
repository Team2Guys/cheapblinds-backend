import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

import { adminTypeDefs, adminResolvers } from "./admin/index.js";
import { otpTypeDefs, otpResolvers } from "./otp/index.js";
import { userTypeDefs, userResolvers } from "./user/index.js";
import { authTypeDefs, authResolvers } from "./auth/index.js";
import { emailTypeDefs, emailResolvers } from "./email/index.js";
import { categoryTypeDefs, categoryResolvers } from "./category/index.js";
import { subcategoryTypeDefs, subcategoryResolvers } from "./subcategory/index.js";
import { productTypeDefs, productResolvers } from "./product/index.js";

export const typeDefs = mergeTypeDefs([
  adminTypeDefs,
  authTypeDefs,
  categoryTypeDefs,
  subcategoryTypeDefs,
  emailTypeDefs,
  otpTypeDefs,
  userTypeDefs,
  productTypeDefs,
]);

export const resolvers = mergeResolvers([
  adminResolvers,
  authResolvers,
  categoryResolvers,
  subcategoryResolvers,
  emailResolvers,
  otpResolvers,
  userResolvers,
  productResolvers,
]);
