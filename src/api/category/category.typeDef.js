import { gql } from 'graphql-tag';

export const categoryTypeDefs = gql`
  input CreateCategoryInput {
    name: String!
    shortDescription: String!
    description: String!
    breadcrumb: String!
    path: String!
    posterImageUrl: String!
    metaTitle: String!
    metaDescription: String!
    canonicalUrl: String!
    seoSchema: String!
    lastEditedBy: String!
    status: ContentStatus!
  }

  input UpdateCategoryByIdInput {
    name: String
    shortDescription: String
    description: String
    breadcrumb: String
    path: String
    posterImageUrl: String
    metaTitle: String
    metaDescription: String
    canonicalUrl: String
    seoSchema: String
    lastEditedBy: String
    status: ContentStatus
  }

  input GetCategoryByPathInput {
    path: String!
  }

  type Query {
    categoryList: [Category!]!
    categoryById(id: ID!): Category
    categoryByPath(input: GetCategoryByPathInput!): Category
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category
    updateCategoryById(id: ID!, input: UpdateCategoryByIdInput!): Category
    removeCategoryById(id: ID!): Category
  }
`;
