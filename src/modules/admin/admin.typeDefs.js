import { gql } from "graphql-tag";

export const adminTypeDefs = gql`
  type Admin {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: AdminRole!
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

  input CreateAdminInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    permissions: [String!]!
  }

  input UpdateAdminByIdInput {
    id: ID!
    firstName: String
    lastName: String
    permissions: [String!]
    password: String
  }

  input RemoveAdminByIdInput {
    id: ID!
  }

  type Query {
    getAdmins: AdminListResponse!
    getAdminById(input: GetAdminByIdInput!): AdminResponse!
  }

  type Mutation {
    signinSuperAdmin(input: SigninInput!): SigninResponse!
    signinAdmin(input: SigninInput!): SigninResponse!
    createAdmin(input: CreateAdminInput!): GenericResponse!
    updateAdminById(input: UpdateAdminByIdInput!): AdminResponse!
    removeAdminById(input: RemoveAdminByIdInput!): GenericResponse!
  }
`;
