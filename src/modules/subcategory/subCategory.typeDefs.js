import { gql } from "graphql-tag";

export const subcategoryTypeDefs = gql`
  input CreateSubcategoryInput {
    name: String!
    description: String!
    shortDescription: String!
    customUrl: String!
    metaTitle: String!
    metaDescription: String!
    canonicalTag: String!
    breadCrumb: String!
    posterImageUrl: String!
    lastEditedBy: String!
    seoSchema: String!
    status: ContentStatus!
    categoryId: ID!
  }

  input UpdateSubcategoryByIdInput {
    id: ID!
    name: String
    description: String
    shortDescription: String
    customUrl: String
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    breadCrumb: String
    posterImageUrl: String
    lastEditedBy: String
    seoSchema: String
    status: ContentStatus
    categoryId: ID
  }

  input GetSubcategoryByUrlsInput {
    subcategoryCustomUrl: String!
    categoryCustomUrl: String!
  }

  type Query {
    getSubcategoryList: [Subcategory!]!
    getSubcategoryById(id: ID!): Subcategory!
    getSubcategoryByUrls(input: GetSubcategoryByUrlsInput!): Subcategory!
  }

  type Mutation {
    createSubcategory(input: CreateSubcategoryInput!): Subcategory!
    updateSubcategoryById(id: ID!, input: UpdateSubcategoryByIdInput!): Subcategory!
    removeSubcategoryById(id: ID!): GenericResponse!
  }
`;
