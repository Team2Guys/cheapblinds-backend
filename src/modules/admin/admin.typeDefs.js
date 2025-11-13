import { gql } from "graphql-tag";

export const adminTypeDefs = gql`
  type Admin {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
    canAddProduct: Boolean
    canEditProduct: Boolean
    canDeleteProduct: Boolean
    canAddCategory: Boolean
    canEditCategory: Boolean
    canDeleteCategory: Boolean
    canAddSubcategory: Boolean
    canEditSubcategory: Boolean
    canDeleteSubcategory: Boolean
    canAddBlog: Boolean
    canEditBlog: Boolean
    canDeleteBlog: Boolean
    canAddRedirectUrls: Boolean
    canEditRedirectUrls: Boolean
    canDeleteRedirectUrls: Boolean
    canCheckProfit: Boolean
    canCheckRevenue: Boolean
    canCheckVisitors: Boolean
    canViewUsers: Boolean
    canViewSales: Boolean
    canViewAdmins: Boolean
    canViewTotalProducts: Boolean
    canViewTotalCategories: Boolean
    canViewTotalSubCategories: Boolean
    canViewTotalBlog: Boolean
    canViewTotalRedirectUrls: Boolean
    canViewAppointments: Boolean
    createdAt: DateTime!
    updatedAt: DateTime!
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

  input GetAdminByIdInput {
    id: ID! # Corrected from ID!!
  }

  input CreateAdminInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: Role!
    canAddProduct: Boolean
    canEditProduct: Boolean
    canDeleteProduct: Boolean
    canAddCategory: Boolean
    canEditCategory: Boolean
    canDeleteCategory: Boolean
    canAddSubcategory: Boolean
    canEditSubcategory: Boolean
    canDeleteSubcategory: Boolean
    canAddBlog: Boolean
    canEditBlog: Boolean
    canDeleteBlog: Boolean
    canAddRedirectUrls: Boolean
    canEditRedirectUrls: Boolean
    canDeleteRedirectUrls: Boolean
    canCheckProfit: Boolean
    canCheckRevenue: Boolean
    canCheckVisitors: Boolean
    canViewUsers: Boolean
    canViewSales: Boolean
    canViewAdmins: Boolean
    canViewTotalProducts: Boolean
    canViewTotalCategories: Boolean
    canViewTotalSubCategories: Boolean
    canViewTotalBlog: Boolean
    canViewTotalRedirectUrls: Boolean
    canViewAppointments: Boolean
  }

  input UpdateAdminByIdInput {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    role: Role
    canAddProduct: Boolean
    canEditProduct: Boolean
    canDeleteProduct: Boolean
    canAddCategory: Boolean
    canEditCategory: Boolean
    canDeleteCategory: Boolean
    canAddSubcategory: Boolean
    canEditSubcategory: Boolean
    canDeleteSubcategory: Boolean
    canAddBlog: Boolean
    canEditBlog: Boolean
    canDeleteBlog: Boolean
    canAddRedirectUrls: Boolean
    canEditRedirectUrls: Boolean
    canDeleteRedirectUrls: Boolean
    canCheckProfit: Boolean
    canCheckRevenue: Boolean
    canCheckVisitors: Boolean
    canViewUsers: Boolean
    canViewSales: Boolean
    canViewAdmins: Boolean
    canViewTotalProducts: Boolean
    canViewTotalCategories: Boolean
    canViewTotalSubCategories: Boolean
    canViewTotalBlog: Boolean
    canViewTotalRedirectUrls: Boolean
    canViewAppointments: Boolean
  }

  input RemoveAdminByIdInput {
    id: ID!
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
