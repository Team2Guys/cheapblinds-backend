import { gql } from 'graphql-tag';

export const commonTypeDefs = gql`
  scalar JSON
  scalar DateTime

  enum AdminRole {
    ADMIN
    SUPER_ADMIN
  }

  enum ContentStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }

  type GenericResponse {
    message: String!
  }

  type User {
    id: ID!

    defaultShippingAddressId: ID
    defaultBillingAddressId: ID
    firstName: String!
    lastName: String!
    email: String!
    isEmailVerified: Boolean!

    createdAt: DateTime!
    updatedAt: DateTime!

    addresses: [JSON!]!
    orders: [JSON!]!
    defaultShippingAddress: Address
    defaultBillingAddress: Address
  }

  type Category {
    id: ID!

    name: String!
    shortDescription: String
    description: String
    breadcrumb: String
    oldPath: String
    newPath: String!
    posterImageUrl: String
    metaTitle: String
    metaDescription: String
    canonicalUrl: String
    seoSchema: String
    lastEditedBy: String!
    status: ContentStatus!

    createdAt: DateTime!
    updatedAt: DateTime!

    products: [Product!]
    subcategories: [Subcategory!]
  }

  type Subcategory {
    id: ID!

    categoryId: ID!
    name: String!
    shortDescription: String
    description: String
    breadcrumb: String
    oldPath: String
    newPath: String!
    posterImageUrl: String
    metaTitle: String
    metaDescription: String
    canonicalUrl: String
    seoSchema: String
    lastEditedBy: String!
    status: ContentStatus!

    createdAt: DateTime!
    updatedAt: DateTime!

    category: Category
    products: [Product!]
  }

  type Product {
    id: ID!

    categoryId: ID!
    subcategoryId: ID!
    fabricId: Int!
    blindTypeId: Int!
    sku: String!
    name: String!
    shortDescription: String
    description: String
    breadcrumb: String
    oldPath: String
    newPath: String!
    posterImageUrl: String
    productImages: [String!]!
    isMotorized: Boolean!
    additionalInfo: String
    measuringGuide: String
    material: String
    minDrop: Int!
    maxDrop: Int!
    minWidth: Int!
    maxWidth: Int!
    inStock: Int!
    color: String
    pattern: String
    price: Float!
    motorPrice: Float
    discountPrice: Float
    metaTitle: String
    metaDescription: String
    canonicalUrl: String
    seoSchema: String
    lastEditedBy: String!
    status: ContentStatus!

    createdAt: DateTime!
    updatedAt: DateTime!

    category: Category
    subcategory: Subcategory
  }
`;
