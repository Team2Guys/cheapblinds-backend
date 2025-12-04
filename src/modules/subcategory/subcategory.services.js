import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { ensureResourceExists } = commonUtils;

export const subcategoryServices = {
  createSubcategory: (input) => write.subcategory(input),

  getSubcategoryList: () => read.subcategoryList(),

  getSubcategoryById: async (id) => {
    await ensureResourceExists("subcategory", id);
    return read.subcategoryById(id);
  },

  getSubcategoryBySlugs: (input) => {
    return read.subcategoryBySlugs(input);
  },

  updateSubcategoryById: async (id, input) => {
    await ensureResourceExists("subcategory", id);
    return await update.subcategoryById(id, input);
  },

  removeSubcategoryById: async (id) => {
    await ensureResourceExists("subcategory", id);
    return remove.subcategoryById(id);
  },
};
