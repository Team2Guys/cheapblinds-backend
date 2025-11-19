import { gql } from "graphql-tag";

export const commonTypeDefs = gql`
  type GenericResponse {
    status: String!
    message: String!
  }

  type SigninResponseData {
    id: ID!
    role: Role!
  }

  type SigninResponse {
    status: String!
    message: String!
    data: SigninResponseData!
  }

  input SigninInput {
    email: String!
    password: String!
    role: Role!
  }

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

  type Category {
    id: ID
    name: String
    description: String
    shortDescription: String
    customUrl: String!
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    breadCrumb: String
    thumbnailUrl: String
    lastEditedBy: String
    seoSchema: String
    subcategories: [Subcategory!]
    products: [Product!]
    status: ContentStatus
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Subcategory {
    id: ID
    categoryId: ID
    name: String
    description: String
    shortDescription: String
    customUrl: String
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    breadCrumb: String
    thumbnailUrl: String
    lastEditedBy: String
    seoSchema: String
    category: Category
    products: [Product!]
    status: ContentStatus
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Product {
    id: ID
    categoryId: ID
    subcategoryId: ID
    name: String
    description: String
    shortDescription: String
    customUrl: String
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    breadCrumb: String
    thumbnailUrl: String
    productImages: [String!]
    lastEditedBy: String
    seoSchema: String
    price: Int
    discountPrice: Int
    stock: Int
    additionalInfo: [JSON!]
    measuringGuide: [JSON!]
    category: Category
    subcategory: Subcategory
    status: ContentStatus
    createdAt: DateTime
    updatedAt: DateTime
  }

  scalar JSON
  scalar DateTime
`;
