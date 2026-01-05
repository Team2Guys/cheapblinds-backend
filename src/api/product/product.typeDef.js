import { gql } from 'graphql-tag';

export const productTypeDefs = gql`
  input CreateProductInput {
    categoryId: ID!
    subcategoryId: ID!
    fabricId: Int!
    blindTypeId: Int!
    sku: String!
    name: String!
    slug: String
    shortDescription: String
    description: String
    metaTitle: String
    metaDescription: String
    canonicalUrl: String
    breadcrumb: String
    posterImageUrl: String
    productUrl: String!
    productImages: [String!]!
    price: Float!
    discountPrice: Float
    motorPrice: Float
    minHeight: Float
    maxHeight: Float
    minWidth: Float
    maxWidth: Float
    inStock: Int
    color: String
    pattern: String
    material: String
    isMotorized: Boolean
    additionalInfo: String
    measuringGuide: String
    seoSchema: String
    lastEditedBy: String!
    status: ContentStatus!
  }

  input UpdateProductByIdInput {
    categoryId: ID
    subcategoryId: ID
    fabricId: Int
    blindTypeId: Int
    sku: String
    name: String
    slug: String
    shortDescription: String
    description: String
    metaTitle: String
    metaDescription: String
    canonicalUrl: String
    breadcrumb: String
    posterImageUrl: String
    productUrl: String
    productImages: [String!]
    price: Float
    discountPrice: Float
    motorPrice: Float
    minHeight: Float
    maxHeight: Float
    minWidth: Float
    maxWidth: Float
    inStock: Int
    color: String
    pattern: String
    material: String
    isMotorized: Boolean
    additionalInfo: String
    measuringGuide: String
    seoSchema: String
    lastEditedBy: String
    status: ContentStatus
  }

  input GetProductBySlugsInput {
    categorySlug: String!
    subcategorySlug: String!
    productSlug: String!
  }

  type Query {
    productList: [Product!]!
    productById(id: ID!): Product
    productBySlugs(input: GetProductBySlugsInput!): Product
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product
    updateProductById(id: ID!, input: UpdateProductByIdInput!): Product
    removeProductById(id: ID!): Product
  }
`;
