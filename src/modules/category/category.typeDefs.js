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
    breadCrumb: String
    thumbnailUrl: String
    lastEditedBy: String
    seoSchema: String
    status: ContentStatus
  }

  input GetCategoryByIdInput {
    id: ID!
  }

  input GetCategoryByCustomUrlInput {
    customUrl: String!
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
    breadCrumb: String
    thumbnailUrl: String
    lastEditedBy: String
    seoSchema: String
    status: ContentStatus
  }

  input RemoveCategoryByIdInput {
    id: ID!
  }

  type Query {
    getCategoryList: [Category!]!
    getCategoryById(input: GetCategoryByIdInput!): Category!
    getCategoryByCustomUrl(input: GetCategoryByCustomUrlInput!): Category!
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): GenericResponse!
    updateCategoryById(input: UpdateCategoryByIdInput!): GenericResponse!
    removeCategoryById(input: RemoveCategoryByIdInput!): GenericResponse!
  }
`;
