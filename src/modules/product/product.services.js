import createError from "http-errors";
import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { validateUuid } = commonUtils;

export const productServices = {
  createProduct: (input) => write.product(input),

  getProductList: () => read.productList(),

  getProductById: (id) => {
    validateUuid(id);
    return read.productById(id);
  },

  getProductBySlugs: (input) => read.productBySlugs(input),

  updateProductById: async (id, input) => {
    validateUuid(id);

    const existingProduct = await read.productById(id);
    if (!existingProduct) throw createError(404, "Product does not exist.");

    return await update.productById(id, input);
  },

  removeProductById: async (id) => {
    validateUuid(id);

    const existingProduct = await read.productById(id);
    if (!existingProduct) throw createError(404, "Product does not exist.");

    return remove.productById(id);
  },
};
