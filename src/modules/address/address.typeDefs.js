import { gql } from "graphql-tag";

export const addressTypeDefs = gql`
  enum AddressType {
    SHIPPING
    BILLING
    OTHER
  }

  input CreateAddressInput {
    userId: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    country: String!
    city: String!
    address: String!
    addressType: AddressType!
  }

  input UpdateAddressByIdInput {
    id: ID!
    firstName: String
    lastName: String
    email: String
    phone: String
    country: String
    city: String
    address: String
    addressType: AddressType
  }

  type Query {
    addressListByUserId(userId: ID!): [Address!]!
    addressById(Id: ID!): Address
  }

  type Mutation {
    createAddress(input: CreateAddressInput!): Address
    updateAddressById(id: ID!, input: UpdateAddressByIdInput!): Address
    removeAddressById(id: ID!): Address
  }
`;
