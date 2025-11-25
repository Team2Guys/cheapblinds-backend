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
    posterImageUrl: String!
    productImages: [String!]!
    seoSchema: String!
    price: Float!
    discountPrice: Float!
    stock: Int!
    additionalInfo: String
    measuringGuide: String
    lastEditedBy: String!
    status: ContentStatus!
    categoryId: ID!
    subcategoryId: ID!
  }

  input UpdateProductByIdInput {
    name: String
    description: String
    shortDescription: String
    customUrl: String
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    breadCrumb: String
    posterImageUrl: String
    productImages: [String!]
    seoSchema: String
    price: Float
    discountPrice: Float
    stock: Int
    additionalInfo: String
    measuringGuide: String
    lastEditedBy: String
    status: ContentStatus
    categoryId: ID
    subcategoryId: ID
  }

  input GetProductByUrlsInput {
    categoryCustomUrl: String!
    subcategoryCustomUrl: String!
    productCustomUrl: String!
  }

  type Query {
    getProductList: [Product!]!
    getProductById(id: ID!): Product!
    getProductByUrls(input: GetProductByUrlsInput!): Product!
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
    updateProductById(id: ID!, input: UpdateProductByIdInput!): Product!
    removeProductById(id: ID!): GenericResponse!
  }
`;
