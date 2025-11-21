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

  type Query {
    getAdminList: [Admin!]!
    getAdminById(input: GetAdminByIdInput!): Admin!
  }

  type Mutation {
    createAdmin(input: CreateAdminInput!): GenericResponse!
    updateAdminById(input: UpdateAdminByIdInput!): GenericResponse!
    removeAdminById(input: RemoveAdminByIdInput!): GenericResponse!
  }
`;
