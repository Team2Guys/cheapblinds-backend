import { gql } from "graphql-tag";

export const otpTypeDefs = gql`
  input SendOtpInput {
    email: String!
  }

  input VerifyOtpInput {
    email: String!
    otp: String!
  }

  type GenericResponse {
    status: String!
    message: String!
  }

  type Query {
    _empty: String
  }

  type Mutation {
    sendOtp(input: SendOtpInput!): GenericResponse!
    verifyOtp(input: VerifyOtpInput!): GenericResponse!
  }
`;
