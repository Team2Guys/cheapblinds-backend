import createError from "http-errors";

import { repository } from "#repository/index.js";

const { read, update, remove } = repository;

export const userServices = {
  getUserList: async () => {
    const users = await read.users();

    return users;
  },

  getUserById: async (input) => {
    const { id } = input;

    const user = await read.userById(id);

    if (!user) throw createError(404, "User not found.");

    return user;
  },

  updateUserById: async (input) => {
    const { id, ...rest } = input;

    const existingUser = await read.userById(id);

    if (!existingUser) throw createError(404, "User not found.");

    await update.userById(id, rest);

    return { message: "User updated successfully" };
  },

  removeUserById: async (input) => {
    const { id } = input;

    await remove.userById(id);

    return { message: "User deleted successfully" };
  },
};
