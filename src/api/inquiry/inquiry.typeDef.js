import { gql } from 'graphql-tag';

export const inquiryTypeDefs = gql`
  enum InquiryType {
    EMAIL
    PHONE
    WHATSAPP
    OTHER
  }

  enum InquiryStatus {
    NEW
    READ
    RESOLVED
  }

  type Inquiry {
    id: ID!

    name: String!
    email: String!
    phone: String!
    message: String
    inquiryType: InquiryType!
    inquiryStatus: InquiryStatus!

    createdAt: DateTime!
    updatedAt: DateTime!
  }

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
