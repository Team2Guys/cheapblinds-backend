import { gql } from "graphql-tag";

export const adminTypeDefs = gql`
  input GetAdminByIdInput {
    id: String!
  }

  input SigninInput {
    email: String!
    password: String!
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

  enum Role {
    SUPER_ADMIN
    ADMIN
  }

  type ResponseData {
    id: ID!
    accessToken: String!
    role: Role!
  }

  type SigninResponse {
    status: String!
    message: String!
    data: ResponseData!
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
    superAdminLogin(input: SigninInput!): SigninResponse!
    adminLogin(input: SigninInput!): SigninResponse!
    createAdmin(input: CreateAdminInput!): GenericResponse!
    updateAdminById(input: UpdateAdminByIdInput!): GenericResponse!
    removeAdminById(input: RemoveAdminByIdInput!): GenericResponse!
  }
`;
