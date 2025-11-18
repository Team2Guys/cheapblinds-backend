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

  type SubcategoryListResponse {
    status: String!
    message: String!
    data: [Subcategory!]!
  }

  type SubcategoryResponse {
    status: String!
    message: String!
    data: Subcategory!
  }

  type Query {
    getSubcategoryList: SubcategoryListResponse!
    getSubcategoryById(input: GetSubcategoryByIdInput!): SubcategoryResponse!
  }

  type Mutation {
    createSubcategory(input: CreateSubcategoryInput!): GenericResponse!
    updateSubcategoryById(input: UpdateSubcategoryByIdInput!): GenericResponse!
    removeSubcategoryById(input: RemoveSubcategoryByIdInput!): GenericResponse!
  }
`;
