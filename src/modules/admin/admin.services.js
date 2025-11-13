import createError from "http-errors";

import { env } from "#config/index.js";
import { repository } from "#repository/index.js";

const { read, update, remove } = repository;
const { SUPER_ADMIN_ID, SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD } = env;

export const adminServices = {
  superAdminLogin: async (requestBody) => {
    const { email, password } = requestBody;

    if (email !== SUPER_ADMIN_EMAIL || password !== SUPER_ADMIN_PASSWORD)
      throw createError(401, "Invalid credentials.");

    const accessToken = tokenUtils.generate(
      { id: SUPER_ADMIN_ID, role: "SUPER_ADMIN" },
      "accessToken",
    );

    if (!accessToken) throw createError(500, "Failed to generate access token.");

    return {
      status: "success",
      message: "Super admin logged in successfully",
      data: {
        id: SUPER_ADMIN_ID,
        accessToken,
      },
    };
  },

  adminLogin: async (requestBody) => {
    const { email, password } = requestBody;

    const admin = await read.adminByEmail(email);

    if (!admin) throw createError(404, "Invalid credentials.");

    const isPasswordValid = await passwordUtils.verify(password, admin.password);

    if (!isPasswordValid) throw createError(401, "Invalid credentials.");

    const accessToken = tokenUtils.generate({ id: admin.id, role: "ADMIN" }, "accessToken");

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

  createAdmin: async (requestBody) => {
    const { email, password } = requestBody;

    const existingAdmin = await read.adminByEmail(email);

    if (existingAdmin) throw createError(400, "Admin already exists.");

    const hashedPassword = await passwordUtils.hash(password, { rounds: 12 });

    const registrationData = {
      ...requestBody,
      email,
      password: hashedPassword,
    };

    const newAdmin = await write.admin(registrationData);

    return {
      status: "success",
      message: "Admin created successfully",
      data: newAdmin,
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

  getAdminById: async (requestBody) => {
    const { id } = requestBody;

    const admin = await read.adminById(id);

    if (!admin) throw createError(404, "Admin not found.");

    return {
      status: "success",
      message: "Admin retrieved successfully",
      data: admin,
    };
  },

  updateAdminById: async (requestBody) => {
    const { id, password, ...data } = requestBody;

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

  removeAdminById: async (requestBody) => {
    const { id } = requestBody;

    await remove.adminById(id);

    return {
      status: "success",
      message: "Admin deleted successfully",
    };
  },
};
