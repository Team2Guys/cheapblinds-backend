import { commonUtils } from '#lib/index.js';
import { priceServices } from './price.service.js';
import { getPricingSchema } from './price.validation.js';
import { validate } from '#lib/validation.lib.js';

const { handlePromise } = commonUtils;

export const priceResolvers = {
  Query: {
    fabricPrice: handlePromise((_parent, { input }) => {
      const validated = validate(getPricingSchema, input);
      return priceServices.getFabricPrice(validated);
    }),

    optionsPrice: handlePromise((_parent, { input }) => {
      const validated = validate(getPricingSchema, input);
      return priceServices.getOptionsPrice(validated);
    })
  }
};
