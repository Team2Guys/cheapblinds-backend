import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const newsletterSubscriberRepository = {
  read: {
    newsletterSubscriberList: () => prisma.newsletterSubscriber.findMany(),

    newsletterSubscriberById: (id) =>
      prisma.newsletterSubscriber.findUnique({
        where: { id },
      }),
  },

  write: {
    newsletterSubscriber: (data) =>
      prisma.newsletterSubscriber.create({
        data,
      }),
  },

  update: {
    newsletterSubscriberById: (id, data) =>
      prisma.newsletterSubscriber.update({
        where: { id },
        data,
      }),
  },
};
