import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  enum Role {
    USER
    ADMIN
  }

  input GetUserByIdInput {
    id: String!
  }

  input UpdateUserByIdInput {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    role: Role
  }

  input RemoveUserByIdInput {
    id: String!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: String!
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

  type GenericResponse {
    status: String!
    message: String!
  }

  type Query {
    getUsers: UsersResponse!
    getUserById(input: GetUserByIdInput!): UserResponse!
  }

  type Mutation {
    updateUserById(input: UpdateUserByIdInput!): UserResponse!
    removeUserById(input: RemoveUserByIdInput!): GenericResponse!
  }
`;
