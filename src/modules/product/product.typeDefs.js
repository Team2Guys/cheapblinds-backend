import { gql } from "graphql-tag";

export const productTypeDefs = gql`
  scalar JSON

  input CreateProductInput {
    categoryId: ID!
    subcategoryId: ID!
    name: String!
    description: String!
    shortDescription: String!
    customUrl: String!
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    breadCrumb: String
    thumbnailUrl: String!
    thumbnailPublicId: String!
    thumbnailAltText: String!
    lastEditedBy: String
    seoSchema: String
    status: ContentStatus!
    price: Int!
    stock: Int!
    discountPrice: Int
    productImages: [JSON!]!
    sale: String
    saleDuration: String
    saleCounter: String
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
    thumbnailPublicId: String
    thumbnailAltText: String
    lastEditedBy: String
    seoSchema: String
    status: ContentStatus
    price: Int
    stock: Int
    discountPrice: Int
    productImages: [JSON!]
    sale: String
    saleDuration: String
    saleCounter: String
  }

  input RemoveProductByIdInput {
    id: ID!
  }

  type Product {
    id: ID!
    categoryId: ID!
    subcategoryId: ID!
    name: String!
    description: String!
    shortDescription: String!
    customUrl: String!
    metaTitle: String!
    metaDescription: String!
    canonicalTag: String
    breadCrumb: String
    thumbnailUrl: String!
    thumbnailPublicId: String!
    thumbnailAltText: String!
    lastEditedBy: String
    seoSchema: String!
    status: ContentStatus!
    price: Int!
    stock: Int!
    discountPrice: Int
    productImages: [JSON!]!
    sale: String
    saleDuration: String
    saleCounter: String
    createdAt: DateTime!
    updatedAt: DateTime!
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
  }

  type Mutation {
    createProduct(input: CreateProductInput!): GenericResponse!
    updateProductById(input: UpdateProductByIdInput!): GenericResponse!
    removeProductById(input: RemoveProductByIdInput!): GenericResponse!
  }
`;
