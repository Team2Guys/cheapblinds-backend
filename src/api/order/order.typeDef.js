import { gql } from 'graphql-tag';

export const orderTypeDefs = gql`
  input CreateOrderInput {
    userId: ID!
    firstName: String
    lastName: String
    email: String
    phone: String
    state: String
    country: String
    city: String
    address: String
    totalAmount: Float!
    shippingCost: Float!
    notes: String
    items: [JSON!]
    lastEditedBy: String
    paymentStatus: String
    orderStatus: String
  }

  input UpdateOrderByIdInput {
    id: ID!
    userId: ID
    firstName: String
    lastName: String
    email: String
    phone: String
    state: String
    country: String
    city: String
    address: String
    totalAmount: Float!
    shippingCost: Float!
    notes: String
    items: [JSON!]
    lastEditedBy: String
    paymentStatus: String
    orderStatus: String
  }

  type Query {
    orderList: [Order!]!
    orderListByUserId(id: ID!): [Order!]!
    orderById(id: ID!): Order
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order
    updateOrderById(id: ID!, input: UpdateOrderByIdInput!): Order
    removeOrderById(id: ID!): Order
  }
`;
