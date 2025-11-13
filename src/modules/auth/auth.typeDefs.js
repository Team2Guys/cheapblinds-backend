import { gql } from "graphql-tag";

export const authTypeDefs = gql`
  input SignupInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    isNewsletterSubscribed: Boolean
  }

  input PasswordResetRequestInput {
    email: String!
  }

  input PasswordUpdateInput {
    password: String!
    resetToken: String!
  }

  type Query {
    _empty: String
  }

  type Mutation {
    signup(input: SignupInput!): GenericResponse!
    signin(input: SigninInput!): SigninResponse!
    requestPasswordReset(input: PasswordResetRequestInput!): GenericResponse!
    updatePassword(input: PasswordUpdateInput!): GenericResponse!
  }
`;
