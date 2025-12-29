import { commonUtils } from '#lib/index.js';
import { priceServices } from './price.service.js';

const { handlePromise } = commonUtils;

export const priceResolvers = {
  Query: {
    fabricPrice: handlePromise((_parent, { input }) =>
      priceServices.getFabricPrice(input)
    ),

    optionsPrice: handlePromise((_parent, { input }) =>
      priceServices.getOptionsPrice(input)
    )
  }
};
