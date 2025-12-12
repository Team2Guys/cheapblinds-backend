import { prisma } from '#lib/index.js';

export const newsletterSubscriberRepository = {
  read: {
    newsletterSubscriberList: () => prisma.newsletterSubscriber.findMany(),

    newsletterSubscriberById: (id) =>
      prisma.newsletterSubscriber.findUnique({
        where: { id }
      }),

    newsletterSubscriberByEmail: (email) =>
      prisma.newsletterSubscriber.findUnique({
        where: { email }
      })
  },

  write: {
    newsletterSubscriber: (data) =>
      prisma.newsletterSubscriber.create({
        data
      })
  },

  update: {
    newsletterSubscriberById: (id, data) =>
      prisma.newsletterSubscriber.update({
        where: { id },
        data
      })
  }
};
