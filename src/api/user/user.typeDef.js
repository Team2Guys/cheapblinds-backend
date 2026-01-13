import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  input UpdateUserByIdInput {
    defaultShippingAddressId: ID
    defaultBillingAddressId: ID
    firstName: String
    lastName: String
    email: String
  }

  type Query {
    userList: [User!]!
    userById(id: ID!): User
  }

  type Mutation {
    updateUserById(id: ID!, input: UpdateUserByIdInput!): User
    removeUserById(id: ID!): User
  }
`;
