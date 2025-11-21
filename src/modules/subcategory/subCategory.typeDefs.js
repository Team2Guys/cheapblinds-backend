import { gql } from "graphql-tag";

export const subcategoryTypeDefs = gql`
  input CreateSubcategoryInput {
    categoryId: ID!
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

  input GetSubcategoryByIdInput {
    id: ID!
  }

  input UpdateSubcategoryByIdInput {
    id: ID!
    categoryId: ID!
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
