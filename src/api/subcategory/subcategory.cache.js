import { subcategoryRepository } from './subcategory.repository.js';
import { cache } from '#lib/index.js';

const { read } = subcategoryRepository;
const CACHE_TTL = 120;

export const subcategoryCache = {
  getSubcategoryList: async () => {
    const key = 'subcategories:list';
    const cached = await cache.get(key);
    if (cached) return cached;

    const subcategories = await read.subcategoryList();
    if (subcategories.length) await cache.set(key, subcategories, CACHE_TTL);
    return subcategories;
  },

  getSubcategoryById: async (id) => {
    const key = `subcategories:id:${id}`;
    const cached = await cache.get(key);
    if (cached) return cached;

    const subcategory = await read.subcategoryById(id);
    if (subcategory) await cache.set(key, subcategory, CACHE_TTL);
    return subcategory;
  },

  getSubcategoryByPath: async (path) => {
    const key = `subcategories:path:${path}`;
    const cached = await cache.get(key);
    if (cached) return cached;

    const subcategory = await read.subcategoryByPath({ path });
    if (subcategory) await cache.set(key, subcategory, CACHE_TTL);
    return subcategory;
  },

  invalidateSubcategory: async (id) => {
    await cache.del(`subcategories:id:${id}`);
    await cache.del('subcategories:list');
  }
};
