import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

import { addressTypeDefs, addressResolvers } from './address/index.js';
import { adminTypeDefs, adminResolvers } from './admin/index.js';
import { userTypeDefs, userResolvers } from './user/index.js';
import { authTypeDefs, authResolvers } from './auth/index.js';
import { emailTypeDefs, emailResolvers } from './email/index.js';
import { inquiryTypeDefs, inquiryResolvers } from './inquiry/index.js';
import {
  newsletterSubscriberTypeDefs,
  newsletterSubscriberResolvers
} from './newsletter-subscriber/index.js';
import { orderTypeDefs, orderResolvers } from './order/index.js';
import { categoryTypeDefs, categoryResolvers } from './category/index.js';
import {
  subcategoryTypeDefs,
  subcategoryResolvers
} from './subcategory/index.js';
import { productTypeDefs, productResolvers } from './product/index.js';
import { commonTypeDefs } from './common.typeDef.js';

export const typeDefs = mergeTypeDefs([
  addressTypeDefs,
  adminTypeDefs,
  authTypeDefs,
  categoryTypeDefs,
  emailTypeDefs,
  inquiryTypeDefs,
  newsletterSubscriberTypeDefs,
  orderTypeDefs,
  subcategoryTypeDefs,
  productTypeDefs,
  userTypeDefs,
  commonTypeDefs
]);

export const resolvers = mergeResolvers([
  addressResolvers,
  adminResolvers,
  authResolvers,
  categoryResolvers,
  emailResolvers,
  inquiryResolvers,
  newsletterSubscriberResolvers,
  orderResolvers,
  subcategoryResolvers,
  productResolvers,
  userResolvers
]);
