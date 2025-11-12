import { gql } from "graphql-tag";

export const emailTypeDefs = gql`
  type GenericResponse {
    status: String!
    message: String!
  }

  input CheckVerificationTokenInput {
    verificationToken: String!
  }

  input SendVerificationTokenInput {
    email: String!
  }

  type Query {
    _empty: String
  }

  type Mutation {
    checkVerificationToken(input: CheckVerificationTokenInput!): GenericResponse!
    sendVerificationToken(input: SendVerificationTokenInput!): GenericResponse!
  }
`;
