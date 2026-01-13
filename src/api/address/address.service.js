import { addressRepository } from './address.repository.js';
import { cache } from '#lib/index.js';

const { read, write, update, remove } = addressRepository;
const CACHE_TTL = 120;

export const addressServices = {
  getAddressListByUserId: async (userId) => {
    const key = `addresses:user:${userId}`;
    const cached = await cache.get(key);
    if (cached) return cached;

    const addresses = await read.addressListByUserId(userId);
    if (addresses.length) await cache.set(key, addresses, CACHE_TTL);
    return addresses;
  },

  getAddressById: async (id) => {
    const key = `addresses:id:${id}`;
    const cached = await cache.get(key);
    if (cached) return cached;

    const address = await read.addressById(id);
    if (address) await cache.set(key, address, CACHE_TTL);
    return address;
  },

  createAddress: async (input, userId) => {
    const address = await write.address(input);
    // Invalidate user address list cache
    await cache.del(`addresses:user:${userId}`);
    return address;
  },

  updateAddressById: async (id, input, userId) => {
    const address = await update.addressById(id, input);
    await cache.del(`addresses:id:${id}`);
    await cache.del(`addresses:user:${userId}`);
    return address;
  },

  removeAddressById: async (id, userId) => {
    const address = await remove.addressById(id);
    await cache.del(`addresses:id:${id}`);
    await cache.del(`addresses:user:${userId}`);
    return address;
  }
};
