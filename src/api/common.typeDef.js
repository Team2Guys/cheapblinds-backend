import { gql } from 'graphql-tag';

export const commonTypeDefs = gql`
  scalar JSON
  scalar DateTime

  enum Role {
    USER
    ADMIN
    SUPER_ADMIN
  }

  enum InquiryType {
    EMAIL
    PHONE
    WHATSAPP
    OTHER
  }

  enum Permissions {
    ADD_PRODUCTS
    EDIT_PRODUCTS
    DELETE_PRODUCTS
    ADD_CATEGORY
    DELETE_CATEGORY
    EDIT_CATEGORY
    CHECK_PROFIT
    CHECK_REVENUE
    CHECK_VISITORS
    VIEW_USERS
    VIEW_SALES
    VIEW_ADMINS
    VIEW_TOTAL_PRODUCTS
    VIEW_TOTAL_CATEGORIES
  }

  enum ContentStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }

  type GenericResponse {
    message: String!
  }

  type Admin {
    id: ID!
    name: String!
    email: String!
    permissions: [Permissions!]!
    role: Role!
    lastEditedBy: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
    isEmailVerified: Boolean!
    addresses: [JSON!]!
    defaultShippingAddressId: ID!
    defaultBillingAddressId: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Address {
    id: ID!
    userId: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    state: String!
    country: String!
    city: String!
    address: String!
    addressType: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Category {
    id: ID!
    name: String!
    description: String!
    shortDescription: String!
    slug: String!
    metaTitle: String!
    metaDescription: String!
    canonicalTag: String!
    breadcrumb: String!
    posterImageUrl: String!
    seoSchema: String!
    lastEditedBy: String!
    status: ContentStatus!
    products: [Product!]!
    subcategories: [Subcategory!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Subcategory {
    id: ID!
    categoryId: ID!
    name: String!
    description: String
    shortDescription: String
    slug: String
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    breadcrumb: String
    posterImageUrl: String
    seoSchema: String
    lastEditedBy: String!
    status: ContentStatus!
    category: Category
    products: [Product!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Product {
    id: ID!
    categoryId: ID!
    subcategoryId: ID!
    name: String!
    description: String
    shortDescription: String
    slug: String
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    breadcrumb: String
    posterImageUrl: String
    productImages: [String!]!
    seoSchema: String
    price: Float!
    discountPrice: Float
    motorPrice: Float
    width: Float
    height: Float
    stock: Int
    color: String
    pattern: String
    composition: String
    isMotorized: Boolean
    additionalInfo: String
    measuringGuide: String
    lastEditedBy: String!
    category: Category!
    subcategory: Subcategory!
    status: ContentStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Order {
    id: ID!
    userId: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    state: String!
    country: String!
    city: String!
    address: String!
    totalAmount: Float!
    shippingCost: Float!
    notes: String!
    items: [JSON!]!
    lastEditedBy: String!
    paymentStatus: String!
    orderStatus: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Inquiry {
    id: ID!
    name: String!
    email: String!
    phone: String!
    message: String!
    inquiryType: String!
    inquiryStatus: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type NewsletterSubscriber {
    id: ID!
    email: String!
    isActive: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
