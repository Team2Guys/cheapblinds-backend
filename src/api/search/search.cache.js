import { searchRepository } from './search.repository.js';
import { cache } from '#lib/index.js';

const CACHE_TTL = 120; // seconds

export const searchCache = {
  search: async (q, categoryLimit, subcategoryLimit, productLimit) => {
    const key = `search:q:${q}:c:${categoryLimit}:s:${subcategoryLimit}:p:${productLimit}`;

    const cached = await cache.get(key);
    if (cached) return cached;

    const [categories, subcategories, products] = await Promise.all([
      searchRepository.searchCategories(q, categoryLimit),
      searchRepository.searchSubcategories(q, subcategoryLimit),
      searchRepository.searchProducts(q, productLimit)
    ]);

    const result = { categories, subcategories, products };
    await cache.set(key, result, CACHE_TTL);

    return result;
  },

  // Optional: call this after product/category/subcategory updates
  invalidate: async (query, limits) => {
    const key = generateKey(query, limits);
    await cache.del(key);
  }
};
