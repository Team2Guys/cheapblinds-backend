import { categoryRepository } from './category.repository.js';
import { cache } from '#lib/index.js';

const { read } = categoryRepository;
const CACHE_TTL = 120;

export const categoryCache = {
  getCategoryList: async () => {
    const key = 'categories:list';
    const cached = await cache.get(key);
    if (cached) return cached;

    const categories = await read.categoryList();
    if (categories.length) await cache.set(key, categories, CACHE_TTL);
    return categories;
  },

  getCategoryById: async (id) => {
    const key = `categories:id:${id}`;
    const cached = await cache.get(key);
    if (cached) return cached;

    const category = await read.categoryById(id);
    if (category) await cache.set(key, category, CACHE_TTL);
    return category;
  },

  getCategoryByPath: async (path) => {
    const key = `categories:path:${path}`;
    const cached = await cache.get(key);
    if (cached) return cached;

    const category = await read.categoryByPath({ path });
    if (category) await cache.set(key, category, CACHE_TTL);
    return category;
  },

  invalidateCategory: async (id) => {
    await cache.del(`categories:id:${id}`);
    await cache.del('categories:list');
  }
};
