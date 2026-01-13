import { categoryCache } from './category.cache.js';
import { categoryRepository } from './category.repository.js';

const { write, update, remove } = categoryRepository;

export const categoryServices = {
  getCategoryList: () => categoryCache.getCategoryList(),

  getCategoryById: (id) => categoryCache.getCategoryById(id),

  getCategoryByPath: ({ path }) => categoryCache.getCategoryByPath(path),

  createCategory: async (input) => {
    const category = await write.category(input);
    await categoryCache.invalidateCategory(category.id);
    return category;
  },

  updateCategoryById: async (id, input) => {
    const category = await update.categoryById(id, input);
    await categoryCache.invalidateCategory(id);
    return category;
  },

  removeCategoryById: async (id) => {
    const category = await remove.categoryById(id);
    await categoryCache.invalidateCategory(id);
    return category;
  }
};
