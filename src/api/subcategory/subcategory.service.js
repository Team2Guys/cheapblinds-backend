import { subcategoryRepository } from './subcategory.repository.js';

const { write, read, update, remove } = subcategoryRepository;

export const subcategoryServices = {
  createSubcategory: (input) => write.subcategory(input),

  getSubcategoryList: () => read.subcategoryList(),

  getSubcategoryById: (id) => read.subcategoryById(id),

  getSubcategoryBySlugs: (input) => read.subcategoryBySlugs(input),

  updateSubcategoryById: (id, input) => update.subcategoryById(id, input),

  removeSubcategoryById: (id) => remove.subcategoryById(id)
};
