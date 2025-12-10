import { productRepository } from './product.repository.js';

const { write, read, update, remove } = productRepository;

export const productServices = {
  createProduct: (input) => write.product(input),

  getProductList: () => read.productList(),

  getProductById: (id) => read.productById(id),

  getProductBySlugs: (input) => read.productBySlugs(input),

  updateProductById: (id, input) => update.productById(id, input),

  removeProductById: (id) => remove.productById(id)
};
