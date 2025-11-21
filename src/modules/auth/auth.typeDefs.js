import { gql } from "graphql-tag";

export const authTypeDefs = gql`
  input SignupInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: Role!
    isNewsletterSubscribed: Boolean
    permissions: [String!]
  }

  input PasswordResetRequestInput {
    email: String!
  }

  input PasswordUpdateInput {
    password: String!
    resetToken: String!
  }

  type SigninResponse {
    id: String!
    name: String!
    role: Role!
    accessToken: String!
  }

  input SigninInput {
    email: String!
    password: String!
    role: Role!
  }

  type Query {
    _empty: String
  }

  type Mutation {
    signup(input: SignupInput!): GenericResponse!
    signin(input: SigninInput!): GenericResponse!
    signout: GenericResponse!
    requestPasswordReset(input: PasswordResetRequestInput!): GenericResponse!
    updatePassword(input: PasswordUpdateInput!): GenericResponse!
  }
`;
