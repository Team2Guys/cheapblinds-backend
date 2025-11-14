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
    id: ID!
  }

  input UpdateCategoryByIdInput {
    id: ID!
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
    id: ID!
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
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type CategoryListResponse {
    status: String!
    message: String!
    data: [Category!]!
  }

  type CategoryResponse {
    status: String!
    message: String!
    data: Category!
  }

  type Query {
    getAllCategories: CategoryListResponse!
    getCategoryById(input: GetCategoryByIdInput!): CategoryResponse!
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): CategoryResponse!
    updateCategoryById(input: UpdateCategoryByIdInput!): CategoryResponse!
    removeCategoryById(input: RemoveCategoryByIdInput!): GenericResponse!
  }
`;
