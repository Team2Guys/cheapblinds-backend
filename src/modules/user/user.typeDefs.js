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

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    isEmailVerified: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type UsersResponse {
    status: String!
    message: String!
    data: [User!]!
  }

  type UserResponse {
    status: String!
    message: String!
    data: User!
  }

  type Query {
    getAllUsers: UsersResponse!
    getUserById(input: GetUserByIdInput!): UserResponse!
  }

  type Mutation {
    updateUserById(input: UpdateUserByIdInput!): UserResponse!
    removeUserById(input: RemoveUserByIdInput!): GenericResponse!
  }
`;
