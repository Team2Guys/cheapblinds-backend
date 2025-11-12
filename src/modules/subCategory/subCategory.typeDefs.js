import { gql } from "graphql-tag";

export const subcategoryTypeDefs = gql`
  input CreateSubcategoryInput {
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

  input GetSubcategoryByIdInput {
    id: String!
  }

  input UpdateSubcategoryByIdInput {
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

  input RemoveSubcategoryByIdInput {
    id: String!
  }

  type Subcategory {
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
    data: [Subcategory!]!
  }

  type SubcategoryResponse {
    status: String!
    message: String!
    data: Subcategory!
  }

  type GenericResponse {
    status: String!
    message: String!
  }

  type Query {
    getSubcategories: SubCategoriesResponse!
    getSubcategoryById(input: GetSubcategoryByIdInput!): SubcategoryResponse!
  }

  type Mutation {
    createSubcategory(input: CreateSubcategoryInput!): SubcategoryResponse!
    updateSubcategoryById(input: UpdateSubcategoryByIdInput!): SubcategoryResponse!
    removeSubcategoryById(input: RemoveSubcategoryByIdInput!): GenericResponse!
  }
`;
