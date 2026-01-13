import { inquiryRepository } from './inquiry.repository.js';
import { cache } from '#lib/index.js';

const { write, read, update, remove } = inquiryRepository;
const CACHE_TTL = 120;

export const inquiryServices = {
  createInquiry: async (input) => {
    const inquiry = await write.inquiry(input);
    // Invalidate cached inquiry list
    await cache.del('inquiries:list');
    return inquiry;
  },

  getInquiryList: async () => {
    const key = 'inquiries:list';
    const cached = await cache.get(key);
    if (cached) return cached;

    const inquiries = await read.inquiryList();
    if (inquiries.length) await cache.set(key, inquiries, CACHE_TTL);
    return inquiries;
  },

  getInquiryById: async (id) => {
    const key = `inquiries:id:${id}`;
    const cached = await cache.get(key);
    if (cached) return cached;

    const inquiry = await read.inquiryById(id);
    if (inquiry) await cache.set(key, inquiry, CACHE_TTL);
    return inquiry;
  },

  updateInquiryById: async (id, input) => {
    const inquiry = await update.inquiryById(id, input);

    await cache.del(`inquiries:id:${id}`);
    await cache.del('inquiries:list');
    return inquiry;
  },

  removeInquiryById: async (id) => {
    const inquiry = await remove.inquiryById(id);

    await cache.del(`inquiries:id:${id}`);
    await cache.del('inquiries:list');
    return inquiry;
  }
};
