import { gql } from 'graphql-tag';

export const orderTypeDefs = gql`
  enum OrderStatus {
    PENDING
    PAID
    CANCELED
    FAILED
    SHIPPED
    COMPLETED
  }

  enum PaymentStatus {
    FREE
    PENDING
    PAID
    CANCELED
    FAILED
  }

  type Order {
    id: ID!

    userId: ID!
    shippingAddress: JSON!
    billingAddress: JSON!
    totalAmount: Float!
    shippingCost: Float!
    notes: String
    orderItems: [JSON!]!
    paymentStatus: PaymentStatus!
    orderStatus: OrderStatus!
    lastEditedBy: String!

    createdAt: DateTime!
    updatedAt: DateTime!
  }

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
