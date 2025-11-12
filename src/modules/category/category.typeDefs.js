import { gql } from "graphql-tag";

export const categoryTypeDefs = gql`
  input CreateCategoryInput {
    name: String!
    description: String
    shortDescription: String
    customUrl: String
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    thumbnailUrl: String
    thumbnailPublicId: String
    thumbnailText: String
  }

  input GetCategoryByIdInput {
    id: String!
  }

  input UpdateCategoryByIdInput {
    id: String!
    name: String
    description: String
    shortDescription: String
    customUrl: String
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    thumbnailUrl: String
    thumbnailPublicId: String
    thumbnailText: String
  }

  input RemoveCategoryByIdInput {
    id: String!
  }

  type Category {
    id: ID!
    name: String!
    description: String
    shortDescription: String
    customUrl: String
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    thumbnailUrl: String
    thumbnailPublicId: String
    thumbnailText: String
    createdAt: String!
    updatedAt: String!
  }

  type CategoriesResponse {
    status: String!
    message: String!
    data: [Category!]!
  }

  type CategoryResponse {
    status: String!
    message: String!
    data: Category!
  }

  type GenericResponse {
    status: String!
    message: String!
  }

  type Query {
    getCategories: CategoriesResponse!
    getCategoryById(input: GetCategoryByIdInput!): CategoryResponse!
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): CategoryResponse!
    updateCategoryById(input: UpdateCategoryByIdInput!): CategoryResponse!
    removeCategoryById(input: RemoveCategoryByIdInput!): GenericResponse!
  }
`;
