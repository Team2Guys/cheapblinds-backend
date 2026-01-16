import { gql } from 'graphql-tag';

export const adminTypeDefs = gql`
  enum Permissions {
    ADD_PRODUCTS
    EDIT_PRODUCTS
    DELETE_PRODUCTS
    ADD_CATEGORY
    DELETE_CATEGORY
    EDIT_CATEGORY
    CHECK_PROFIT
    CHECK_REVENUE
    CHECK_VISITORS
    VIEW_USERS
    VIEW_SALES
    VIEW_ADMINS
    VIEW_TOTAL_PRODUCTS
    VIEW_TOTAL_CATEGORIES
  }

  type Admin {
    id: ID!

    name: String!
    email: String!
    permissions: [Permissions!]!
    role: AdminRole!
    lastEditedBy: String!

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateAdminInput {
    name: String!
    email: String!
    password: String!
    role: AdminRole!
    permissions: [Permissions!]!
    lastEditedBy: String!
  }

  input UpdateAdminByIdInput {
    name: String
    email: String
    role: AdminRole
    permissions: [Permissions!]
    lastEditedBy: String
  }

  type Query {
    adminList: [Admin!]!
    adminById(id: ID!): Admin
  }

  type Mutation {
    createAdmin(input: CreateAdminInput!): Admin
    updateAdminById(id: ID!, input: UpdateAdminByIdInput!): Admin
    removeAdminById(id: ID!): Admin
  }
`;
