import { gql } from 'graphql-tag';

export const inquiryTypeDefs = gql`
  input CreateInquiryInput {
    name: String!
    email: String!
    phone: String!
    message: String
    inquiryType: InquiryType
  }

  input UpdateInquiryByIdInput {
    inquiryStatus: InquiryStatus!
  }

  type Query {
    inquiryList: [Inquiry!]!
    inquiryById(id: ID!): Inquiry
  }

  type Mutation {
    createInquiry(input: CreateInquiryInput!): Inquiry
    updateInquiryById(id: ID!, input: UpdateInquiryByIdInput!): Inquiry
    removeInquiryById(id: ID!): Inquiry
  }
`;
