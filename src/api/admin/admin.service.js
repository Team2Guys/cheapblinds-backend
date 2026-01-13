import createError from 'http-errors';
import { adminCache } from './admin.cache.js';
import { adminRepository } from './admin.repository.js';
import { bcryptUtils } from '#lib/index.js';

const { write, read, update, remove } = adminRepository;

export const adminServices = {
  getAdminList: () => adminCache.getAdminList(),

  getAdminById: (id) => adminCache.getAdminById(id),

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

    await adminCache.invalidateAdmin(admin.id);
    return admin;
  },

  updateAdminById: async (id, input) => {
    const admin = await update.adminById(id, input);
    await adminCache.invalidateAdmin(id);
    return admin;
  },

  removeAdminById: async (id) => {
    const admin = await remove.adminById(id);
    await adminCache.invalidateAdmin(id);
    return admin;
  }
};
