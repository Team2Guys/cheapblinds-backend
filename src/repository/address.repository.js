import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addressRepository = {
  read: {
    addressById: (id) =>
      prisma.address.findMany({
        where: { id },
      }),
  },

  write: {
    address: (data) =>
      prisma.address.create({
        data,
      }),
  },

  update: {
    addressById: (id, data) =>
      prisma.address.update({
        where: { id },
        data,
      }),
  },

  remove: {
    addressById: (id) =>
      prisma.address.delete({
        where: { id },
      }),
  },
};
