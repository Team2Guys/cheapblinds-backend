import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { ensureResourceExists } = commonUtils;

export const productServices = {
  createProduct: (input) => write.product(input),

  getProductList: () => read.productList(),

  getProductById: async (id) => {
    await ensureResourceExists("product", id);
    return read.productById(id);
  },

  getProductBySlugs: (input) => read.productBySlugs(input),

  updateProductById: async (id, input) => {
    await ensureResourceExists("product", id);
    return await update.productById(id, input);
  },

  removeProductById: async (id) => {
    await ensureResourceExists("product", id);
    return remove.productById(id);
  },
};
