import { gql } from "graphql-tag";

export const commonTypeDefs = gql`
  scalar JSON
  scalar DateTime

  enum Role {
    USER
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

  type Admin {
    id: ID!
    name: String!
    email: String!
    password: String!
    permissions: [String!]!
    role: Role!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    isEmailVerified: Boolean!
    isNewsletterSubscribed: Boolean!
    role: Role!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Category {
    id: ID!
    name: String!
    description: String!
    shortDescription: String!
    customUrl: String!
    metaTitle: String!
    metaDescription: String!
    canonicalTag: String!
    breadCrumb: String!
    thumbnailUrl: String!
    lastEditedBy: String!
    seoSchema: String!
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
    description: String!
    shortDescription: String!
    customUrl: String!
    metaTitle: String!
    metaDescription: String!
    canonicalTag: String!
    breadCrumb: String!
    thumbnailUrl: String!
    lastEditedBy: String!
    seoSchema: String!
    status: ContentStatus!
    category: Category!
    products: [Product!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Product {
    id: ID!
    categoryId: ID!
    subcategoryId: ID!
    name: String!
    description: String!
    shortDescription: String!
    customUrl: String!
    metaTitle: String!
    metaDescription: String!
    canonicalTag: String!
    breadCrumb: String!
    thumbnailUrl: String!
    productImages: [String!]!
    lastEditedBy: String!
    seoSchema: String!
    price: Float!
    discountPrice: Float!
    stock: Int!
    additionalInfo: [JSON!]!
    measuringGuide: [JSON!]!
    category: Category!
    subcategory: Subcategory!
    status: ContentStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
