import { gql } from 'graphql-tag';

export const orderTypeDefs = gql`
  input CreateOrderInput {
    userId: ID!
    shippingAddress: JSON!
    billingAddress: JSON!
    totalAmount: Float!
    shippingCost: Float!
    notes: String!
    orderItems: [JSON!]!
    paymentStatus: PaymentStatus!
    orderStatus: OrderStatus!
    lastEditedBy: String!
  }

  input UpdateOrderByIdInput {
    id: ID!
    userId: ID
    shippingAddress: JSON
    billingAddress: JSON
    totalAmount: Float
    shippingCost: Float
    notes: String
    orderItems: [JSON!]
    paymentStatus: PaymentStatus
    orderStatus: OrderStatus
    lastEditedBy: String
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
