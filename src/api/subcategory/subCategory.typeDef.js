import { gql } from 'graphql-tag';

export const subcategoryTypeDefs = gql`
  input CreateSubcategoryInput {
    categoryId: ID!
    name: String!
    shortDescription: String!
    description: String!
    breadcrumb: String!
    oldPath: String
    newPath: String!
    metaTitle: String!
    metaDescription: String!
    canonicalUrl: String!
    posterImageUrl: String!
    lastEditedBy: String!
    seoSchema: String!
    status: ContentStatus!
  }

  input UpdateSubcategoryByIdInput {
    id: ID!
    name: String
    description: String
    shortDescription: String
    path: String
    metaTitle: String
    metaDescription: String
    canonicalUrl: String
    breadcrumb: String
    posterImageUrl: String
    lastEditedBy: String
    seoSchema: String
    status: ContentStatus
    categoryId: ID
  }

  input GetSubcategoryByPathsInput {
    subcategoryPath: String!
    categoryPath: String!
  }

  type Query {
    subcategoryList: [Subcategory!]!
    subcategoryById(id: ID!): Subcategory
    subcategoryByPaths(input: GetSubcategoryByPathsInput!): Subcategory
  }

  type Mutation {
    createSubcategory(input: CreateSubcategoryInput!): Subcategory
    updateSubcategoryById(
      id: ID!
      input: UpdateSubcategoryByIdInput!
    ): Subcategory
    removeSubcategoryById(id: ID!): Subcategory
  }
`;
