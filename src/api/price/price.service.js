import createError from 'http-errors';
import { getFabricPrice, getOptionsPrice } from '#lib/index.js';

export const priceServices = {
  getFabricPrice: async ({ drop, width, fabricId, blindTypeId }) => {
    const price = await getFabricPrice(drop, width, fabricId, blindTypeId);
    if (!price) throw createError(404, 'Price not found.');

    return price;
  },

  getOptionsPrice: async ({ drop, width, fabricId, blindTypeId }) => {
    const price = await getOptionsPrice(drop, width, fabricId, blindTypeId);
    if (!price.length) throw createError(404, 'Price not found.');

    return price;
  }
};
