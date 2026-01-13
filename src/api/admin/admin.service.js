import createError from 'http-errors';
import { adminRepository } from './admin.repository.js';
import { bcryptUtils } from '#lib/index.js';
import { cache } from '#lib/index.js';

const { write, read, update, remove } = adminRepository;
const CACHE_TTL = 120;

export const adminServices = {
  createAdmin: async (input) => {
    const { email, password, ...rest } = input;

    const existingAdmin = await read.adminByEmail(email);
    if (existingAdmin) throw createError(400, 'Admin already exists.');

    const hashedPassword = await bcryptUtils.hash(password, { rounds: 12 });

    const admin = await write.admin({
      email,
      password: hashedPassword,
      ...rest
    });

    // Invalidate cached admin list
    await cache.del('admins:list');
    return admin;
  },

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

  updateAdminById: async (id, input) => {
    const admin = await update.adminById(id, input);

    await cache.del(`admins:id:${id}`);
    await cache.del('admins:list');
    return admin;
  },

  removeAdminById: async (id) => {
    const admin = await remove.adminById(id);

    await cache.del(`admins:id:${id}`);
    await cache.del('admins:list');
    return admin;
  }
};
