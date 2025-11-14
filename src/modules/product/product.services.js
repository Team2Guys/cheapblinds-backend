import createError from "http-errors";
import { repository } from "#repository/index.js";

const { write, read, update, remove } = repository;

export const productServices = {
  createProduct: async (input) => {
    const product = await write.product(input);

    return {
      status: "success",
      message: "Product created successfully",
      data: product,
    };
  },

  getAllProducts: async () => {
    const products = await read.products();

    return {
      status: "success",
      message: "Products retrieved successfully",
      data: products,
    };
  },

  getProductById: async (input) => {
    const { id } = input;

    const product = await read.productById(id);

    if (!product) throw createError(404, "Product not found.");

    return {
      status: "success",
      message: "Product retrieved successfully",
      data: product,
    };
  },

  updateProductById: async (input) => {
    const { id, ...rest } = input;

    const existingProduct = await read.productById(id);

    if (!existingProduct) throw createError(404, "Product not found.");

    const updatedProduct = await update.productById(id, rest);

    return {
      status: "success",
      message: "Product updated successfully",
      data: updatedProduct,
    };
  },

  removeProductById: async (input) => {
    const { id } = input;

    const existingProduct = await read.productById(id);

    if (!existingProduct) throw createError(404, "Product not found.");

    await remove.productById(id);

    return {
      status: "success",
      message: "Product deleted successfully",
    };
  },
};
