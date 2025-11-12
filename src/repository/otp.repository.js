import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const otpRepository = {
  read: {
    otp: async (id) => {
      const records = await prisma.otp.findMany({
        where: { id },
        orderBy: { createdAt: "desc" },
        take: 1,
      });
      return records[0] || null;
    },
  },

  write: {
    otp: async (data) => {
      const { id, otpHash, expiresAt } = data;

      return await prisma.otp.create({
        data: {
          id,
          otpHash,
          expiresAt,
        },
      });
    },
  },
};
