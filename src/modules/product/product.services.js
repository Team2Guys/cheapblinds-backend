import createError from "http-errors";
import { repository } from "#repository/index.js";

const { write, read, update, remove } = repository;

export const productServices = {
  createProduct: async (data) => {
    const product = await write.product(data);

    return {
      status: "success",
      message: "Product created successfully",
      data: product,
    };
  },

  getProducts: async () => {
    const products = await read.products();

    return {
      status: "success",
      message: "Products retrieved successfully",
      data: products,
    };
  },

  getProductById: async ({ id }) => {
    const product = await read.productById(id);

    if (!product) throw createError(404, "Product not found.");

    return {
      status: "success",
      message: "Product retrieved successfully",
      data: product,
    };
  },

  updateProductById: async ({ id, ...data }) => {
    const existingProduct = await read.productById(id);

    if (!existingProduct) throw createError(404, "Product not found.");

    const updatedProduct = await update.productById({ id, ...data });

    return {
      status: "success",
      message: "Product updated successfully",
      data: updatedProduct,
    };
  },

  removeProductById: async ({ id }) => {
    await remove.productById(id);

    return {
      status: "success",
      message: "Product deleted successfully",
    };
  },
};
