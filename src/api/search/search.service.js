import { searchCache } from './search.cache.js';

export const searchService = {
  search: async (input) => {
    const {
      query,
      categoryLimit = 5,
      subcategoryLimit = 5,
      productLimit = 10
    } = input;
    if (!query || query.trim().length < 2) {
      return {
        categories: [],
        subcategories: [],
        products: []
      };
    }

    const q = query.trim();

    return searchCache.search(q, categoryLimit, subcategoryLimit, productLimit);
  }
};
