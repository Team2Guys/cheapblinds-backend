import { categoryRepository } from './category.repository.js';

const { write, read, update, remove } = categoryRepository;

export const categoryServices = {
  createCategory: (input) => write.category(input),

  getCategoryList: () => read.categoryList(),

  getCategoryById: (id) => read.categoryById(id),

  getCategoryBySlug: (input) => read.categoryBySlug(input),

  updateCategoryById: (id, input) => update.categoryById(id, input),

  removeCategoryById: (id) => remove.categoryById(id)
};
