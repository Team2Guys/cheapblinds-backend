import { gql } from "graphql-tag";

export const adminTypeDefs = gql`
  type Admin {
    id: ID!
    name: String!
    email: String!
    role: Role!
    permissions: [String!]!
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

  type Query {
    getAdminList: AdminListResponse!
    getAdminById(input: GetAdminByIdInput!): AdminResponse!
  }

  type Mutation {
    updateAdminById(input: UpdateAdminByIdInput!): GenericResponse!
    removeAdminById(input: RemoveAdminByIdInput!): GenericResponse!
  }
`;
