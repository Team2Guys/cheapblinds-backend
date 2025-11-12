import createError from "http-errors";

import { repository } from "#repository/index.js";

const { read, update, remove } = repository;

export const adminServices = {
  adminLogin: async ({ email, password }) => {
    const admin = await read.adminByEmail(email);

    if (!admin) throw createError(404, "Admin not found.");

    const isPasswordValid = await passwordUtils.verify(password, admin.password);

    if (!isPasswordValid) throw createError(401, "Invalid credentials.");

    const accessToken = tokenUtils.generate({ id: admin.id }, "accessToken");

    if (!accessToken) throw createError(500, "Failed to generate access token.");

    return {
      status: "success",
      message: "Admin logged in successfully",
      data: {
        id: admin.id,
        accessToken,
      },
    };
  },

  getAdmins: async () => {
    const admins = await read.admins();

    return {
      status: "success",
      message: "Admins retrieved successfully",
      data: admins,
    };
  },

  getAdminById: async ({ id }) => {
    const admin = await read.adminById(id);

    if (!admin) throw createError(404, "Admin not found.");

    return {
      status: "success",
      message: "Admin retrieved successfully",
      data: admin,
    };
  },

  updateAdminById: async ({ id, password, ...data }) => {
    const existingAdmin = await read.adminById(id);

    if (!existingAdmin) throw createError(404, "Admin not found.");

    const updateData = {
      ...data,
      ...(password && { password: await passwordUtils.hash(password, { rounds: 12 }) }),
    };

    const updatedAdmin = await update.adminById({ id, ...updateData });

    return {
      status: "success",
      message: "Admin updated successfully",
      data: updatedAdmin,
    };
  },

  removeAdminById: async ({ id }) => {
    await remove.adminById(id);

    return {
      status: "success",
      message: "Admin deleted successfully",
    };
  },
};
