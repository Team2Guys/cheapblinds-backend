import { gql } from 'graphql-tag';

export const emailTypeDefs = gql`
  input CheckVerificationTokenInput {
    verificationToken: String!
  }

  input SendVerificationTokenInput {
    email: String!
  }

  input SendNewsletterEmailInput {
    recipientList: [String!]!
  }

  type Mutation {
    checkVerificationToken(
      input: CheckVerificationTokenInput!
    ): GenericResponse!
    sendVerificationToken(input: SendVerificationTokenInput!): GenericResponse!
  }
`;
