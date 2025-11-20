import { gql } from "graphql-tag";

export const adminTypeDefs = gql`
  input CreateAdminInput {
    name: String!
    email: String!
    password: String!
    role: Role!
    permissions: [String!]!
  }

  input GetAdminByIdInput {
    id: ID!
  }

  input UpdateAdminByIdInput {
    id: ID!
    name: String
    email: String
    password: String
    permissions: [String!]
  }

  input RemoveAdminByIdInput {
    id: ID!
  }

  type Admin {
    id: ID!
    name: String!
    email: String!
    password: String!
    permissions: [String!]!
    role: Role!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type AdminListResponse {
    status: String!
    message: String!
    data: [Admin!]!
  }

  type AdminResponse {
    status: String!
    message: String!
    data: Admin!
  }

  type Query {
    getAdminList: AdminListResponse!
    getAdminById(input: GetAdminByIdInput!): AdminResponse!
  }

  type Mutation {
    createAdmin(input: CreateAdminInput!): GenericResponse!
    updateAdminById(input: UpdateAdminByIdInput!): GenericResponse!
    removeAdminById(input: RemoveAdminByIdInput!): GenericResponse!
  }
`;
