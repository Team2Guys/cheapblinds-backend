import { adminRepository } from './admin.repository.js';
import { cache } from '#lib/index.js';

const { read } = adminRepository;
const CACHE_TTL = 120;

export const adminCache = {
  getAdminList: async () => {
    const key = 'admins:list';
    const cached = await cache.get(key);
    if (cached) return cached;

    const admins = await read.adminList();
    if (admins.length) await cache.set(key, admins, CACHE_TTL);
    return admins;
  },

  getAdminById: async (id) => {
    const key = `admins:id:${id}`;
    const cached = await cache.get(key);
    if (cached) return cached;

    const admin = await read.adminById(id);
    if (admin) await cache.set(key, admin, CACHE_TTL);
    return admin;
  },

  invalidateAdmin: async (id) => {
    await cache.del(`admins:id:${id}`);
    await cache.del('admins:list');
  }
};
