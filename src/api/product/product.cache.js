import { productRepository } from './product.repository.js';
import { cache } from '#lib/index.js';

const { read } = productRepository;
const CACHE_TTL = 120;

export const productCache = {
  getProductList: async () => {
    const key = 'products:list';
    const cached = await cache.get(key);
    if (cached) return cached;

    const products = await read.productList();
    if (products.length) await cache.set(key, products, CACHE_TTL);
    return products;
  },

  getProductById: async (id) => {
    const key = `products:id:${id}`;
    const cached = await cache.get(key);
    if (cached) return cached;

    const product = await read.productById(id);
    if (product) await cache.set(key, product, CACHE_TTL);
    return product;
  },

  getProductByPath: async (path) => {
    const key = `products:path:${path}`;
    const cached = await cache.get(key);
    if (cached) return cached;

    const product = await read.productByPath({ path });
    if (product) await cache.set(key, product, CACHE_TTL);
    return product;
  },

  invalidateProduct: async (id) => {
    await cache.del(`products:id:${id}`);
    await cache.del('products:list');
  }
};
