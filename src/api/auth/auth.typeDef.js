import { gql } from 'graphql-tag';

export const authTypeDefs = gql`
  input SignupInput {
    firstName: String!
    lastName: String!
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

  type SigninResponse {
    id: String!
    name: String!
    email: String!
    role: AdminRole
  }

  input SigninInput {
    email: String!
    password: String!
    role: AdminRole
  }

  type Mutation {
    signup(input: SignupInput!): GenericResponse!
    signin(input: SigninInput!): SigninResponse!
    signout: GenericResponse!
    requestPasswordReset(input: PasswordResetRequestInput!): GenericResponse!
    updatePassword(input: PasswordUpdateInput!): GenericResponse!
  }
`;
