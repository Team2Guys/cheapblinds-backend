import createError from "http-errors";
import { repository } from "#repository/index.js";
import { bcryptUtils } from "#utils/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { ensureResourceExists } = commonUtils;

export const adminServices = {
  createAdmin: async (input) => {
    const { email, password, ...rest } = input;

    const existingAdmin = await read.adminByEmail(email);
    if (existingAdmin) throw createError(400, "Admin already exists.");

    const hashedPassword = await bcryptUtils.hash(password, { rounds: 12 });

    return write.admin({ email, password: hashedPassword, ...rest });
  },

  getAdminList: read.adminList,

  getAdminById: async (id) => {
    await ensureResourceExists("admin", id);
    return read.adminById(id);
  },

  updateAdminById: async (id, input) => {
    await ensureResourceExists("admin", id);
    return update.adminById(id, input);
  },

  removeAdminById: async (id) => {
    await ensureResourceExists("admin", id);
    return remove.adminById(id);
  },
};
