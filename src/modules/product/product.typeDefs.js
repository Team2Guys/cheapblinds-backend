import { gql } from "graphql-tag";

export const productTypeDefs = gql`
  scalar JSON

  input CreateProductInput {
    name: String!
    price: Int
    description: String!
    stock: Int
    discountPrice: Int
    thumbnailUrl: String!
    thumbnailPublicId: String!
    productImages: [JSON!]
    colors: [JSON!]
    specifications: [JSON!]
    sale: String
    saleDuration: String
    canonicalTag: String
    metaDescription: String
    metaTitle: String
    ogImage: String
    ogUrl: String
    ogTitle: String
    thumbnailAltText: String
    productImagesAltText: String
    sections: [JSON!]
    saleCounter: String
    sizes: [JSON!]
    filter: [JSON!]
    customUrl: String
    shippingOptions: [JSON!]
    categoryId: String!
    subcategoryId: String!
  }

  input GetProductByIdInput {
    id: ID!
  }
  input UpdateProductByIdInput {
    id: ID!
    name: String
    price: Int
    description: String
    stock: Int
    discountPrice: Int
  }
  input RemoveProductByIdInput {
    id: ID!
  }

  type Product {
    id: ID!
    name: String!
    price: Int!
    description: String!
    stock: Int!
    discountPrice: Int
    thumbnailUrl: String!
    thumbnailPublicId: String!
    productImages: [JSON!]
    colors: [JSON!]
    specifications: [JSON!]
    sale: String
    saleDuration: String
    canonicalTag: String
    metaDescription: String
    metaTitle: String
    ogImage: String
    ogUrl: String
    ogTitle: String
    thumbnailAltText: String
    productImagesAltText: String
    sections: [JSON!]
    saleCounter: String
    sizes: [JSON!]
    filter: [JSON!]
    customUrl: String
    shippingOptions: [JSON!]
    categoryId: String!
    subcategoryId: String!
    category: Category
    subcategory: Subcategory
    createdAt: String!
    updatedAt: String!
  }

  type ProductsResponse {
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
    getAllProducts: ProductsResponse!
    getProductById(input: GetProductByIdInput!): ProductResponse!
  }

  type Mutation {
    createProduct(input: CreateProductInput!): ProductResponse!
    updateProductById(input: UpdateProductByIdInput!): ProductResponse!
    removeProductById(input: RemoveProductByIdInput!): GenericResponse!
  }
`;
