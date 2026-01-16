import { gql } from 'graphql-tag';

export const newsletterSubscriberTypeDefs = gql`
  type NewsletterSubscriber {
    id: ID!

    email: String!
    isActive: Boolean!

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateNewsletterSubscriberInput {
    email: String!
    isActive: Boolean!
  }

  input UpdateNewsletterSubscriberByIdInput {
    isActive: Boolean!
  }

  type Query {
    newsletterSubscriberList: [NewsletterSubscriber!]!
    newsletterSubscriberById(id: ID!): NewsletterSubscriber
    newsletterSubscriberByEmail(email: String!): NewsletterSubscriber
  }

  type Mutation {
    createNewsletterSubscriber(
      input: CreateNewsletterSubscriberInput!
    ): NewsletterSubscriber
    updateNewsletterSubscriberById(
      id: ID!
      input: UpdateNewsletterSubscriberByIdInput!
    ): NewsletterSubscriber
    sendNewsletterEmail(input: SendNewsletterEmailInput!): GenericResponse!
  }
`;
