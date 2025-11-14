import createError from "http-errors";

import { repository } from "#repository/index.js";

const { read, update, remove } = repository;

export const userServices = {
  getAllUsers: async () => {
    const users = await read.users();

    return {
      status: "success",
      message: "Users retrieved successfully",
      data: users,
    };
  },

  getUserById: async (input) => {
    const { id } = input;

    const user = await read.userById(id);

    if (!user) throw createError(404, "User not found.");

    return {
      status: "success",
      message: "User retrieved successfully",
      data: user,
    };
  },

  updateUserById: async (input) => {
    const { id, password, ...data } = input;

    const existingUser = await read.userById(id);

    if (!existingUser) throw createError(404, "User not found.");

    const updateData = {
      ...data,
      ...(password && { password: await passwordUtils.hash(password, { rounds: 12 }) }),
    };

    const updatedUser = await update.userById({ id, ...updateData });

    return {
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    };
  },

  removeUserById: async (input) => {
    const { id } = input;

    await remove.userById(id);

    return {
      status: "success",
      message: "User deleted successfully",
    };
  },
};
