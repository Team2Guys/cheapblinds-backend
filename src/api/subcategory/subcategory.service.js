import { subcategoryCache } from './subcategory.cache.js';
import { subcategoryRepository } from './subcategory.repository.js';

const { write, update, remove } = subcategoryRepository;

export const subcategoryServices = {
  createSubcategory: async (input) => {
    const subcategory = await write.subcategory(input);
    await subcategoryCache.invalidateSubcategory(subcategory.id);
    return subcategory;
  },

  getSubcategoryList: () => subcategoryCache.getSubcategoryList(),

  getSubcategoryById: (id) => subcategoryCache.getSubcategoryById(id),

  getSubcategoryByPath: ({ path }) =>
    subcategoryCache.getSubcategoryByPath(path),

  updateSubcategoryById: async (id, input) => {
    const subcategory = await update.subcategoryById(id, input);
    await subcategoryCache.invalidateSubcategory(id);
    return subcategory;
  },

  removeSubcategoryById: async (id) => {
    const subcategory = await remove.subcategoryById(id);
    await subcategoryCache.invalidateSubcategory(id);
    return subcategory;
  }
};
