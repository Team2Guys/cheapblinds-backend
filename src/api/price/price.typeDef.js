import { gql } from 'graphql-tag';

export const priceTypeDefs = gql`
  input getPricingInput {
    drop: Float!
    width: Float!
    fabricId: Int!
    blindTypeId: Int!
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

  type OptionsPrice {
    UID: String!
    Blindtypeid: String!
    BlindTypeDescription: String!
    OptionGroup_ID: String!
    OptionGroup: String!
    ChoiceCode: String!
    ChoiceDescription: String
    ChoiceID: String!
    SalesPrice: Float!
  }

  type Query {
    fabricPrice(input: getPricingInput!): FabricPrice!
    optionsPrice(input: getPricingInput!): [OptionsPrice!]!
  }
`;
