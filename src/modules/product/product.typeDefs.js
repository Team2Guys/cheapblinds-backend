import { gql } from "graphql-tag";

export const productTypeDefs = gql`
  scalar JSON

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

  input RemoveProductByIdInput {
    id: ID!
  }

  input GetProductByUrlsInput {
    categoryCustomUrl: String!
    subcategoryCustomUrl: String!
    productCustomUrl: String!
  }

  type ProductListResponse {
    status: String!
    message: String!
    data: [Product!]!
  }

  type ProductResponse {
    status: String!
    message: String!
    data: Product!
  }

  type Query {
    getProductList: ProductListResponse!
    getProductById(input: GetProductByIdInput!): ProductResponse!
    getProductByUrls(input: GetProductByUrlsInput!): ProductResponse!
  }

  type Mutation {
    createProduct(input: CreateProductInput!): GenericResponse!
    updateProductById(input: UpdateProductByIdInput!): GenericResponse!
    removeProductById(input: RemoveProductByIdInput!): GenericResponse!
  }
`;
