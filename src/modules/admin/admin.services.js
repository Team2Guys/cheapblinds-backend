import createError from "http-errors";
import { repository } from "#repository/index.js";
import { bcryptUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;

export const adminServices = {
  createAdmin: async (input) => {
    const { email, password, ...rest } = input;

    const existingAdmin = await read.adminByEmail(email);
    if (existingAdmin) throw createError(400, "Admin already exists.");

    const hashedPassword = await bcryptUtils.hash(password, { rounds: 12 });

    await write.admin({ email, password: hashedPassword, ...rest });

    return {
      status: "success",
      message: "Admin created successfully",
    };
  },

  getAdminList: async () => {
    const admins = await read.admins();

    return {
      status: "success",
      message: "Admins retrieved successfully",
      data: admins,
    };
  },

  getAdminById: async (input) => {
    const { id } = input;

    const admin = await read.adminById(id);

    if (!admin) throw createError(404, "Admin not found.");

    return {
      status: "success",
      message: "Admin retrieved successfully",
      data: admin,
    };
  },

  updateAdminById: async (input) => {
    const { id, password, ...rest } = input;

    const existingAdmin = await read.adminById(id);

    if (!existingAdmin) throw createError(400, "Admin not found.");

    const updateData = {
      ...rest,
      ...(password && { password: await bcryptUtils.hash(password, { rounds: 12 }) }),
    };

    await update.adminById(id, updateData);

    return {
      status: "success",
      message: "Admin updated successfully",
    };
  },

  removeAdminById: async (input) => {
    const { id } = input;

    const existingAdmin = await read.adminById(id);

    if (!existingAdmin) throw createError(400, "Admin not found.");

    await remove.adminById(id);

    return {
      status: "success",
      message: "Admin deleted successfully",
    };
  },
};
