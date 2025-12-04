import { gql } from "graphql-tag";

export const orderTypeDefs = gql`
  input CreateOrderInput {
    userId: ID!
    firstName: String
    lastName: String
    email: String
    phone: String
    country: String
    state: String
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
    country: String
    state: String
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
    getOrderList: [Order!]!
    getOrderListByUserId(id: ID!): [Order!]!
    getOrderById(id: ID!): Order
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order
    updateOrderById(id: ID!, input: UpdateOrderByIdInput!): Order
    removeOrderById(id: ID!): Order
  }
`;
