import { gql } from 'graphql-tag';

export const searchTypeDefs = gql`
  type SearchResult {
    categories: [Category!]!
    subcategories: [Subcategory!]!
    products: [Product!]!
  }

  input SearchInput {
    query: String!
    categoryLimit: Int
    subcategoryLimit: Int
    productLimit: Int
  }

  extend type Query {
    search(input: SearchInput!): SearchResult!
  }
`;
