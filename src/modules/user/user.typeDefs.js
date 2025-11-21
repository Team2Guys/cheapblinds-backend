import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  input GetUserByIdInput {
    id: ID!
  }

  input UpdateUserByIdInput {
    id: ID!
    firstName: String
    lastName: String
    email: String
    isNewsletterSubscribed: Boolean
  }

  input RemoveUserByIdInput {
    id: ID!
  }

  type Query {
    getUserList: [User!]!
    getUserById(input: GetUserByIdInput!): User!
  }

  type Mutation {
    updateUserById(input: UpdateUserByIdInput!): GenericResponse!
    removeUserById(input: RemoveUserByIdInput!): GenericResponse!
  }
`;
