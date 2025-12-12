import { prisma } from '#lib/index.js';

export const inquiryRepository = {
  read: {
    inquiryList: () => prisma.inquiry.findMany(),

    inquiryById: (id) =>
      prisma.inquiry.findUnique({
        where: { id }
      })
  },

  write: {
    inquiry: (data) =>
      prisma.inquiry.create({
        data
      })
  },

  update: {
    inquiryById: (id, data) =>
      prisma.inquiry.update({
        where: { id },
        data
      })
  },

  remove: {
    inquiryById: (id) =>
      prisma.inquiry.delete({
        where: { id }
      })
  }
};
