import { gql } from "graphql-tag";

export const productTypeDefs = gql`
  input CreateProductInput {
    categoryId: ID!
    subcategoryId: ID!
    name: String!
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
    status: ContentStatus
    price: Int
    discountPrice: Int
    stock: Int
    additionalInfo: [JSON!]
    measuringGuide: [JSON!]
  }

  input GetProductByIdInput {
    id: ID!
  }

  input UpdateProductByIdInput {
    id: ID!
    categoryId: ID
    subcategoryId: ID
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
    status: ContentStatus
    price: Int
    discountPrice: Int
    stock: Int
    additionalInfo: [JSON!]
    measuringGuide: [JSON!]
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
