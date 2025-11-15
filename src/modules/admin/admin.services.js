import createError from "http-errors";
import { repository } from "#repository/index.js";
import { passwordUtils, tokenUtils } from "#utils/index.js";
import { env } from "#config/index.js";

const { read, write, update, remove } = repository;
const { SUPER_ADMIN_ID, SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD } = env;

export const adminServices = {
  signinSuperAdmin: async (input) => {
    const { email, password } = input;
    if (email !== SUPER_ADMIN_EMAIL || password !== SUPER_ADMIN_PASSWORD)
      throw createError(401, "Invalid credentials.");

    const accessToken = tokenUtils.generate(
      { id: SUPER_ADMIN_ID, role: "SUPER_ADMIN" },
      "accessToken",
    );

    return {
      status: "success",
      message: "Signed in successfully",
      data: {
        id: SUPER_ADMIN_ID,
        accessToken,
        role: "SUPER_ADMIN",
      },
    };
  },

  signinAdmin: async (input) => {
    const { email, password } = input;
    const admin = await read.adminByEmail(email);
    if (!admin) throw createError(404, "Invalid credentials.");

    const valid = passwordUtils.validatePassword(password, admin.password);

    if (!valid) throw createError(401, "Invalid credentials.");

    const accessToken = tokenUtils.generate({ id: admin.id, role: "ADMIN" }, "accessToken");

    return {
      status: "success",
      message: "Signed in successfully",
      data: {
        id: admin.id,
        accessToken,
        role: "ADMIN",
      },
    };
  },

  createAdmin: async (input) => {
    const { email, password, permissions } = input;

    const existingAdmin = await read.adminByEmail(email);

    if (existingAdmin) throw createError(400, "Admin already exists.");

    const hashedPassword = await passwordUtils.hash(password, { rounds: 12 });

    await write.admin({ ...input, password: hashedPassword, permissions });

    return {
      status: "success",
      message: "Admin created successfully",
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

  getAdminById: async (input) => {
    const admin = await read.adminById(input.id);

    if (!admin) throw createError(404, "Admin not found.");

    return {
      status: "success",
      message: "Admin retrieved successfully",
      data: admin,
    };
  },

  updateAdminById: async (input) => {
    const { id, password, ...rest } = input;

    const existingAdmin = await read.adminByEmail(email);

    if (!existingAdmin) throw createError(400, "Admin not found.");

    const updateData = {
      ...rest,
      ...(password && { password: await passwordUtils.hash(password, { rounds: 12 }) }),
    };

    await update.adminById(id, updateData);

    return {
      status: "success",
      message: "Admin updated successfully",
    };
  },

  removeAdminById: async (input) => {
    const existingAdmin = await read.adminByEmail(email);

    if (!existingAdmin) throw createError(400, "Admin not found.");

    await remove.adminById(input.id);

    return {
      status: "success",
      message: "Admin deleted successfully",
    };
  },
};
