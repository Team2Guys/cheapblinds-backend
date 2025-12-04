import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { ensureResourceExists } = commonUtils;

export const categoryServices = {
  createCategory: (input) => write.category(input),

  getCategoryList: read.categoryList,

  getCategoryById: async (id) => {
    await ensureResourceExists("category", id);
    return read.categoryById(id);
  },

  getCategoryBySlug: (input) => read.categoryBySlug(input),

  updateCategoryById: async (id, input) => {
    await ensureResourceExists("category", id);
    return update.categoryById(id, input);
  },

  removeCategoryById: async (id) => {
    await ensureResourceExists("category", id);
    return remove.categoryById(id);
  },
};
