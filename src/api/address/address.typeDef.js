import { gql } from 'graphql-tag';

export const addressTypeDefs = gql`
  enum AddressType {
    HOME
    OFFICE
    OTHER
  }

  input CreateAddressInput {
    userId: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    state: String!
    country: String!
    city: String!
    address: String!
    addressType: AddressType!
  }

  input UpdateAddressByIdInput {
    userId: ID
    firstName: String
    lastName: String
    email: String
    phone: String
    state: String
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
