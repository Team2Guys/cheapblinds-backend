import { gql } from "graphql-tag";

export const adminTypeDefs = gql`
  input GetAdminByIdInput {
    id: String!
  }

  input CreateAdminInput {
    fullName: String!
    email: String!
    password: String!
  }

  input UpdateAdminByIdInput {
    id: ID!
    fullName: String
    email: String
    password: String
  }

  input RemoveAdminByIdInput {
    id: String!
  }

  type Admin {
    id: ID!
    fullName: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type AdminsResponse {
    status: String!
    message: String!
    data: [Admin!]!
  }

  type AdminResponse {
    status: String!
    message: String!
    data: Admin!
  }

  type TokenData {
    id: ID!
    accessToken: String!
  }

  type SigninResponse {
    status: String!
    message: String!
    data: TokenData!
  }

  type GenericResponse {
    status: String!
    message: String!
  }

  type Query {
    getAdmins: AdminsResponse!
    getAdminById(input: GetAdminByIdInput!): AdminResponse!
  }

  type Mutation {
    superAdminLogin(email: String!, password: String!): SigninResponse!
    adminLogin(email: String!, password: String!): SigninResponse!
    createAdmin(input: CreateAdminInput!): AdminResponse!
    updateAdminById(input: UpdateAdminByIdInput!): AdminResponse!
    removeAdminById(input: RemoveAdminByIdInput!): GenericResponse!
  }
`;
