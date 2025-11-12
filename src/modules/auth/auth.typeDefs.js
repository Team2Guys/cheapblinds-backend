import { gql } from "graphql-tag";

export const authTypeDefs = gql`
  enum ROLE {
    USER
    ADMIN
  }

  input SignUpInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: ROLE
    isNewsletterSubscribed: Boolean
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input PasswordResetRequestInput {
    email: String!
  }

  input PasswordUpdateInput {
    password: String!
    resetToken: String!
  }

  type TokenData {
    id: ID!
    role: Role!
    accessToken: String!
  }

  type SigninResponse {
    status: String!
    message: String!
    data: TokenData
  }

  type GenericResponse {
    status: String!
    message: String!
  }

  type Query {
    _empty: String
  }

  type Mutation {
    signUp(input: SignUpInput!): GenericResponse!
    signIn(input: SignInInput!): SigninResponse!
    requestPasswordReset(input: PasswordResetRequestInput!): GenericResponse!
    updatePassword(input: PasswordUpdateInput!): GenericResponse!
  }
`;
