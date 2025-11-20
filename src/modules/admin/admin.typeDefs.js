import { gql } from "graphql-tag";

export const adminTypeDefs = gql`
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
    permissions: [String!]
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
    createAdmin(input: CreateAdminInput!): AdminResponse!
    updateAdminById(input: UpdateAdminByIdInput!): AdminResponse!
    removeAdminById(input: RemoveAdminByIdInput!): GenericResponse!
  }
`;
