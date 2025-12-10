import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  input UpdateUserByIdInput {
    firstName: String
    lastName: String
    email: String
    password: String
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
