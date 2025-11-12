import { gql } from "graphql-tag";

export const subCategoryTypeDefs = gql`
  input CreateSubCategoryInput {
    name: String!
    categoryId: String!
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

  input GetSubCategoryByIdInput {
    id: String!
  }

  input UpdateSubCategoryByIdInput {
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

  input RemoveSubCategoryByIdInput {
    id: String!
  }

  type SubCategory {
    id: ID!
    name: String!
    categoryId: String!
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

  type SubCategoriesResponse {
    status: String!
    message: String!
    data: [SubCategory!]!
  }

  type SubCategoryResponse {
    status: String!
    message: String!
    data: SubCategory!
  }

  type GenericResponse {
    status: String!
    message: String!
  }

  type Query {
    getSubCategories: SubCategoriesResponse!
    getSubCategoryById(input: GetSubCategoryByIdInput!): SubCategoryResponse!
  }

  type Mutation {
    createSubCategory(input: CreateSubCategoryInput!): SubCategoryResponse!
    updateSubCategoryById(input: UpdateSubCategoryByIdInput!): SubCategoryResponse!
    removeSubCategoryById(input: RemoveSubCategoryByIdInput!): GenericResponse!
  }
`;
