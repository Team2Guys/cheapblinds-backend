import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const otpRepository = {
  read: {
    otp: (id) => {
      const records = prisma.otp.findMany({
        where: { id },
        orderBy: { createdAt: "desc" },
        take: 1,
      });

      return records[0] || null;
    },
  },

  write: {
    otp: (data) =>
      prisma.otp.create({
        data,
      }),
  },
};
