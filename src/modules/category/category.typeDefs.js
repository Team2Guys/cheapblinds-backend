import { gql } from "graphql-tag";

export const categoryTypeDefs = gql`
  input CreateCategoryInput {
    name: String!
    description: String
    shortDescription: String
    customUrl: String!
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    breadCrumb: String
    thumbnailUrl: String
    thumbnailPublicId: String
    thumbnailText: String
    lastEditedBy: String
    seoSchema: String
    status: ContentStatus
  }

  input GetCategoryByIdInput {
    id: ID!
  }

  input UpdateCategoryByIdInput {
    id: ID!
    name: String!
    description: String
    shortDescription: String
    customUrl: String!
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    breadCrumb: String
    thumbnailUrl: String
    thumbnailPublicId: String
    thumbnailText: String
    lastEditedBy: String
    seoSchema: String
    status: ContentStatus
  }

  input RemoveCategoryByIdInput {
    id: ID!
  }

  type Category {
    id: ID!
    name: String!
    description: String
    shortDescription: String
    customUrl: String!
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    breadCrumb: String
    thumbnailUrl: String
    thumbnailPublicId: String
    thumbnailText: String
    lastEditedBy: String
    seoSchema: String
    status: ContentStatus
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
    getCategoryList: CategoryListResponse!
    getCategoryById(input: GetCategoryByIdInput!): CategoryResponse!
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): GenericResponse!
    updateCategoryById(input: UpdateCategoryByIdInput!): GenericResponse!
    removeCategoryById(input: RemoveCategoryByIdInput!): GenericResponse!
  }
`;
