import { gql } from 'graphql-tag';

export const productTypeDefs = gql`
  input CreateProductInput {
    categoryId: ID!
    subcategoryId: ID!
    fabricId: Int!
    blindTypeId: Int!
    sku: String!
    name: String!
    shortDescription: String
    description: String
    breadcrumb: String
    oldPath: String
    newPath: String
    posterImageUrl: String
    productImages: [String!]!
    isMotorized: Boolean
    additionalInfo: String
    measuringGuide: String
    material: String
    minDrop: Float
    maxDrop: Float
    minWidth: Float
    maxWidth: Float
    inStock: Int
    color: String
    pattern: String
    price: Float!
    motorPrice: Float
    discountPrice: Float
    metaTitle: String
    metaDescription: String
    canonicalUrl: String
    seoSchema: String
    lastEditedBy: String!
    status: ContentStatus!
  }

  input UpdateProductByIdInput {
    id: ID
    categoryId: ID!
    subcategoryId: ID!
    fabricId: Int!
    blindTypeId: Int!
    sku: String!
    name: String!
    shortDescription: String
    description: String
    breadcrumb: String
    oldPath: String
    newPath: String
    posterImageUrl: String
    productImages: [String!]!
    isMotorized: Boolean
    additionalInfo: String
    measuringGuide: String
    material: String
    minDrop: Float
    maxDrop: Float
    minWidth: Float
    maxWidth: Float
    inStock: Int
    color: String
    pattern: String
    price: Float!
    motorPrice: Float
    discountPrice: Float
    metaTitle: String
    metaDescription: String
    canonicalUrl: String
    seoSchema: String
    lastEditedBy: String!
    status: ContentStatus!
  }

  input GetProductByPathsInput {
    categoryPath: String!
    subcategoryPath: String!
    productPath: String!
  }

  type Query {
    productList: [Product!]!
    productById(id: ID!): Product
    productByPaths(input: GetProductByPathsInput!): Product
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product
    updateProductById(id: ID!, input: UpdateProductByIdInput!): Product
    removeProductById(id: ID!): Product
  }
`;
