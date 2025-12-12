import createError from 'http-errors';
import { adminRepository } from './admin.repository.js';
import { bcryptUtils } from '#lib/index.js';

const { write, read, update, remove } = adminRepository;

export const adminServices = {
  createAdmin: async (input) => {
    const { email, password, ...rest } = input;

    const existingAdmin = await read.adminByEmail(email);
    if (existingAdmin) throw createError(400, 'Admin already exists.');

    const hashedPassword = await bcryptUtils.hash(password, { rounds: 12 });

    return write.admin({ email, password: hashedPassword, ...rest });
  },

  getAdminList: () => read.adminList(),

  getAdminById: (id) => read.adminById(id),

  updateAdminById: (id, input) => update.adminById(id, input),

  removeAdminById: (id) => remove.adminById(id)
};
