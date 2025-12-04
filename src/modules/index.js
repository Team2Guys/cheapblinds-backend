import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

import { adminTypeDefs, adminResolvers } from "./admin/index.js";
import { userTypeDefs, userResolvers } from "./user/index.js";
import { authTypeDefs, authResolvers } from "./auth/index.js";
import { emailTypeDefs, emailResolvers } from "./email/index.js";
import { inquiryTypeDefs, inquiryResolvers } from "./inquiry/index.js";
import { orderTypeDefs, orderResolvers } from "./order/index.js";
import { categoryTypeDefs, categoryResolvers } from "./category/index.js";
import { subcategoryTypeDefs, subcategoryResolvers } from "./subcategory/index.js";
import { productTypeDefs, productResolvers } from "./product/index.js";
import { commonTypeDefs } from "./common.typeDefs.js";

export const typeDefs = mergeTypeDefs([
  adminTypeDefs,
  authTypeDefs,
  categoryTypeDefs,
  emailTypeDefs,
  inquiryTypeDefs,
  orderTypeDefs,
  subcategoryTypeDefs,
  productTypeDefs,
  userTypeDefs,
  commonTypeDefs,
]);

export const resolvers = mergeResolvers([
  adminResolvers,
  authResolvers,
  categoryResolvers,
  emailResolvers,
  inquiryResolvers,
  orderResolvers,
  subcategoryResolvers,
  productResolvers,
  userResolvers,
]);
