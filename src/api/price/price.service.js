import createError from 'http-errors';
import { getFabricPrice } from '#lib/index.js';

export const priceServices = {
  fabricPrice: async ({ drop, width, fabricId, blindTypeId }) => {
    const price = await getFabricPrice(drop, width, fabricId, blindTypeId);
    if (!price) throw createError(404, 'Price not found.');

    return price;
  }
};
