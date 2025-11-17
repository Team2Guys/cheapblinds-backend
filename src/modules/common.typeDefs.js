import { gql } from "graphql-tag";

export const commonTypeDefs = gql`
  type GenericResponse {
    status: String!
    message: String!
  }

  type SigninResponseData {
    id: ID!
    role: Role!
  }

  type SigninResponse {
    status: String!
    message: String!
    data: SigninResponseData!
  }

  input SigninInput {
    email: String!
    password: String!
    role: Role!
  }

  enum Role {
    USER
    ADMIN
    SUPER_ADMIN
  }

  enum ContentStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }

  scalar JSON
  scalar DateTime
`;
