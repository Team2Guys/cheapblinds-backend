import { gql } from 'graphql-tag';

export const priceTypeDefs = gql`
  input getFabricPriceInput {
    drop: Float!
    width: Float!
    fabricId: String!
    blindTypeId: String!
  }

  type FabricPrice {
    UID: String!
    FabricID: String!
    SellPrice: Float!
    Tax_amount: Float!
    TotalSalesAmt: Float!
    TradeType: String!
    TaxPercentage: Float!
  }

  type Query {
    fabricPrice(input: getFabricPriceInput!): FabricPrice!
  }
`;
