import { gql } from 'graphql-tag';

export const authTypeDefs = gql`
  input SignupInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: Role!
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
    role: Role!
  }

  input SigninInput {
    email: String!
    password: String!
    role: Role!
  }

  type Mutation {
    signup(input: SignupInput!): GenericResponse!
    signin(input: SigninInput!): SigninResponse!
    signout: GenericResponse!
    requestPasswordReset(input: PasswordResetRequestInput!): GenericResponse!
    updatePassword(input: PasswordUpdateInput!): GenericResponse!
  }
`;
