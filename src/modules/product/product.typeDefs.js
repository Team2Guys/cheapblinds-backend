import { gql } from "graphql-tag";

export const productTypeDefs = gql`
  input CreateProductInput {
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
    productImages: [String!]!
    price: Float!
    stock: Int!
    additionalInfo: [JSON!]
    measuringGuide: [JSON!]
    status: ContentStatus!
    categoryId: ID!
    subcategoryId: ID!
  }

  input GetProductByIdInput {
    id: ID!
  }

  input UpdateProductByIdInput {
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
    productImages: [String!]
    lastEditedBy: String
    seoSchema: String
    price: Float
    discountPrice: Float
    stock: Int
    additionalInfo: [JSON!]
    measuringGuide: [JSON!]
    status: ContentStatus
    categoryId: ID
    subcategoryId: ID
  }

  input RemoveProductByIdInput {
    id: ID!
  }

  input GetProductByUrlsInput {
    categoryCustomUrl: String!
    subcategoryCustomUrl: String!
    productCustomUrl: String!
  }

  type Query {
    getProductList: [Product!]!
    getProductById(input: GetProductByIdInput!): Product!
    getProductByUrls(input: GetProductByUrlsInput!): Product!
  }

  type Mutation {
    createProduct(input: CreateProductInput!): GenericResponse!
    updateProductById(input: UpdateProductByIdInput!): GenericResponse!
    removeProductById(input: RemoveProductByIdInput!): GenericResponse!
  }
`;
