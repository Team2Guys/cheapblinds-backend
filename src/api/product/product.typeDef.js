import { gql } from 'graphql-tag';

export const productTypeDefs = gql`
  input CreateProductInput {
    categoryId: ID!
    subcategoryId: ID!
    name: String!
    description: String
    shortDescription: String
    slug: String
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    breadcrumb: String
    posterImageUrl: String
    productImages: [String!]!
    seoSchema: String
    price: Float!
    discountPrice: Float
    motorPrice: Float
    width: Float
    height: Float
    stock: Int
    color: String
    pattern: String
    composition: String
    isMotorized: Boolean
    additionalInfo: String
    measuringGuide: String
    lastEditedBy: String!
    status: ContentStatus!
  }

  input UpdateProductByIdInput {
    categoryId: ID!
    subcategoryId: ID!
    name: String!
    description: String
    shortDescription: String
    slug: String
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    breadcrumb: String
    posterImageUrl: String
    productImages: [String!]!
    seoSchema: String
    price: Float!
    discountPrice: Float
    motorPrice: Float
    width: Float
    height: Float
    stock: Int
    color: String
    pattern: String
    composition: String
    isMotorized: Boolean
    additionalInfo: String
    measuringGuide: String
    lastEditedBy: String!
    status: ContentStatus!
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
