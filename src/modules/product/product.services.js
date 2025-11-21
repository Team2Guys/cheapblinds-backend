import createError from "http-errors";
import { repository } from "#repository/index.js";

const { write, read, update, remove } = repository;

export const productServices = {
  createProduct: async (input) => {
    const product = await write.product(input);

    return product;
  },

  getProductList: async () => {
    const products = await read.products();

    return products;
  },

  getProductById: async (input) => {
    const { id } = input;

    const product = await read.productById(id);

    if (!product) throw createError(404, "Product not found.");

    return product;
  },

  getProductByUrls: async (input) => {
    const { categoryCustomUrl, subcategoryCustomUrl, productCustomUrl } = input;

    const product = await read.productByUrls(
      categoryCustomUrl,
      subcategoryCustomUrl,
      productCustomUrl,
    );

    if (!product) {
      throw createError(404, "Product not found with the provided custom URLs.");
    }

    return product;
  },

  updateProductById: async (input) => {
    const { id, ...rest } = input;

    const existingProduct = await read.productById(id);

    if (!existingProduct) throw createError(404, "Product not found.");

    await update.productById(id, rest);

    return { message: "Product updated successfully" };
  },

  removeProductById: async (input) => {
    const { id } = input;

    const existingProduct = await read.productById(id);

    if (!existingProduct) throw createError(404, "Product not found.");

    await remove.productById(id);

    return { message: "Product deleted successfully" };
  },
};
