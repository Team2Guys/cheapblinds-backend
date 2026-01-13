import { gql } from 'graphql-tag';

export const commonTypeDefs = gql`
  scalar JSON
  scalar DateTime

  enum AdminRole {
    ADMIN
    SUPER_ADMIN
  }

  enum ContentStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }

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

  enum AddressType {
    HOME
    OFFICE
    OTHER
  }

  enum Permissions {
    ADD_PRODUCTS
    EDIT_PRODUCTS
    DELETE_PRODUCTS
    ADD_CATEGORY
    DELETE_CATEGORY
    EDIT_CATEGORY
    CHECK_PROFIT
    CHECK_REVENUE
    CHECK_VISITORS
    VIEW_USERS
    VIEW_SALES
    VIEW_ADMINS
    VIEW_TOTAL_PRODUCTS
    VIEW_TOTAL_CATEGORIES
  }

  type GenericResponse {
    message: String!
  }

  type Admin {
    id: ID!

    name: String!
    email: String!
    permissions: [Permissions!]!
    role: AdminRole!
    lastEditedBy: String!

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type User {
    id: ID!

    defaultShippingAddressId: ID
    defaultBillingAddressId: ID
    firstName: String!
    lastName: String!
    email: String!
    isEmailVerified: Boolean!

    createdAt: DateTime!
    updatedAt: DateTime!

    addresses: [JSON!]!
    orders: [JSON!]!
    defaultShippingAddress: Address
    defaultBillingAddress: Address
  }

  type Address {
    id: ID!

    userId: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    state: String!
    country: String!
    city: String!
    address: String!
    addressType: AddressType!

    createdAt: DateTime!
    updatedAt: DateTime!

    user: User!
    defaultShippingFor: User
    defaultBillingFor: User
  }

  type NewsletterSubscriber {
    id: ID!

    email: String!
    isActive: Boolean!

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Category {
    id: ID!

    name: String!
    shortDescription: String
    description: String
    breadcrumb: String
    oldPath: String
    newPath: String!
    posterImageUrl: String
    metaTitle: String
    metaDescription: String
    canonicalUrl: String
    seoSchema: String
    lastEditedBy: String!
    status: ContentStatus!

    createdAt: DateTime!
    updatedAt: DateTime!

    products: [Product!]
    subcategories: [Subcategory!]
  }

  type Subcategory {
    id: ID!

    categoryId: ID!
    name: String!
    shortDescription: String
    description: String
    breadcrumb: String
    oldPath: String
    newPath: String!
    posterImageUrl: String
    metaTitle: String
    metaDescription: String
    canonicalUrl: String
    seoSchema: String
    lastEditedBy: String!
    status: ContentStatus!

    createdAt: DateTime!
    updatedAt: DateTime!

    category: Category
    products: [Product!]
  }

  type Product {
    id: ID!

    categoryId: ID!
    subcategoryId: ID!
    fabricId: Int!
    blindTypeId: Int!
    sku: String!
    name: String!
    shortDescription: String
    description: String
    breadcrumb: String
    oldPath: String
    newPath: String!
    posterImageUrl: String
    productImages: [String!]!
    isMotorized: Boolean!
    additionalInfo: String
    measuringGuide: String
    material: String
    minDrop: Int!
    maxDrop: Int!
    minWidth: Int!
    maxWidth: Int!
    inStock: Int!
    color: String
    pattern: String
    price: Float!
    motorPrice: Float
    discountPrice: Float
    metaTitle: String
    metaDescription: String
    canonicalUrl: String
    seoSchema: String
    lastEditedBy: String!
    status: ContentStatus!

    createdAt: DateTime!
    updatedAt: DateTime!

    category: Category
    subcategory: Subcategory
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
`;
