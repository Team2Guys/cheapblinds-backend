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
    thumbnailUrl: String!
    lastEditedBy: String!
    seoSchema: String!
    status: ContentStatus!
    categoryId: ID!
  }

  input GetSubcategoryByIdInput {
    id: ID!
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
    thumbnailUrl: String
    lastEditedBy: String
    seoSchema: String
    status: ContentStatus
    categoryId: ID
  }

  input RemoveSubcategoryByIdInput {
    id: ID!
  }

  input GetSubcategoryByUrlsInput {
    subcategoryCustomUrl: String!
    categoryCustomUrl: String!
  }

  type Query {
    getSubcategoryList: [Subcategory!]!
    getSubcategoryById(input: GetSubcategoryByIdInput!): Subcategory!
    getSubcategoryByUrls(input: GetSubcategoryByUrlsInput!): Subcategory!
  }

  type Mutation {
    createSubcategory(input: CreateSubcategoryInput!): GenericResponse!
    updateSubcategoryById(input: UpdateSubcategoryByIdInput!): GenericResponse!
    removeSubcategoryById(input: RemoveSubcategoryByIdInput!): GenericResponse!
  }
`;
