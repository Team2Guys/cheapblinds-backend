// src/graphql/commonTypeDefs.js
import { gql } from "graphql-tag";

export const commonTypeDefs = gql`
  type GenericResponse {
    status: String!
    message: String!
  }

  type SigninResponseData {
    id: ID!
    accessToken: String!
    role: AdminRole
  }

  type SigninResponse {
    status: String!
    message: String!
    data: SigninResponseData!
  }

  input SigninInput {
    email: String!
    password: String!
  }

  enum AdminRole {
    SUPER_ADMIN
    ADMIN
  }

  scalar JSON
  scalar DateTime
`;
