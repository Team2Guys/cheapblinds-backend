import { categoryRepository } from './category.repository.js';
import { cache } from '#lib/index.js';

const { write, read, update, remove } = categoryRepository;
const CACHE_TTL = 120;

export const categoryServices = {
  createCategory: async (input) => {
    const category = await write.category(input);
    // Invalidate caches
    await cache.del('categories:list');
    return category;
  },

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

  getCategoryByPath: async (input) => {
    const { categoryPath } = input;
    const key = `categories:path:${categoryPath}`;
    const cached = await cache.get(key);
    if (cached) return cached;

    const category = await read.categoryByPath(input);
    if (category) await cache.set(key, category, CACHE_TTL);
    return category;
  },

  updateCategoryById: async (id, input) => {
    const category = await update.categoryById(id, input);

    await cache.del(`categories:id:${id}`);
    await cache.del('categories:list');
    return category;
  },

  removeCategoryById: async (id) => {
    const category = await remove.categoryById(id);

    await cache.del(`categories:id:${id}`);
    await cache.del('categories:list');
    return category;
  }
};
